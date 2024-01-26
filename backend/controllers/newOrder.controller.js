const Models = require("../models");
const Sequelize = require("sequelize");
const { Op } = require("sequelize");
const { sendVerifyMail, emailTemplate } = require("../utils/emailsUtils");
const { formatCurrency } = require("../utils/otherUtility.js");
const generateUniqueId = require("generate-unique-id");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const Joi = require("joi");
const Papa = require("papaparse");

exports.addNewOrder = async (req, res) => {
  try {
    const orderData = req.body;
    const { hash_id } = req.params;
    orderData.hash_id = hash_id;

    const schema = Joi.object({
      textCreation: Joi.string().required(),
      // anchortext: Joi.string().required(),
      anchortext: Joi.when("chooseByBacklink", {
        is: true,
        then: Joi.allow(null),
        otherwise: Joi.string().required().label("Anchor Text"),
      }),
      hash_id: Joi.string().required(),
      linktarget: Joi.string().uri().required(),
      publication_date: Joi.date().iso().allow(""),
      note: Joi.string().allow(""),
      project_id: Joi.string().allow(""),
      chooseByBacklink: Joi.boolean(),
      textCreationPrice: Joi.number().integer(),
      approveText: Joi.number().integer(),
      approveTextPrice: Joi.number().integer(),
      wordCount: Joi.number().integer(),
      filename: Joi.string().when("textCreation", {
        is: "Own",
        then: Joi.string().required(),
        otherwise: Joi.string().allow(""),
      }),
      originalname: Joi.string().when("textCreation", {
        is: "Own",
        then: Joi.string().required(),
        otherwise: Joi.string().allow(""),
      }),
    });
    const { error, value } = schema.validate(orderData);

    if (error) {
      return res.status(422).send({
        status: false,
        message: "Validation error",
        error: error.details,
      });
    }

    // Process the single order
    const processOrder = async (orderData) => {
      const customer_id = req.userId;
      const checkUser = await Models.Users.findOne({
        where: {
          id: customer_id,
        },
      });
      const extraAddOnPrice =
        orderData.textCreationPrice + orderData.approveTextPrice;
      const userBalance = await checkUserBalance(
        customer_id,
        [hash_id],
        [extraAddOnPrice]
      );

      if (!userBalance) {
        return res.status(400).send({
          status: false,
          message: "Insufficient balance",
          error: "Insufficient balance",
        });
      }

      const placeOrderData = [];

      try {
        const {
          anchortext,
          linktarget,
          publication_date,
          note,
          project_id,
          hash_id,
          filename,
          originalname,
          textCreation,
          wordCount,
          approveText,
          textCreationPrice,
          approveTextPrice,
          chooseByBacklink,
        } = orderData; // Change product to orderData

        const getPublisherDomain = await getPublisherDomainData(null, hash_id);
        const publisher_id = getPublisherDomain.user_id;
        const domain_id = getPublisherDomain.id;
        const backlinkData = await getBacklinksData(domain_id);
        const backlink_id = backlinkData.id;
        const total_price = (
          parseFloat(getPublisherDomain.price) +
          parseFloat(textCreationPrice) +
          parseFloat(approveTextPrice)
        ).toFixed(2);
        const price = getPublisherDomain.price;
        const status = "Pending";
        const orderDataAdd = {
          publisher_id,
          customer_id,
          domain_id,
          backlink_id,
          status,
          total_price,
          price,
          anchortext,
          linktarget,
          publication_date,
          note,
          project_id,
          hash_id,
          textCreation,
          wordCount,
          approveText,
          textCreationPrice,
          approveTextPrice,
          chooseByBacklink,
          originalname,
          filename,
        };
        let sourcePath;
        let destPath;
        // Move the file from temp_file to order_assets
        if (filename !== "") {
          const sourceDir = "./assets/temp_file";
          const destDir = "./assets/order_assets";
          sourcePath = path.join(sourceDir, filename);
          destPath = path.join(destDir, filename);

          if (!fs.existsSync(sourcePath)) {
            return res.status(422).send({
              status: false,
              message: "The Text file is not found, please upload it.",
              error: "The Text file is not found, please upload it.",
            });
          }
        }

        const placeOrder = await Models.newOrder.create(orderDataAdd);
        placeOrderData.push(placeOrder);
        if (filename !== "") {
          await Models.orderFiles.create({
            order_id: placeOrder.dataValues.id,
            file_name: filename,
            original_name: originalname,
            file_path: "assets/order_assets/",
          });
          await moveFile(sourcePath, destPath);
        }
        // Deduct from user's wallet
        await deductFromWallet(customer_id, total_price, "deduct");

        // Create a transaction
        const transaction_type = "Place order";
        const description = "Buy backlinks " + getPublisherDomain.domain_name;
        const now = new Date();
        const payment_created = now.toISOString();
        const transaction_id = "order_" + placeOrder.dataValues.id;
        const statusN = "paid";
        const tranInfo = {
          user_id: customer_id,
          amount: total_price,
          transaction_type,
          description,
          payment_created,
          transaction_id,
          status: statusN,
          paymentData: placeOrder,
          order_id: placeOrder.dataValues.id,
        };

        await Models.Transactions.create(tranInfo);

        // Send email to admin
        const admin = await Models.Users.findAll({
          where: {
            isAdmin: 1,
          },
        });
        const mailTexts = await Models.email_format.findOne({
          where: {
            email_type: "create_new_order",
          },
        });

        let text = mailTexts.email_content;
        let subject = mailTexts.header;
        text = text.replace("{order_name}", getPublisherDomain.domain_name);
        text = text.replace(
          "{name}",
          checkUser.dataValues.firstName + " " + checkUser.dataValues.lastName
        );
        const mail = await emailTemplate(text);

        admin.map((val) => {
          sendVerifyMail(val.dataValues.email, subject, "", mail);
        });

        return res.status(200).send({
          status: true,
          message: "Order placed successfully",
          data: placeOrderData,
        });
      } catch (err) {
        console.log(err);
        return res.status(500).send({
          status: false,
          message: "Something went wrong",
          error: err.message,
        });
      }
    };

    processOrder(orderData);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};

exports.addCartOrder = async (req, res) => {
  try {
    const orderDatas = req.body;
    const schema = Joi.array().items(
      Joi.object({
        textCreation: Joi.string().required(),
        // anchortext: Joi.string().required().label("Anchortext"),
        anchortext: Joi.when("chooseByBacklink", {
          is: true,
          then: Joi.allow(null),
          otherwise: Joi.string().required().label("Anchor Text"),
        }),
        hash_id: Joi.string().required(),
        linktarget: Joi.string().uri().required().label("Link Target"),
        publication_date: Joi.date().iso().allow(""),
        note: Joi.string().allow(""),
        project_id: Joi.string().allow(""),
        domain_name: Joi.string().allow(""),
        tld: Joi.string().allow(""),
        cart_id: Joi.string().allow(""),
        id: Joi.number().integer(),
        total_price: Joi.number().precision(2).required(),
        price: Joi.number().precision(2).required(),
        chooseByBacklink: Joi.boolean(),
        textCreationPrice: Joi.number().integer(),
        approveText: Joi.number().integer(),
        approveTextPrice: Joi.number().integer(),
        wordCount: Joi.number().integer(),
        filename: Joi.string().when("textCreation", {
          is: "Own",
          then: Joi.string().required().label("File"),
          otherwise: Joi.string().allow("").label("File"),
        }),
        originalname: Joi.string().when("textCreation", {
          is: "Own",
          then: Joi.string().required().label("File"),
          otherwise: Joi.string().allow("").label("File"),
        }),
      })
    );
    const { error, value } = schema.validate(orderDatas, { abortEarly: false });

    if (error) {
      const errorMessage = error.details
        .map((err) => {
          const label = err.context.label ? `${err.context.label} ` : "";
          return `${err.path[0] + 1}.${err.message.replace(/["\[\]]/g, "")}`;
        })
        .join(", ");

      return res.status(422).send({
        status: false,
        message: "Validation error",
        error: errorMessage,
      });
    }
    // Process the orders
    const processOrders = async (orderDatas) => {
      const customer_id = req.userId;
      const checkUser = await Models.Users.findOne({
        where: {
          id: customer_id,
        },
      });
      const userBalance = await checkUserBalance(
        customer_id,
        orderDatas.map((item) => item.hash_id),
        orderDatas.map(
          (item) =>
            parseFloat(item.textCreationPrice) +
            parseFloat(item.approveTextPrice)
        )
      );
      if (!userBalance) {
        return res.status(400).send({
          status: false,
          message: "Insufficient balance",
          error: "Insufficient balance",
        });
      }

      const placeOrderData = [];

      try {
        for (const product of orderDatas) {
          const {
            anchortext,
            linktarget,
            publication_date,
            note,
            project_id,
            hash_id,
            filename,
            originalname,
            textCreation,
            wordCount,
            approveText,
            textCreationPrice,
            approveTextPrice,
            chooseByBacklink,
          } = product;

          const getPublisherDomain = await getPublisherDomainData(
            null,
            hash_id
          );
          const publisher_id = getPublisherDomain.user_id;
          const domain_id = getPublisherDomain.id;
          const backlinkData = await getBacklinksData(domain_id);
          const backlink_id = backlinkData.id;
          const total_price = (
            parseFloat(getPublisherDomain.price) +
            parseFloat(textCreationPrice) +
            parseFloat(approveTextPrice)
          ).toFixed(2);
          const price = getPublisherDomain.price;
          const status = "Pending";
          const orderData = {
            publisher_id,
            customer_id,
            domain_id,
            backlink_id,
            status,
            total_price,
            price,
            anchortext,
            linktarget,
            publication_date,
            note,
            project_id,
            hash_id,
            textCreation,
            wordCount,
            approveText,
            textCreationPrice,
            approveTextPrice,
            chooseByBacklink,
            originalname,
            filename,
          };

          let sourcePath;
          let destPath;
          // Move the file from temp_file to order_assets
          if (filename !== "") {
            const sourceDir = "./assets/temp_file";
            const destDir = "./assets/order_assets";
            sourcePath = path.join(sourceDir, filename);
            destPath = path.join(destDir, filename);

            if (!fs.existsSync(sourcePath)) {
              return res.status(422).send({
                status: false,
                message: "The Text file is not found, please upload it.",
                error: "The Text file is not found, please upload it.",
              });
            }
          }
          const placeOrder = await Models.newOrder.create(orderData);
          placeOrder.dataValues.backlink = getPublisherDomain.domain_name;
          placeOrderData.push(placeOrder);
          if (filename !== "") {
            await Models.orderFiles.create({
              order_id: placeOrder.dataValues.id,
              file_name: filename,
              original_name: originalname,
              file_path: "assets/order_assets/",
            });
            await moveFile(sourcePath, destPath);
          }

          // Deduct from user's wallet
          await deductFromWallet(customer_id, total_price, "deduct");

          // Create a transaction
          const transaction_type = "Place order";
          const description = "Buy backlinks " + getPublisherDomain.domain_name;
          const now = new Date();
          const payment_created = now.toISOString();
          const transaction_id = "order_" + placeOrder.dataValues.id;
          const statusN = "paid";
          const tranInfo = {
            user_id: customer_id,
            amount: total_price,
            transaction_type,
            description,
            payment_created,
            transaction_id,
            status: statusN,
            paymentData: placeOrder,
            order_id: placeOrder.dataValues.id,
          };

          await Models.Transactions.create(tranInfo);

          // Send email to admin
          const admin = await Models.Users.findAll({
            where: {
              isAdmin: 1,
            },
          });
          const mailTexts = await Models.email_format.findOne({
            where: {
              email_type: "create_new_order",
            },
          });

          let text = mailTexts.email_content;
          let subject = mailTexts.header;
          text = text.replace("{order_name}", getPublisherDomain.domain_name);
          text = text.replace(
            "{name}",
            checkUser.dataValues.firstName + " " + checkUser.dataValues.lastName
          );
          const mail = await emailTemplate(text);

          admin.map((val) => {
            sendVerifyMail(val.dataValues.email, subject, "", mail);
          });
        }
        await Models.userCart.destroy({
          where: { user_id: customer_id },
        });
        return res.status(200).send({
          status: true,
          message: "Orders placed successfully",
          data: placeOrderData,
        });
      } catch (err) {
        console.log(err);
        return res.status(500).send({
          status: false,
          message: "Something went wrong",
          error: err.message,
        });
      }
    };
    processOrders(req.body);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};

/* customer cancel order */
exports.cancelOrder = async (req, res) => {
  try {
    const user_id = req.userId;
    const { orderId } = req.params;
    const checkStatus = await Models.newOrder.findOne({
      where: {
        [Op.and]: [
          { id: orderId },
          { status: "Pending" },
          { customer_id: user_id },
        ],
      },
    });
    if (checkStatus) {
      const refund = await deductFromWallet(
        user_id,
        checkStatus.total_price,
        "refund"
      );

      const domainData = await getPublisherDomainData(
        checkStatus.domain_id,
        null
      );
      const transaction_type = "Cancel order refund";
      // const description = "Cancel backlink "+ domainData ? domainData.domain_name : "Link bundle";
      const description =
        "Cancel backlink " +
        (domainData ? domainData.domain_name : "Link bundle");
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      const payment_created = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      const transaction_id = "cancel_order_" + checkStatus.id;
      const statusT = "refunded";

      const tranInfo = {
        user_id,
        amount: checkStatus.total_price,
        transaction_type: transaction_type,
        description: description,
        payment_created: payment_created,
        transaction_id: transaction_id,
        status: statusT,
        paymentData: checkStatus,
      };

      const addTrans = await Models.Transactions.create(tranInfo);
      checkStatus.status = "Cancelled";
      await checkStatus.save();

      const customer = await Models.Users.findByPk(user_id);

      /* send mail to customer */
      const mailTexts = await Models.email_format.findOne({
        where: { email_type: "order_cancel" },
      });

      let text = mailTexts.email_content;
      let subject = mailTexts.header;
      text = text.replace("{order_name}", domainData.domain_name);
      text = text.replace("{order_status}", "Cancelled");
      text = text.replace("{amount}", checkStatus.total_price);
      text = text.replace(
        "{name}",
        customer.firstName + " " + customer.lastName
      );
      const mail = await emailTemplate(text);
      sendVerifyMail(customer.email, subject, "", mail);
      /* dummy email start*/
      var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "5486eff1d5793c",
          pass: "e17b0b8e8f08ac",
        },
      });

      const mailOptions = {
        from: "rjnaghera@gmail.com",
        to: customer.email,
        subject: subject,
        text: mail,
      };
      transport.sendMail(mailOptions, (error, info) => {
        // if (error) {
        //   console.error(error);
        // } else {
        //   console.log('Email sent: ' + info.response);
        // }
      });
      /* dummy email end*/
      return res.status(200).send({
        status: true,
        message:
          "Your order has been Cancelled successfully,and Rs." +
          checkStatus.total_price +
          " refunded in your wallet.",
        data: checkStatus,
      });
    }
    return res.status(400).send({
      status: false,
      message: "You can not cancel this Order.",
      error: "You can not cancel this Order.",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: false,
      message: "Something went to wrong.",
      error: err.message,
    });
  }
};

