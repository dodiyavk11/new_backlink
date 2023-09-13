require("dotenv").config()
const Models = require("../models")
const bcrypt = require("bcryptjs")
const { sendVerifyMail, emailTemplate } = require("../utils/emailsUtils")
const { generateJWTToken, decodeJWTToken } = require("../utils/jwtUtils")
const { unlinkProfile } = require("../utils/unlinkFile")
// const { MomentNormal } = require("../utils/momentUtils")
const moment = require('moment');

// add customer - both user and admin side
exports.signUp = async (req, res) => {
    try {
       
        const { email, firstName, lastName, password,phone,isAdmin } = req.body
        // const { email, fname, lname, password, company, street, postalNum, country, ustId, number, city, employee, code,isAdmin } = req.body
        const profile = req.file
        const checkUser = await Models.Users.findOne({ where: { email } })
        if (checkUser && checkUser.dataValues.email) {
            profile && unlinkProfile(profile.filename)
            return res.status(409).send({ status: false, message: "User already registered ", data: [] })
        }
            // genrate cripted password
            const hashedPassword = await bcrypt.hash(password, 11);
            const userInfo = { email, firstName, lastName, password: hashedPassword, phone }

            if (profile) userInfo.profile = profile.filename

            const addUser = await Models.Users.create(userInfo)
            delete addUser.dataValues.password
            
            if(isAdmin){   
              const adminUser =  await Models.Users.update({email_verified :true}, { where: {email: addUser.dataValues.email } })
             return res.status(200).send({ status: true, message: "User registration successful", data: adminUser });
            }

            // email send process
            // const mailTexts = await Models.email_template.findOne({ where: { email_type: 'registration' } })
            // let subject = mailTexts.header
            // let text = mailTexts.email_content
            let subject = "Complete registration now";
            let text = '<p><span style="font-size: 18pt;"><strong>Hello,</strong></span></p><p><span style="font-size: 12pt;"><span style="font-size: medium;">Thank you for your registration.</span></span></p><p><span style="font-size: 12pt;">Please confirm your email address {user_email} with this link:</span></p><p><span style="background-color: rgb(192, 222, 96);"><strong><span style="font-size: 12pt; background-color: rgb(192, 222, 96); ">{verification_Link}</span></strong></span></p><p><span style="font-size: 14pt;"><strong>Many sizes</strong></span></p>';
            text = text.replace("{user_name}", firstName + lastName);
            text = text.replace("{user_email}", email);
            const EmailToken = generateJWTToken({ email: addUser.dataValues.email }, "10m")
            const VerificationLink = `<a href="${process.env.BASE_URL}/verify/email/${EmailToken}">Click here</a>`
            console.log(VerificationLink);
            text = text.replace("{verification_Link}", VerificationLink)
            const mail = await emailTemplate(text)
            sendVerifyMail(email, subject, "", mail)
            res.status(200).send({ status: true, message: "Register successfully. Please confirm your email address via email", data: addUser });

    }
    catch (err) {
        console.log(err)
        res.status(500).send({ status: false, message: "Registration refused, something went wrong", data: [], error: err.message })
    }
}

// verify page resend mail in verify page

exports.ResendMail = async (req, res) => {
    // try {
        // email send process
    //     const { email } = req.body
    //     const { name } = req.body
    //     const mailTexts = await Models.email_template.findOne({ where: { email_type: 'registration' } })
    //     let text = mailTexts.email_content
    //     let subject = mailTexts.header
    //     text = text.replace("{user_name}", name);
    //     text = text.replace("{user_email}", email);
    //     const EmailToken = generateJWTToken({ email }, "10m")
    //     const VerificationLink = `<a href="${process.env.BASE_URL}/verification/email/${EmailToken}">klicken Sie hier</a>`
    //     text = text.replace("{verification_Link}", VerificationLink)
    //     const mail = await emailTemplate(text)
    //     sendVerifyMail(email, subject, "", mail)
    //     res.status(200).send({ status: true, message: "E-Mail erfolgreich gesendet, bitte uberprufen Sie Ihre E-Mail-Adresse", data: [] });
    // } catch (err) {
    //     console.log(err)
    //     res.status(500).send({ status: false, message: "Ich kann keine E-Mail senden, da ist ein Fehler aufgetreten", data: [], error: err.message })
    // }
}

