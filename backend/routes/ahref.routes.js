const { getBacklinksForDomain } = require("../controllers/ahref.controller")
const { isLogin, isCustomer } = require("../middleware/checkAuthenticate")
module.exports = (app) =>{    
	app.get("/getBacklinks/:domain",[isLogin], getBacklinksForDomain)
}