/* customer get all order */
exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.userId;
    const baseQuery = {
      include: [
        {
          model: Models.publisherDomain,
          as: "domain",
          attributes: { exclude: ["updated_at", "created_at", "id"] },
        },
        {
          model: Models.Domains,
          as: "project",
          attributes: { exclude: ["updated_at", "created_at", "id"] },
        },
      ],
      where: { customer_id: userId },
    };

    const getFilterQuery = await createFilterQuery(req.body, "user", baseQuery);
    getFilterQuery.order = [["id", "DESC"]];
    const getOrderData = await Models.newOrder.findAll(getFilterQuery);
    res.status(200).send({
      status: true,
      message: "Order fetched successfully.",
      data: getOrderData,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: false,
      message: "Something went to wrong, Please try again.",
      error: err.message,
    });
  }
};
exports.getAdminAllOrders = async (req, res) => {
  try {
    const userId = req.userId;
    const baseQuery = {
      include: [
        {
          model: Models.publisherDomain,
          as: "domain",
          attributes: { exclude: ["updated_at", "created_at", "id"] },
        },
        {
          model: Models.Domains,
          as: "project",
          attributes: { exclude: ["updated_at", "created_at", "id"] },
        },
        {
          model: Models.Users,
          as: "customer",
          attributes: {
            exclude: [
              "password",
              "created_at",
              "isDeleted",
              "updated_at",
              "isAdmin",
              "invoice_email",
              "vat_id",
              "password",
              "email_verified",
            ],
          },
        },
        {
          model: Models.Users,
          as: "publisher",
          attributes: {
            exclude: [
              "password",
              "created_at",
              "isDeleted",
              "updated_at",
              "isAdmin",
              "invoice_email",
              "vat_id",
              "password",
              "email_verified",
            ],
          },
        },
      ],
      where: {},
    };

    const getFilterQuery = await createFilterQuery(
      req.body,
      "admin",
      baseQuery
    );
    const getOrderData = await Models.newOrder.findAll(getFilterQuery);
    res.status(200).send({
      status: true,
      message: "Order fetched successfully.",
      data: getOrderData,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: false,
      message: "Something went to wrong, Please try again.",
      error: err.message,
    });
  }
};
/* publisher get their backlink(domain) order placed by customer */
exports.getPublisherOrder = async (req, res) => {
  try {
    const publisher_id = req.userId;
    const baseQuery = {
      include: [
        {
          model: Models.publisherDomain,
          as: "domain",
        },
        {
          model: Models.Users,
          as: "customer",
          attributes: {
            exclude: [
              "password",
              "isAdmin",
              "created_at",
              "updated_at",
              "email_verified",
            ],
          },
        },
      ],
      where: { publisher_id: publisher_id },
    };
    const getFilterQuery = await createFilterQuery(
      req.body,
      "publisher",
      baseQuery
    );
    const orderData = await Models.newOrder.findAll({ ...getFilterQuery });
    res.status(200).send({
      status: true,
      message: "Order fetch successfully.",
      data: orderData,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: false,
      message: "Something went to wrong.",
      error: err.message,
    });
  }
};

