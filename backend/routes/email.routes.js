const { createEmailTemplate, templateList, removeTemplate, getTemplate, editEmailTemplate} = require("../controllers/email.controller")
const { isLogin, isAdmin } = require("../middleware/checkAuthenticate")
const { emailAttachementUpload } = require("../middleware/EmailFileMiddleware")

module.exports = (app) =>{
    app.post("/emailTemplate/add",[isLogin,isAdmin],emailAttachementUpload.single("file"),createEmailTemplate);
    app.post("/emailTemplate/delete/:id",[isLogin,isAdmin],removeTemplate);
    app.post("/emailTemplate/list",[isLogin,isAdmin],templateList);
    app.post("/emailTemplate/get/:id",[isLogin,isAdmin],getTemplate);
    app.patch("/emailTemplate/edit/:id",[isLogin,isAdmin],emailAttachementUpload.single("file"),editEmailTemplate);
}