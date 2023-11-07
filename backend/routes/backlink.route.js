const { getDomainBacklinksDetails, addPublisherDomain,getSingleConetentLinks, editPublisherDomain,deletePublisherDomain,getPublisherDomainList,getConetentLinks, getPublisherOrder, publisherUpdateOrderStatus, getPublisherDomain } = require('../controllers/backlinks.controller')
const { isLogin, isPublisher, isAdmin, isCustomer } =require('../middleware/checkAuthenticate')

module.exports = (app) => {
	/* publisher route */
	app.post('/publisher/addDomain',[isLogin,isPublisher],addPublisherDomain)
	app.post('/publisher/updateDomain/:domainId',[isLogin,isPublisher],editPublisherDomain)
	app.get('/publisher/deleteDomain/:id',[isLogin,isPublisher],deletePublisherDomain)
	app.get('/publisher/domains',[isLogin,isPublisher],getPublisherDomainList)
	app.get('/publisher/domain/:domainId',[isLogin,isPublisher], getPublisherDomain)
	/* customer route */
	app.post('/contentlinks',[isLogin,isCustomer], getConetentLinks)
	app.get('/contentlinks/:hash_id',[isLogin,isCustomer], getSingleConetentLinks)
}