exports.exportDataCsvPublisher = async (req, res) => {
  const publisher_id = req.userId;
  const baseQuery = {
    include: [
      {
        model: Models.publisherDomain,
        as: "domain",
        attributes: ["id", "domain_name"],
      },
    ],
    attributes: [
      "id",
      "total_price",
      "status",
      "price",
      "anchortext",
      "linktarget",
      "publication_date",
      "note",
    ],
    where: { publisher_id: publisher_id },
  };

  const orderDataInstances = await Models.newOrder.findAll(baseQuery);
  console.log(orderDataInstances)
  const customHeaders = [
    "Id",
    "Domain Name",
    "Price",
    "Total Price",
    "Status",
    "Anchortext",
    "Linktarget",
    "Publication Date",
    "Note",
  ];

  const orderData = orderDataInstances.map((instance) => {
    const plainInstance = instance.get({ plain: true });
    const domainData = plainInstance.domain || {};
    return {
      Id: plainInstance.id,
      "Domain Name": domainData.domain_name || "",
      Price: formatCurrency(plainInstance.price),
      "Total Price": formatCurrency(plainInstance.total_price),
      "Status": plainInstance.status,
      Anchortext: plainInstance.anchortext,
      Linktarget: plainInstance.linktarget,
      "Publication Date": plainInstance.publication_date,
      Note: plainInstance.note,
    };
  });

  const customCsv = Papa.unparse({
    fields: customHeaders,
    data: orderData,
  });

  const fileName = `order_${publisher_id}.csv`;
  const tempFileDirectory = path.resolve("./assets/csv", fileName);

  fs.writeFileSync(tempFileDirectory, customCsv, { encoding: "utf-8" });
  // res.sendFile(tempFileDirectory);
  if (fs.existsSync(tempFileDirectory)) {
    res.status(200).send({
      status: true,
      message: "CSV generating successfully.",
      filepath: `assets/csv/${fileName}`,
      fileName: fileName,
    });
  } else {
    res.status(500).send({
      status: false,
      message: "Error generating the CSV file.",
      data: null,
    });
  }
};

