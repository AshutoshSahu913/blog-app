// Simple email sender using nodemailer
// If no EMAIL_* env provided, creates an Ethereal test account automatically.

const nodemailer = require('nodemailer');

async function createTransporter() {
  // If env has SMTP config, use it
  if (process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT || 587,
      secure: process.env.EMAIL_PORT === '465',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  }

  // else create a test account (Ethereal)
  const testAccount = await nodemailer.createTestAccount();
  return nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass
    }
  });
}

async function sendEmail({ to, subject, text, html }) {
  const transporter = await createTransporter();
  const info = await transporter.sendMail({
    from: process.env.EMAIL_FROM || 'no-reply@example.com',
    to,
    subject,
    text,
    html
  });

  const previewUrl = nodemailer.getTestMessageUrl(info); // if ethereal, returns URL, else undefined
  return { info, previewUrl };
}

module.exports = sendEmail;
