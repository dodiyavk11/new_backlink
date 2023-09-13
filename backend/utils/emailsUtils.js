require("dotenv").config()
const nodemailer = require("nodemailer")
const path = require('path');
// send verification mail
exports.sendVerifyMail = async (email, subject, text, link) => {
  try {
    const senderName = 'BackLink';
    const senderEmail = process.env.SENDER_EMAIL;

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      // secure: true,
      requireTLS: true,
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    })

    const mailOptions = {
      from: `"${senderName}" <${senderEmail}>`,
      to: email,
      subject,
      text,
      html: link
    }

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

  } catch (err) {
    console.log(err)
    if (err) throw err
  }
}

exports.emailTemplate = async (message) => {
  const url = 'https://nodejs.org/static/images/logo.svg';
  const html = `
    <div className="mail_formmate" style="background-color: #f7f7f2; width: 700px; margin: auto;">
      <div className="center_img" style="width:100%;height: 120px; padding-top: 20px; padding-bottom: 20px; filter: invert(1);">
        <img src="${url}" alt="Logo" style="display:flex; height: 100%; width: 120px; margin: auto;" />
      </div>
      
      <div className="message_body" style="padding-left: 20px; padding-bottom: 10px;">
        ${message}
      </div>
  
      <div className="regards" style="padding-left: 20px; padding-bottom: 10px;">
        <h4>Regards <br> BackLink</h4>
      </div>
    </div>
  `;
  
  return html;
}