/* publisher update order status for their backlink(domain) order placed by customer */
exports.publisherUpdateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orderData = await Models.newOrder.findByPk(orderId);
    if (!orderData) {
      return res
        .status(404)
        .send({ status: false, message: "Order not found." });
    }
    orderData.status = status;
    await orderData.save();
    const customer = await Models.Users.findByPk(orderData.customer_id);
    const purchasedDomain = await Models.publisherDomain.findByPk(
      orderData.domain_id
    );

    /* send mail to customer */
    const mailTexts = await Models.email_format.findOne({
      where: { email_type: "order_status" },
    });

    let text = mailTexts.email_content;
    let subject = mailTexts.header;
    text = text.replace("{order_name}", purchasedDomain.domain_name);
    text = text.replace("{order_status}", status);
    text = text.replace("{name}", customer.firstName + " " + customer.lastName);
    const mail = await emailTemplate(text);
    sendVerifyMail(customer.email, subject, "", mail);

    res.status(200).send({
      status: true,
      message: "Order status update successfully.",
      data: orderData,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: false,
      message: "Something wnet to wrong, Please try again.",
      error: err.message,
    });
  }
};

exports.textFileUpload = async (req, res) => {
  try {
    const { originalname, filename } = req.file;
    const data = { originalname, filename };
    deleteFilesOlder();
    // const user_id = req.userId;
    // let fileKey = generateUniqueId({
    //           length: 32,
    //           useLetters: true
    //       });
    //       const addTempFile = await Models.tempFile.create({ fileName,fileKey,user_id });
    res
      .status(200)
      .send({ status: true, message: "File upload successfully.", data: data });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ status: false, message: "Something went to wrong." });
  }
};

