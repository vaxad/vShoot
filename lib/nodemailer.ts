// nodemailer.js
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  service: 'Gmail', // Your email service provider
  auth: {
    user: process.env.GMAIL,
    pass: process.env.GMAIL_PASS,
  },
});

export default transporter;