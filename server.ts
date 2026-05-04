import express from "express";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import path from "path";
import * as dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, phone, service, message, captchaToken } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      if (!captchaToken) {
        return res.status(400).json({ error: "Captcha token is missing" });
      }

      // Verify ReCAPTCHA
      const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY || "6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe";
      const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${captchaToken}`;
      
      const recaptchaRes = await fetch(verifyUrl, { method: "POST" });
      const recaptchaData = await recaptchaRes.json();

      if (!recaptchaData.success) {
        return res.status(400).json({ error: "Captcha verification failed" });
      }

      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const mailOptions = {
        from: `"${name}" <${process.env.SMTP_USER}>`, // Sender address must be the authenticated user
        replyTo: email,
        to: process.env.CONTACT_EMAIL || process.env.SMTP_USER, // List of receivers
        subject: `Yeni İletişim Formu Mesajı: ${service || "Genel"}`,
        text: `
Ad Soyad: ${name}
E-posta: ${email}
Telefon: ${phone || "Belirtilmedi"}
Hizmet Türü: ${service || "Belirtilmedi"}

Mesaj:
${message}
        `,
        html: `
<h3>Yeni İletişim Formu Mesajı</h3>
<p><strong>Ad Soyad:</strong> ${name}</p>
<p><strong>E-posta:</strong> ${email}</p>
<p><strong>Telefon:</strong> ${phone || "Belirtilmedi"}</p>
<p><strong>Hizmet Türü:</strong> ${service || "Belirtilmedi"}</p>
<br/>
<p><strong>Mesaj:</strong></p>
<p>${message.replace(/\n/g, "<br/>")}</p>
        `,
      };

      await transporter.sendMail(mailOptions);
      res.json({ success: true, message: "Email sent successfully" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send email" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom", // Important: strictly "custom" so it doesn't intercept HTML!
    });
    
    app.use(vite.middlewares);

    // Inject Meta Tags dynamically in DEV MODE
    app.use('*', async (req, res, next) => {
      // Do not intercept API requests or static assets
      if (req.originalUrl.startsWith('/api/')) {
        return next();
      }
      
      try {
        let template = await fs.promises.readFile(path.resolve(process.cwd(), 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(req.originalUrl, template);

        if (req.originalUrl.startsWith('/blog/')) {
          const slug = req.originalUrl.split('/')[2];
          const { blogPosts } = await import('./src/data/blogPosts.ts');
          const post = blogPosts.find((p: any) => p.slug === slug || p.id === slug);
          if (post) {
             template = template.replace(
                /<title>(.*?)<\/title>/,
                `<title>${post.title} | Orhanlar Hafriyat</title>`
             ).replace(
                /<meta name="description" content="(.*?)" \/>/,
                `<meta name="description" content="${post.excerpt}" />`
             );
          }
        }

        const { render } = await vite.ssrLoadModule('/src/entry-server.tsx');
        const helmetContext: any = {};
        const appHtml = render(req.originalUrl, helmetContext);
        const { helmet } = helmetContext;

        if (helmet) {
          const helmetStr = `
            ${helmet.title.toString()}
            ${helmet.meta.toString()}
            ${helmet.link.toString()}
            ${helmet.script.toString()}
          `;
          template = template.replace(/<title>(.*?)<\/title>/, '');
          template = template.replace('<!-- Meta Robots -->', helmetStr);
        }

        const finalHtml = template.replace('<!-- SSR_OUT -->', appHtml);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(finalHtml);
      } catch (e: any) {
        vite.ssrFixStacktrace(e);
        next(e);
      }
    });

  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath, { index: false })); // do not serve index.html automatically
    
    app.get('*', async (req, res, next) => {
      if (req.originalUrl.startsWith('/api/')) return next();
      
      try {
        let html = await fs.promises.readFile(path.join(distPath, 'index.html'), 'utf-8');
        
        if (req.originalUrl.startsWith('/blog/')) {
          const slug = req.originalUrl.split('/')[2];
          // use dynamic import to avoid failing if not built the same way
          const { blogPosts } = await import('./src/data/blogPosts.ts');
          const post = blogPosts.find((p: any) => p.slug === slug || p.id === slug);
          if (post) {
             html = html.replace(
                /<title>(.*?)<\/title>/,
                `<title>${post.title} | Orhanlar Hafriyat</title>`
             ).replace(
                /<meta name="description" content="(.*?)" \/>/,
                `<meta name="description" content="${post.excerpt}" />`
             );
          }
        }

        // Production SSR
        try {
          const { render } = await import('file://' + path.join(process.cwd(), 'dist/server/entry-server.js'));
          const helmetContext: any = {};
          const appHtml = render(req.originalUrl, helmetContext);
          const { helmet } = helmetContext;

          if (helmet) {
            const helmetStr = `
              ${helmet.title.toString()}
              ${helmet.meta.toString()}
              ${helmet.link.toString()}
              ${helmet.script.toString()}
            `;
            html = html.replace(/<title>(.*?)<\/title>/, '');
            html = html.replace('<!-- Meta Robots -->', helmetStr);
          }
          
          html = html.replace('<!-- SSR_OUT -->', appHtml);
        } catch (ssrErr) {
          console.error("SSR failed in prod, falling back to client render", ssrErr);
        }

        res.send(html);
      } catch (err) {
        res.status(500).send("Error reading HTML file");
      }
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