exports.textFileDelete = async (req, res) => {
  try {
    const filename = req.params.filename;
    const tempFileDirectory = "./assets/temp_file/" + filename;
    if (filename !== "") {
      fs.unlink(tempFileDirectory, (err) => {
        if (!err) {
          res
            .status(200)
            .send({ status: true, message: "File successfully deleted" });
        } else {
          // res.status(500).send({ status: false, message: "File deletion failed, an error occurred", error: err });
          res
            .status(200)
            .send({ status: true, message: "File successfully deleted" });
        }
      });
    }
  } catch (err) {
    res.status(500).send({
      status: false,
      message: "File deletion failed, an error occurred",
      error: err.message,
    });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const user_id = req.userId;
    const { hash_id } = req.params;
    const getData = await Models.publisherDomain.findOne({
      where: { hash_id: hash_id },
    });
    if (getData) {
      let cart_id = generateUniqueId({
        length: 9,
        useLetters: true,
      });
      const addcart = await Models.userCart.create({
        user_id,
        cart_id,
        hash_id,
        quantity: 1,
      });
      const cartItem = await getCartData(user_id);
      return res.status(200).send({
        status: true,
        message: "The item has been successfully added to your cart.",
        data: cartItem,
      });
    } else {
      return res
        .status(422)
        .send({ status: true, message: "Add to cart failed.", data: [] });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: false,
      message: "Something went wrong.",
      error: err.message,
    });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const user_id = req.userId;
    const { cart_id } = req.params;
    const hasData = await Models.userCart.findOne({
      where: { cart_id, user_id },
    });
    if (hasData) {
      await hasData.destroy();
      const cartItem = await getCartData(user_id);
      return res
        .status(200)
        .send({ status: true, message: "Success.", data: cartItem });
    } else {
      return res
        .status(422)
        .send({ status: false, message: "Cart item not found." });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: false,
      message: "Something went to wrong.",
      error: err.message,
    });
  }
};

