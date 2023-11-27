require("dotenv").config()
const Models = require("../models");
const nodemailer = require('nodemailer');
// const { decodeJWTToken } = require("../utils/jwtUtils");
const { sendVerifyMail, emailTemplate,sendWelcomEmailWithAttachement } = require("../utils/emailsUtils")
const { generateJWTToken, decodeJWTToken } = require("../utils/jwtUtils")

exports.VerifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    const decodeToken = decodeJWTToken(token)
    const { email } = decodeToken

    await Models.Users.update({ email_verified: true }, { where: { email} });
    // Welcome email send process
    const mailTexts = await Models.email_format.findOne({ where: { email_type: 'welcome' } })
    let subject = mailTexts.header
    let text = mailTexts.email_content
    const userData = await Models.Users.findOne({ where: { email } });
    text = text.replace("{user_name}", userData.dataValues.firstName+" "+ userData.dataValues.lastName);
    // const EmailToken = generateJWTToken({ email: userData.dataValues.email }, "10m")
    const mail = await emailTemplate(text)
    if(mailTexts.file)
    {
        sendWelcomEmailWithAttachement(email, subject, "", mail,mailTexts.file);
    }
    else
    {
        sendVerifyMail(email, subject, "", mail)
    }

    /* dummy email start*/
        var transport = nodemailer.createTransport({
          host: "sandbox.smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: "5486eff1d5793c",
            pass: "e17b0b8e8f08ac"
          }
        });

        const mailOptions = {
          from: 'rjnaghera@gmail.com',
          to: email,
          subject: subject,
          text: mail,
        };
                transport.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
        /* dummy email end*/
    res.json({message:"Email Verify Success."});
    // res.status(200).send({ status: true, message: " Email verfiyed success and Welcome email send", data: [] })
  } catch (err) {    
    res.status(500).send({ status: false, message: "The verification does not take place, the JWT expires or the link is invalid", data: [],error: err.message })
  }
}
