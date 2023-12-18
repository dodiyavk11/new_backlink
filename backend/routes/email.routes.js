const { createEmailTemplate, templateList, removeTemplate, getTemplate, editEmailTemplate} = require("../controllers/email.controller")
const { isLogin, isAdmin } = require("../middleware/checkAuthenticate")
const { emailAttachementUpload } = require("../middleware/EmailFileMiddleware")

module.exports = (app) =>{
    app.post("/emailTemplate/add",[isLogin,isAdmin],emailAttachementUpload.single("file"),createEmailTemplate);
    app.get("/emailTemplate/delete/:id",[isLogin,isAdmin],removeTemplate);
    app.get("/emailTemplate/list",[isLogin,isAdmin],templateList);
    app.post("/emailTemplate/get/:id",[isLogin,isAdmin],getTemplate);
    app.patch("/emailTemplate/edit/:id",[isLogin,isAdmin],emailAttachementUpload.single("file"),editEmailTemplate);
}