exports.getCart = async (req, res) => {
  try {
    const user_id = req.userId;
    const cartItem = await getCartData(user_id);
    cartItem.map((cartItem) => {
      cartItem.cartItems.dataValues.hash_id = cartItem.hash_id;
      cartItem.cartItems.dataValues.anchortext = "";
      cartItem.cartItems.dataValues.linktarget = "";
      cartItem.cartItems.dataValues.publication_date = "";
      cartItem.cartItems.dataValues.note = "";
      cartItem.cartItems.dataValues.project_id = "";
      cartItem.cartItems.dataValues.filename = "";
      cartItem.cartItems.dataValues.originalname = "";
      cartItem.cartItems.dataValues.textCreation = "";
      cartItem.cartItems.dataValues.wordCount = "";
      cartItem.cartItems.dataValues.approveText = 0;
      cartItem.cartItems.dataValues.textCreationPrice = 0;
      cartItem.cartItems.dataValues.approveTextPrice = 0;
      cartItem.cartItems.dataValues.chooseByBacklink = false;
      cartItem.cartItems.dataValues.total_price = cartItem.cartItems.price;
      cartItem.cartItems.dataValues.cart_id = cartItem.cart_id;
      cartItem.cartItems.dataValues.id = cartItem.id;
    });
    res.status(200).send({
      status: true,
      message: "Cart items get successfully.",
      data: cartItem,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: true,
      message: "Something went to wrong.",
      error: err.message,
    });
  }
};

exports.viewSingleOrderPublisher = async (req, res) => {
  try {
    const userId = req.userId;
    const { orderId } = req.params;
    const getOrderData = await getViewOrderData(userId, orderId, "publisher");
    res.status(200).send({
      staus: true,
      message: "Order fetched successfully",
      data: getOrderData,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: false,
      message: "Something went to wrong please try again.",
      error: err.message,
    });
  }
};

exports.viewSingleOrderUser = async (req, res) => {
  try {
    const userId = req.userId;
    const { orderId } = req.params;
    const getOrderData = await getViewOrderData(userId, orderId, "customer");
    res.status(200).send({
      staus: true,
      message: "Order fetched successfully",
      data: getOrderData,
    });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: "Something went to wrong please try again.",
      error: err.message,
    });
  }
};

