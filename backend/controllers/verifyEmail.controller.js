require("dotenv").config()
const Models = require("../models");
const { decodeJWTToken } = require("../utils/jwtUtils");

exports.VerifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    const decodeToken = decodeJWTToken(token)
    const { email } = decodeToken

    await Models.Users.update({ email_verified: true }, { where: { email} });

    res.status(200).send({ status: true, message: " Check carried out", data: [] })
  } catch (err) {
    res.status(500).send({ status: false, message: "The verification does not take place, the JWT expires or the link is invalid", data: [],error: err.message })
  }
}
