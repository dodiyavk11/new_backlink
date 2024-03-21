const { initPayment,initPaymentFrontSide, getPaymentDetails,viewTranscation,refundPayment, initPaymentPlan,getPlanPaymentDetails,handlePaymentResponse, initPaymentPlanPurches, handlePaymentResponsePlan } = require("../controllers/payment.controller")
const { isLogin, isCustomer } = require("../middleware/checkAuthenticate")
module.exports = (app) =>{    
    app.post("/payment",[isLogin],initPayment)
    app.post("/paymentFrontSide",[isLogin,isCustomer],initPaymentFrontSide)
    app.post("/plan-payment-init",[isLogin,isCustomer],initPaymentPlanPurches)
    app.post("/getPayments",getPaymentDetails)
    app.get("/getPayments", viewTranscation);
    app.get("/refundPayment/:id",[isLogin], refundPayment);
    app.post("/subscriptionPayment",[isLogin],initPaymentPlan)

    /* Recieve payment success response from fronside */
    app.post("/paymentRespone/:paymentId",[isLogin,isCustomer],handlePaymentResponse)
    app.post("/plan-paymentRespone/:paymentId",[isLogin,isCustomer],handlePaymentResponsePlan)
}