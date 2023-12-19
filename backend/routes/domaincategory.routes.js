const { getDomainCategory, addDomainCategory, deleteDomainCategory, getSingleDoimainCategory, editDomainCategory } = require("../controllers/domain_category.controller")
const { isLogin,isAdmin,isPublisher } = require('../middleware/checkAuthenticate')

module.exports = (app) =>{
	app.get("/domainCategory/list",[isLogin],getDomainCategory);
	app.post("/domainCategory/add",[isLogin,isAdmin],addDomainCategory);
	app.get("/domainCategory/delete/:id",[isLogin,isAdmin],deleteDomainCategory);
	app.post("/domainCategory/get/:id",[isLogin,isAdmin],getSingleDoimainCategory);
	app.patch("/domainCategory/edit/:id",[isLogin,isAdmin],editDomainCategory)
}