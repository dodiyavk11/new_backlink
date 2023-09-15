const { getDomain, addDomain, deleteDomain, getSingleDoimain, editDomain } = require("../controllers/domain.controller")
const { getDomainTags,addDomainTag,deleteDomainTag,getSingleDomainTag,editDomainTag } = require("../controllers/domain_tag.controller")
const { isLogin,isAdmin } = require('../middleware/checkAuthenticate')

module.exports = (app) =>{
	// domain routes
	app.post("/domain/list",[isLogin,isAdmin],getDomain);
	app.post("/domain/add",[isLogin,isAdmin],addDomain);
	app.post("/domain/delete/:id",[isLogin,isAdmin],deleteDomain);
	app.post("/domain/get/:id",[isLogin,isAdmin],getSingleDoimain);
	app.patch("/domain/edit/:id",[isLogin,isAdmin],editDomain)

	// domain tags routes
	app.post("/domain_tag/list",[isLogin,isAdmin],getDomainTags);
	app.post("/domain_tag/add",[isLogin,isAdmin],addDomainTag);
	app.post("/domain_tag/delete/:id",[isLogin,isAdmin],deleteDomainTag);
	app.post("/domain_tag/get/:id",[isLogin,isAdmin],getSingleDomainTag);
	app.patch("/domain_tag/edit/:id",[isLogin,isAdmin],editDomainTag)
}