exports.viewSingleOrderAdmin = async (req, res) => {
  try {
    const userId = req.userId;
    const { orderId } = req.params;
    const getOrderData = await getViewOrderData(userId, orderId, "admin");
    res.status(200).send({
      staus: true,
      message: "Order fetched successfully",
      data: getOrderData,
    });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: "Something went to wrong please try again.",
      error: err.message,
    });
  }
};

async function getViewOrderData(userId, orderId, type) {
  let wheres;
  if (type === "customer") {
    wheres = { customer_id: userId, id: orderId };
  } else if (type === "publisher") {
    wheres = { publisher_id: userId, id: orderId };
  } else {
    wheres = { id: orderId };
  }
  const baseQuery = {
    include: [
      {
        model: Models.publisherDomain,
        as: "domain",
        attributes: { exclude: ["updated_at", "created_at", "id"] },
      },
      {
        model: Models.Domains,
        as: "project",
        attributes: { exclude: ["updated_at", "created_at", "id"] },
      },
      {
        model: Models.orderFiles,
        as: "orderFile",
      },
      {
        model: Models.Users,
        as: "customer",
        attributes: ["firstName", "lastName", "email"],
      },
    ],
    where: wheres,
  };
  return await Models.newOrder.findOne(baseQuery);
}

async function getCartData(user_id) {
  try {
    const results = await Models.userCart.findAll({
      include: [
        {
          model: Models.publisherDomain,
          as: "cartItems",
          attributes: ["id", "domain_name", "tld", "price", "hash_id"],
        },
      ],
      attributes: ["id", "cart_id", "hash_id"],
      where: { user_id: user_id },
    });
    return results;
  } catch (err) {
    console.log(err);
  }
}

async function createFilterQuery(body, type, baseQuery) {
  try {
    const { status, project, date, search } = body;
    const filters = {
      status: status,
      project_id: project ? project : "",
      date: date,
      search: search,
    };

    if (filters["status"] && filters["status"].length > 0) {
      baseQuery.where["status"] = filters["status"];
    }

    if (filters["date"] && filters["date"].min) {
      let maxDateTime;

      if (filters["date"].max) {
        maxDateTime = `${filters["date"].max} 23:59:59`;
      } else {
        const today = new Date();
        maxDateTime = today.toISOString().split("T")[0] + " 23:59:59";
      }

      const minDateTime = `${filters["date"].min} 00:00:00`;

      baseQuery.where["created_at"] = {
        [Op.between]: [minDateTime, maxDateTime],
      };
    }
    if (type === "user") {
      if (
        filters["project_id"] !== undefined &&
        filters["project_id"] !== null &&
        filters["project_id"] !== "" &&
        Object.keys(filters["project_id"]).length > 0
      ) {
        baseQuery.include.push({
          model: Models.Domains,
          as: "project",
          where: {
            hash_id: {
              [Op.in]: filters["project_id"],
            },
          },
        });
      }
    }

    if (filters["search"] !== undefined && filters["search"] !== "") {
      const searchConditions = {
        [Op.or]: [],
      };
      if (type === "user" || type === "admin") {
        const allColumns = ["anchortext", "linktarget", "note"];

        const orConditions = allColumns.map((column) => ({
          [column]: {
            [Op.like]: `%${filters["search"]}%`,
          },
        }));
        searchConditions[Op.or] = [...searchConditions[Op.or], ...orConditions];
      }

      if (Models.publisherDomain) {
        searchConditions[Op.or].push({
          "$domain.domain_name$": {
            [Op.like]: `%${filters["search"]}%`,
          },
        });
      }

      if (Models.Users && type === "admin") {
        searchConditions[Op.or].push({
          [Op.or]: [
            {
              "$customer.firstName$": {
                [Op.like]: `%${filters["search"]}%`,
              },
            },
            {
              "$customer.lastName$": {
                [Op.like]: `%${filters["search"]}%`,
              },
            },
          ],
        });
        searchConditions[Op.or].push({
          [Op.or]: [
            {
              "$publisher.firstName$": {
                [Op.like]: `%${filters["search"]}%`,
              },
            },
            {
              "$publisher.lastName$": {
                [Op.like]: `%${filters["search"]}%`,
              },
            },
          ],
        });
      }

      // Add the dynamic search conditions to the query
      baseQuery.where[Op.or] = [searchConditions, baseQuery.where[Op.or] || {}];
    }

    return baseQuery;
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function getPublisherDomainData(domain_id = null, hash_id = null) {
  try {
    let publisherData;
    if (domain_id) {
      publisherData = await Models.publisherDomain.findOne({
        where: { id: domain_id },
      });
    } else if (hash_id) {
      publisherData = await Models.publisherDomain.findOne({
        where: { hash_id: hash_id },
      });
    }
    return publisherData;
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function getBacklinksData(domain_id) {
  try {
    let backlinkPrice;
    if (domain_id) {
      backlinkPrice = await Models.publisherDomainData.findOne({
        where: { domain_id: domain_id },
      });
      return backlinkPrice;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
}

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
    console.log(err);
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
/* this function to delete temp file 10 min older all file in temp_file folder and database temp_file table */
function deleteFilesOlder() {
  const expirationTime = 15 * 60 * 1000; // 15 min in milliseconds
  const now = Date.now();
  const tempFileDirectory = "./assets/temp_file";
  fs.readdir(tempFileDirectory, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(tempFileDirectory, file);
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error("Error getting file stats:", err);
          return;
        }

        const fileAge = now - stats.mtime.getTime();
        if (fileAge >= expirationTime) {
          fs.unlink(filePath, (err) => {
            if (err) {
              console.error("Error deleting file:", err);
            } else {
              console.log(`Deleted file: ${file}`);
            }
          });
        }
      });
    });
  });
  // 	const tenMinutesAgo = moment().subtract(1, 'minutes').format('YYYY-MM-DD HH:mm:ss');
  // 	const deletedRows = await Models.tempFile.destroy({
  // where: {
  // 	created_at: {
  // 	  [Sequelize.Op.lt]: tenMinutesAgo,
  // 	},
  // },
  //   });
}

