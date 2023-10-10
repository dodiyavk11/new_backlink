const { getDomainBacklinksDetails, addPublisherDomain, editPublisherDomain,deletePublisherDomain,getPublisherDomainList } = require('../controllers/backlinks.controller')
const { isLogin, isPublisher, isAdmin } =require('../middleware/checkAuthenticate')

module.exports = (app) => {
	// app.get('/contentlinks/:hash_id',[isLogin],getDomainBacklinksDetails)
	app.post('/publisher/addDomain',[isLogin,isPublisher],addPublisherDomain)
	app.post('/publisher/updateDomain/:domainId',[isLogin,isPublisher],editPublisherDomain)
	app.get('/publisher/deleteDomain/:id',[isLogin,isPublisher],deletePublisherDomain)
	app.get('/publisher/domains',[isLogin,isPublisher],getPublisherDomainList)
}