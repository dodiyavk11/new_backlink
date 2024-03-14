const Models = require("../models");
const Sequelize = require("sequelize");
const { formatCurrency } = require("../utils/otherUtility.js");

async function checkUserBalance(user_id, hash_id, addOnPrice) {
  try {
    const userBalance = await Models.UserWallet.findOne({
      where: { user_id },
    });
    if (userBalance) {
      let totalCartPrice = 0;
      for (const hashId of hash_id) {
        const prices = await Models.publisherDomain.sum("price", {
          where: {
            hash_id: {
              [Sequelize.Op.in]: [hashId],
            },
          },
        });
        totalCartPrice += parseFloat(prices.toFixed(2));
      }
      const balance = parseFloat(userBalance.balance);
      let price;
      if (addOnPrice) {
        const sumOfAddOnPrice = addOnPrice.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          0
        );
        price = (totalCartPrice + parseFloat(sumOfAddOnPrice)).toFixed(2);
      } else {
        price = parseFloat(totalCartPrice) + addOnPrice;
      }
      if (balance >= price) {
        return true;
      }
    }
    return false;
  } catch (err) {
    return false;
  }
}

async function deductFromWallet(user_id, amount, type) {
  try {
    const userWallet = await Models.UserWallet.findOne({
      where: { user_id: user_id },
    });
    const currentBalance = parseFloat(userWallet.balance);
    let newBalance;
    if (type === "deduct") {
      newBalance = currentBalance - parseFloat(amount);
    }
    if (type === "refund") {
      newBalance = currentBalance + parseFloat(amount);
    }
    const updateOnfo = { balance: newBalance };
    const walletInfoData = await Models.UserWallet.update(updateOnfo, {
      where: { user_id: user_id },
    });
    if (walletInfoData) {
      return true;
    }
    return false;
  } catch (err) {
    return false;
    console.log(err);
  }
}

exports.linkBundlePlaceOrder = async (req, res) => {
  try {
    // const user_id = req.userId;
    // const { planId } = req.params;
    // const checkPlan = await Models.SubscriptionPlans.findOne({
    //   where: { id: planId },
    // });
    // const userBalance = await checkUserBalance(user_id, [], [checkPlan.price]);
    // if (userBalance) {
    //   const { anchortext, linktarget, project_id, publication_date } = req.body;
    //   const textCreation = "Editorial";
    //   const wordCount = 0;
    //   const approveText = 0;
    //   const textCreationPrice = 0;
    //   const approveTextPrice = 0;
    //   const chooseByBacklink = 0;
    //   const isBundle = planId;
    //   const publisher_id = 0;
    //   const customer_id = user_id;
    //   const domain_id = 0;
    //   const backlink_id = 0;
    //   const total_price = checkPlan.price;
    //   const status = "Pending";

    //   const placeOrder = await Models.newOrder.create({
    //     anchortext,
    //     linktarget,
    //     project_id,
    //     publication_date,
    //     textCreation,
    //     wordCount,
    //     approveText,
    //     textCreationPrice,
    //     approveTextPrice,
    //     chooseByBacklink,
    //     isBundle,
    //     publisher_id,
    //     customer_id,
    //     domain_id,
    //     backlink_id,
    //     total_price,
    //     status,
    //   });

    //   await deductFromWallet(customer_id, total_price, "deduct");

    //   const transaction_type = "Place order";
    //   const description = "Buy FairLinked Link Bundle Plan " + checkPlan.name;
    //   const now = new Date();
    //   const payment_created = now.toISOString();
    //   const transaction_id = "order_" + placeOrder.dataValues.id;
    //   const statusN = "paid";
    //   const tranInfo = {
    //     user_id: customer_id,
    //     amount: total_price,
    //     transaction_type,
    //     description,
    //     payment_created,
    //     transaction_id,
    //     status: statusN,
    //     paymentData: placeOrder,
    //     order_id: placeOrder.dataValues.id,
    //   };
    //   await Models.Transactions.create(tranInfo);

    //   return res
    //     .status(200)
    //     .send({ status: true, message: "Your Order placed successfully" });
    // }
    // return res.status(400).send({
    //   status: false,
    //   message: "Insufficient balance",
    //   error: "Insufficient balance",
    // });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: "Your order can not placed, an error occured",
      error: err.message,
    });
  }
};