const moveFile = (sourcePath, destPath) => {
  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(sourcePath);
    const writeStream = fs.createWriteStream(destPath);

    readStream.on("error", (err) => {
      reject(err);
    });

    writeStream.on("error", (err) => {
      reject(err);
    });

    writeStream.on("finish", () => {
      fs.unlink(sourcePath, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });

    readStream.pipe(writeStream);
  });
};

exports.linkBundlePlaceOrder = async (req, res) => {
  try {
    const user_id = req.userId;
    const { planId } = req.params;
    const checkPlan = await Models.SubscriptionPlans.findOne({
      where: { id: planId },
    });
    const userBalance = await checkUserBalance(user_id, [], [checkPlan.price]);
    if (userBalance) {
      const { anchortext, linktarget, project_id, publication_date } = req.body;
      const textCreation = "Editorial";
      const wordCount = 0;
      const approveText = 0;
      const textCreationPrice = 0;
      const approveTextPrice = 0;
      const chooseByBacklink = 0;
      const isBundle = planId;
      const publisher_id = 0;
      const customer_id = user_id;
      const domain_id = 0;
      const backlink_id = 0;
      const total_price = checkPlan.price;
      const status = "Pending";

      const placeOrder = await Models.newOrder.create({
        anchortext,
        linktarget,
        project_id,
        publication_date,
        textCreation,
        wordCount,
        approveText,
        textCreationPrice,
        approveTextPrice,
        chooseByBacklink,
        isBundle,
        publisher_id,
        customer_id,
        domain_id,
        backlink_id,
        total_price,
        status,
      });

      await deductFromWallet(customer_id, total_price, "deduct");

      const transaction_type = "Place order";
      const description = "Buy FairLinked Link Bundle Plan " + checkPlan.name;
      const now = new Date();
      const payment_created = now.toISOString();
      const transaction_id = "order_" + placeOrder.dataValues.id;
      const statusN = "paid";
      const tranInfo = {
        user_id: customer_id,
        amount: total_price,
        transaction_type,
        description,
        payment_created,
        transaction_id,
        status: statusN,
        paymentData: placeOrder,
        order_id: placeOrder.dataValues.id,
      };
      await Models.Transactions.create(tranInfo);

      return res
        .status(200)
        .send({ status: true, message: "Your Order placed successfully" });
    }
    return res.status(400).send({
      status: false,
      message: "Insufficient balance",
      error: "Insufficient balance",
    });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: "Your order can not placed, an error occured",
      error: err.message,
    });
  }
};
