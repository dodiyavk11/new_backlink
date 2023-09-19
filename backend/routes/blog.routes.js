const { addBlog,listBlog,getBlog,updateBlog,deleteBlog } = require("../controllers/blog.controller")
const { isLogin, isAdmin } = require("../middleware/checkAuthenticate")

module.exports = (app) =>{
    app.post("/blog/add",[isLogin,isAdmin],addBlog);
    app.get("/blog/list",[isLogin,isAdmin],listBlog);
    app.get("/blog/get/:id",[isLogin,isAdmin],getBlog);
    app.patch("/blog/update/:id",[isLogin,isAdmin],updateBlog);
    app.post("/blog/delete/:id",[isLogin,isAdmin],deleteBlog);
}