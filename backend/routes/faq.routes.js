const { addFaq,listFaq,getFaq,updateFaq,deleteFaq } = require("../controllers/faq.controller")
const { isLogin, isAdmin } = require("../middleware/checkAuthenticate")

module.exports = (app) =>{
    app.post("/faq/add",[isLogin,isAdmin],addFaq);
    app.get("/faq/list",[isLogin,isAdmin],listFaq);
    app.get("/faq/get/:id",[isLogin,isAdmin],getFaq);
    app.patch("/faq/update/:id",[isLogin,isAdmin],updateFaq);
    app.post("/faq/delete/:id",[isLogin,isAdmin],deleteFaq);
}