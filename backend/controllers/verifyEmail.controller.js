require("dotenv").config()
const Models = require("../models");
// const { decodeJWTToken } = require("../utils/jwtUtils");
const { sendVerifyMail, emailTemplate } = require("../utils/emailsUtils")
const { generateJWTToken, decodeJWTToken } = require("../utils/jwtUtils")

exports.VerifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    const decodeToken = decodeJWTToken(token)
    const { email } = decodeToken

    await Models.Users.update({ email_verified: true }, { where: { email} });
    // Welcome email send process
    // const mailTexts = await Models.email_template.findOne({ where: { email_type: 'registration' } })
    // let subject = mailTexts.header
    // let text = mailTexts.email_content
    const userData = await Models.Users.findOne({ where: { email } });
    let subject = "Welcome to the Backlink Famliy";
    let text = 'Hi {user_name} This is Welocome email from Backlink';
    text = text.replace("{user_name}", userData.firstName + userData.lastName);
    text = text.replace("{user_email}", email);
    const EmailToken = generateJWTToken({ email: userData.dataValues.email }, "10m")
    const mail = await emailTemplate(text)
    sendVerifyMail(email, subject, "", mail)
    res.status(200).send({ status: true, message: " Email verfiyed success and Welcome email send", data: [] })
  } catch (err) {
    res.status(500).send({ status: false, message: "The verification does not take place, the JWT expires or the link is invalid", data: [],error: err.message })
  }
}