exports.signIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        const checkUser = await Models.Users.findOne({ where: { email } });
        if (!checkUser) return res.status(401).send({ status: false, message: "User not found, please register first", data: [] })

        const isMatch = await bcrypt.compare(password, checkUser.password)
        if (!isMatch) return res.status(401).send({ status: false, message: "Invalid credentials", data: [] })

        // email send if user is not verified
        if (!checkUser.email_verified) {
            // const EmailToken = generateJWTToken({ userId: checkUser.id }, "30m")
            // const VerificationLink = `<a href="https://app.7i7.de/#/verification/email/${EmailToken}">klicken Sie hier</a>`
            // const mail = await emailTemplate(text + VerificationLink)
            const name = checkUser.dataValues.fname + " " + checkUser.dataValues.lname
            const EmailToken = generateJWTToken({ email }, "10m")
            // const mailTexts = await Models.email_template.findOne({ where: { email_type: 'registration' } })
            // let text = mailTexts.email_content
            // let subject = mailTexts.header

            let subject = "Complete registration now";
            let text = '<p><span style="font-size: 18pt;"><strong>Hello,</strong></span></p><p><span style="font-size: 12pt;"><span style="font-size: medium;">Thank you for your registration.</span></span></p><p><span style="font-size: 12pt;">Please confirm your email address {user_email} with this link:</span></p><p><span style="background-color: rgb(192, 222, 96);"><strong><span style="font-size: 12pt; background-color: rgb(192, 222, 96); ">{verification_Link}</span></strong></span></p><p><span style="font-size: 14pt;"><strong>Many sizes</strong></span></p>';
            text = text.replace("{user_email}", email);
            text = text.replace("{user_name}", name);
            const VerificationLink = `<a href="${process.env.BASE_URL}/verify/email/${EmailToken}">Click here</a>`
            console.log(VerificationLink);
            text = text.replace("{verification_Link}", VerificationLink)
            const mail = await emailTemplate(text)
            sendVerifyMail(email, subject, "", mail)
            return res.status(401).send({ status: false, message: "Please check your email address first. The confirmation link will be sent to you by post", data: [] })
        }

        // send permission levels
        // if (checkUser.role === 0) checkUser.dataValues.permission = false
        // if (checkUser.role === 1) checkUser.dataValues.permission = true
        // if (checkUser.role === 2) {
        //     const permission = []
        //     const getEmpPermissions = await Models.Emp_Permission.findAll({ where: { emp_id: checkUser.id } })
        //     getEmpPermissions.map((val) => {
        //         permission.push(val.dataValues.permission)
        //     })
        //     checkUser.dataValues.permission = permission
        // }

        const token = generateJWTToken({ userId: checkUser.id }, "1000h")
        delete checkUser.dataValues.password

        // //user has no subscribe product than login upto 60 days
        // const findUser = await Models.User_Subs_Product.findAll({ where: { user_id: checkUser.id } })

        // const product_subs_product = await findUser.map((val) => {
        //     if (val.dataValues.subs_status == 1) {
        //         return 1
        //     } else {
        //         return val.dataValues.updatedAt
        //     }
        // })
        // // user has subscribe product than login
        // if (product_subs_product.includes(1)) return res.status(200).send({ status: true, message: "login successfully", token, data: checkUser });

        // // user has no subscribe product than login denied , go to product page for subsccribe
        // const newArr = product_subs_product.filter(item => typeof item !== 'number');
        // const allDateArray = newArr.map(date => moment(date));
        // const lastDate = moment.max(allDateArray);
        // const dateAfter2Months = lastDate.add(2, 'months');
        // const date = moment(dateAfter2Months);
        // const formattedDate = date.format('DD-MM-YYYY');
        // const systemDate = new Date();
        // const dates = systemDate.toISOString()
        // const localdate = MomentNormal(dates, 'DD-MM-YYYY')

        // // user has no subscribe product and 60 days to go than user not to login go to product page for subscribr product
        // if (formattedDate == localdate) return res.status(200).send({ status: false, message: "your subscription is over , please subscribe product ", expire: true, data: checkUser });

        res.status(200).send({ status: true, message: "Login Successful", token, data: checkUser })

    } catch (err) {
        console.log(err)
        res.status(500).send({ status: false, message: "Login refused, something went wrong", data: [], error: err.message })
    }
}

// forgot password

exports.Forgotpassword = async (req, res) => {
    try {
        const { password } = req.body;
        const { token } = req.params
        // console.log(req)
        const decode = decodeJWTToken(token);
        const email = decode.email
        // const checkId = req.userId
        await Models.forgotpassword.findOne({ email })
        // genrate cripted password
        const hashedPassword = await bcrypt.hash(password, 11);
        const checkUser = await Models.Users.update({ password: hashedPassword }, { where: { email } });

        res.status(200).send({ status: true, message: "Password change successful", data: checkUser })

    } catch (err) {
        console.log(err)
        res.status(500).send({ status: false, message: "Password not changed, something went wrong", data: [], error: err.message })
    }
}

// export forgot password link

exports.ForgotPasswordLink = async (req, res) => {
    try {
        const { email } = req.body

        if (!email) return res.status(404).send({ status: false, message: "Please enter your e-mail address", data: [] })
        const checkUser = await Models.Users.findOne({ where: { email } });

        const token = generateJWTToken({ email }, "10m")
        await Models.forgotpassword.create({ email, token })
        const VerificationLink = `<p>Hallo <strong>${checkUser.firstName} ${checkUser.lastName}</strong> please <a href="${process.env.BASE_URL}/forgotPassword/${token}">Click here</a> to change Password </p>`
        console.log(VerificationLink);        
        sendVerifyMail(email, 'Blacklink forgot Password Link', "", VerificationLink)
        res.status(200).send({ status: true, message: "Email sent successfully", data: [] })

    } catch (err) {
        console.log(err)
        res.status(500).send({ status: false, message: "Email link cannot be sent, an error has occurred", data: [], error: err.message })
    }
}