const { getDomainBacklinksDetails, addPublisherDomain, editPublisherDomain,deletePublisherDomain,getPublisherDomainList,getConetentLinks } = require('../controllers/backlinks.controller')
const { isLogin, isPublisher, isAdmin, isCustomer } =require('../middleware/checkAuthenticate')

module.exports = (app) => {
	/* publisher route */
	app.post('/publisher/addDomain',[isLogin,isPublisher],addPublisherDomain)
	app.post('/publisher/updateDomain/:domainId',[isLogin,isPublisher],editPublisherDomain)
	app.get('/publisher/deleteDomain/:id',[isLogin,isPublisher],deletePublisherDomain)
	app.get('/publisher/domains',[isLogin,isPublisher],getPublisherDomainList)

	/* customer route */
	app.post('/contentlinks',[isLogin,isCustomer], getConetentLinks)
}