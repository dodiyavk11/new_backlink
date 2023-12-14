const { getDomainBacklinksDetails, addPublisherDomain,getSingleConetentLinks, addToFavorite, publisherExcelFileDataAdd,editPublisherDomain,deletePublisherDomain,getPublisherDomainList,getConetentLinks, getPublisherOrder, publisherUpdateOrderStatus, getPublisherDomain } = require('../controllers/backlinks.controller')
const { isLogin, isPublisher, isAdmin, isCustomer,isAdminAndIsCustomer } =require('../middleware/checkAuthenticate')
const { uploadExcel } = require("../middleware/excelUpload.js")

module.exports = (app) => {
	/* publisher route */
	app.post('/publisher/addDomain',[isLogin,isPublisher],addPublisherDomain)
	app.post('/publisher/updateDomain/:domainId',[isLogin,isPublisher],editPublisherDomain)
	app.get('/publisher/deleteDomain/:id',[isLogin,isPublisher],deletePublisherDomain)
	app.get('/publisher/domains',[isLogin,isPublisher],getPublisherDomainList)
	app.get('/publisher/domain/:hash_id',[isLogin,isPublisher], getPublisherDomain)
	app.post('/publisher/domain/excelUpload',[isLogin,isPublisher,uploadExcel.single('file')], publisherExcelFileDataAdd)
	/* customer route */
	app.post('/contentlinks',[isLogin,isAdminAndIsCustomer], getConetentLinks)
	app.get("/contentlinks/:id/favorite",[isLogin,isCustomer],addToFavorite);
	app.get('/contentlinks/:hash_id',[isLogin,isCustomer], getSingleConetentLinks)
}