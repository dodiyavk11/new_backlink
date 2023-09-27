const { initPayment,getPaymentDetails,viewTranscation,refundPayment, initPaymentPlan,getPlanPaymentDetails } = require("../controllers/payment.controller")
const { isLogin, isCustomer } = require("../middleware/checkAuthenticate")
module.exports = (app) =>{    
    app.post("/payment",[isLogin],initPayment)
    app.post("/getPayments",getPaymentDetails)
    app.get("/getPayments", viewTranscation);
    app.get("/refundPayment/:id",[isLogin], refundPayment);
    app.post("/subscriptionPayment",[isLogin],initPaymentPlan)
}