const nodemailer = require('nodemailer');
const {
  SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
} = process.env;

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: false, // if true then port:465
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS
  }
});

const sendEmail = (mailOptions, callback) => {
  return transporter.sendMail(mailOptions, callback);
}

module.exports = { sendEmail }