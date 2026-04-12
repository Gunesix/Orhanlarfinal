import express from "express";
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
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
