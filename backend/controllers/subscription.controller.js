const Models = require("../models");
const Sequelize = require("sequelize");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { Op } = require("sequelize");

exports.addSubscription = async (req, res) => {
  try {
    const { name, description, price, max_request_per_day, status, validity } =
      req.body;
    let isValid = fieldValidation(req.body);
    if (isValid.isTrue) {
      const planInfo = {
        name,
        description,
        price: price,
        max_request_per_day,
        status,
        validity,
      };
      //   const product = await stripe.products.create({
      //     name: name,
      //     description: description,
      //   });

      //   const productPrice = await stripe.prices.create({
      //     product: product.id,
      //     unit_amount: price * 100,
      //     currency: "inr",
      //   });
      //   if (product.id !== "" && productPrice.id !== "") {
      //     planInfo.stripe_product_id = product.id;
      //     planInfo.stripe_price_id = productPrice.id;
      //     const addData = await Models.Subscriptions.create(planInfo);
      //     return res.status(200).send({
      //       status: true,
      //       message: "Subscription Plan added successfully.",
      //       data: addData,
      //     });
      //   }
      const addData = await Models.Subscriptions.create(planInfo);
      return res.status(200).send({
        status: true,
        message: "Subscription Plan added successfully.",
        data: addData,
      });
    } else {
      res.status(400).send({
        status: false,
        message: "All fields are required.",
        field: isValid.requiredFields,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: false,
      message: "Subscription cannot be added,an error occurred.",
      data: [],
      error: err.message,
    });
  }
};

exports.listSubscription = async (req, res) => {
  try {
    const listPlan = await Models.Subscriptions.findAll({
      order: [["price", "ASC"]],
    });
    res.status(200).send({
      status: true,
      message: "Subscription listed successfully.",
      data: listPlan,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: false,
      message: "Subscription cannot be listed, an error occurred.",
      data: [],
      error: err.message,
    });
  }
};

exports.listSubscriptionActive = async (req, res) => {
  try {
    const listPlan = await Models.Subscriptions.findAll({
      where: { status: 1 },
      order: [["price", "ASC"]],
    });
    res.status(200).send({
      status: true,
      message: "Subscription listed successfully.",
      data: listPlan,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: false,
      message: "Subscription cannot be listed, an error occurred.",
      data: [],
      error: err.message,
    });
  }
};

exports.updateSubscription = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, max_request_per_day, status, validity } =
      req.body;
    let isValid = fieldValidation(req.body);
    if (isValid.isTrue) {
      const planInfo = {
        name,
        description,
        price: price,
        max_request_per_day,
        status,
        validity,
      };

      const getOldData = await Models.Subscriptions.findOne({
        where: { id: id },
      });
      //   if (getOldData.name !== name || getOldData.description !== description) {
      //     const updatedProduct = await stripe.products.update(
      //       getOldData.stripe_product_id,
      //       {
      //         name: name,
      //         description: description,
      //       }
      //     );
      //   }
      //   if (getOldData.price !== price) {
      //     const updatedPrice = await stripe.prices.update(
      //       getOldData.stripe_price_id,
      //       {
      //         unit_amount: price * 100,
      //         currency: "inr",
      //       }
      //     );
      //   }
      const updateData = await Models.Subscriptions.update(planInfo, {
        where: { id: id },
      });
      res.status(200).send({
        status: true,
        message: "Subscription plan updated successfully.",
        data: updateData,
      });
    } else {
      res.status(400).send({
        status: false,
        message: "All filed are required",
        field: isValid.requiredFields,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: false,
      message: "Subscription plan cannot be updated, an error occurred.",
      data: [],
      error: err.message,
    });
  }
};

function fieldValidation(bodyFiled) {
  const requiredFields = [
    "name",
    "description",
    "price",
    "max_request_per_day",
    "status",
    "validity",
  ];
  const resp = {};
  const isValid = requiredFields.every((filed) => {
    return (
      typeof bodyFiled[filed] !== "undefined" &&
      bodyFiled[filed] !== null &&
      bodyFiled[filed] !== ""
    );
  });
  resp.isTrue = isValid;
  resp.requiredFields = requiredFields;
  return resp;
}

exports.updateSubscriptionStatus = async (req, res) => {
  try {
    const { id, status } = req.params;
    const updateStatus = await Models.Subscriptions.update(
      { status },
      { where: { id } }
    );
    const listPlan = await Models.Subscriptions.findAll({
      order: [["price", "ASC"]],
    });
    res.status(200).send({
      status: true,
      message: "Status update successfully",
      data: listPlan,
    });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: "Status can not update, an error occurred.",
      error: err.message,
    });
  }
};

exports.getActiveSubscription = async (req, res) => {
  try {
    const user_id = req.userId;
    const today = new Date();
    const checkData = await Models.UserSubscription.findOne({
      where: {
        [Op.and]: [
          { start_date: { [Op.lte]: today } },
          { end_date: { [Op.gte]: today } },
        ],
        user_id,
      },
    });
    res.status(200).send({
      status: true,
      message: "Status update successfully",
      data: checkData ? true : false,
    });
  } catch (err) {
    res.status(500).send({
      status: false,
      error: err.message,
      message: "Something went wrong",
    });
  }
};
