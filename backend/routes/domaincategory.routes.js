const { getDomainCategory,addDomainCategory } = require("../controllers/domain_category.controller")
const { isLogin,isAdmin } = require('../middleware/checkAuthenticate')

module.exports = (app) =>{
	app.post("/domainCategory/list",[isLogin,isAdmin],getDomainCategory);
	app.post("/domainCategory/add",[isLogin,isAdmin],addDomainCategory);
}