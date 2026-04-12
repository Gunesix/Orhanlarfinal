import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Sadece POST isteklerine izin ver
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { name, email, phone, service, message, captchaToken } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (!captchaToken) {
      return res.status(400).json({ error: "Captcha token is missing" });
    }

    // ReCAPTCHA Doğrulaması
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY || "6Lejv7MsAAAAAAozJzWEKTWezl3QvBcRCcwlaJGw";
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${captchaToken}`;
    
    const recaptchaRes = await fetch(verifyUrl, { method: "POST" });
    const recaptchaData = await recaptchaRes.json();

    if (!recaptchaData.success) {
      return res.status(400).json({ error: "Captcha verification failed" });
    }

    // SMTP Ayarları
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"${name}" <${process.env.SMTP_USER}>`, // Gönderen adres SMTP kullanıcısı olmalı
      replyTo: email,
      to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
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
    return res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ error: "Failed to send email" });
  }
}
