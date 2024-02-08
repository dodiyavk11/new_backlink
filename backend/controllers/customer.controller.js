const Models = require("../models");
const Sequelize = require("sequelize");
const { Op } = require("sequelize");
const puppeteer = require("puppeteer");
const path = require("path");
const generateUniqueId = require("generate-unique-id");
const { Worker, isMainThread } = require("worker_threads");

exports.dashboard = async (req, res) => {
  try {
    const userId = req.userId;

    const overview = await Models.Users.findOne({
      where: { id: userId },
      include: [
        {
          model: Models.Domains,
          as: "domains",
          limit: 3,
          order: [["id", "DESC"]],
        },
        {
          model: Models.UserWallet,
          as: "userAccountBalnace",
          attributes: ["balance"],
        },
        {
          model: Models.UserSubscription,
          as: "subscriptions",
          attributes: [
            "plan_id",
            "start_date",
            "end_date",
            "cancel_date",
            "info",
            "credits",
            "status",
          ],
        },
        {
          model: Models.newOrder,
          as: "orders",
          limit: 5,
          order: [["created_at", "DESC"]],
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
        },
      ],
      attributes: { exclude: ["password"] },
    });

    const customizeProjectData = async (overview) => {
      const customOverview = {
        ...overview.get(),
      };
      if (customOverview.domains && customOverview.domains.length > 0) {
        const customizedDomains = [];
        for (const domain of customOverview.domains) {
          const customizedDomain = {
            ...domain.get(),
          };

          if (domain.domain_name) {
            const domainParts = domain.domain_name.split(".");
            customizedDomain.tld = domainParts[domainParts.length - 1];
            customizedDomain.image_url =
              "/assets/domain_img/" + domain.hash_id + ".png";
            const orderCount = await Models.newOrder.count({
              where: {
                domain_id: domain.id,
              },
            });
            customizedDomain.order_count = orderCount;
          } else {
            customizedDomain.tld = "";
          }
          customizedDomains.push(customizedDomain);
        }
        customOverview.domains = customizedDomains;
      }
      return customOverview;
    };
    const baseQuery = {
      include: [
        {
          model: Models.domain_category,
          as: "category",
          attributes: ["id", "name"],
        },
        {
          model: Models.publisherDomainData,
          as: "contentData",
        },
      ],
      where: {},
    };
    const customizedOverview = await customizeProjectData(overview);
    const contentData = await Models.publisherDomain.findAll({
      ...baseQuery,
      order: Sequelize.literal("RAND()"),
      limit: 5,
    });
    customizedOverview.contentData = contentData;
    res
      .status(200)
      .send({
        status: true,
        message: "User overview",
        data: customizedOverview,
      });
  } catch (err) {
    res
      .status(500)
      .send({
        status: false,
        message: "Something went to wrong",
        data: [],
        error: err.message,
      });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const userId = req.userId;
    const baseQuery = {
      include: [
        {
          model: Models.domain_category,
          as: "category",
        },
      ],
    };

    const projects = await Models.Domains.findAll({
      where: { user_id: userId },
      ...baseQuery,
      attributes: {
        include: [
          [
            Sequelize.literal(`(
			          SELECT COUNT(*)
			          FROM new_orders
			          WHERE new_orders.project_id = Domains.hash_id
			        )`),
            "order_count",
          ],
        ],
      },
      order: [["id", "DESC"]],
    });
    // Extract domain extensions and add tld in the data
    const customizeProjectData = projects.map((domain) => {
      const customDomain = { ...domain.get() };
      if (domain.domain_name) {
        const domainParts = domain.domain_name.split(".");
        customDomain.tld = domainParts[domainParts.length - 1];
        customDomain.image_url =
          "/assets/domain_img/" + domain.hash_id + ".png";
      } else {
        customDomain.tld = "";
      }
      return customDomain;
    });
    res
      .status(200)
      .send({
        status: true,
        message: "Projects fetched successfully",
        data: customizeProjectData,
      });
  } catch (err) {
    res
      .status(500)
      .send({
        status: false,
        message: "Something went to wrong",
        data: [],
        message: err.message,
      });
  }
};

exports.setting = async (req, res) => {
  try {
    const userId = req.userId;
    const { q } = req.query;
    const baseQuery = {
      include: [
        {
          model: Models.Users,
          as: "user",
          attributes: ["firstName", "lastName", "email", "profile", "phone"],
        },
      ],
    };

    const setting = await Models.Setting.findOne({
      where: { user_id: userId },
      ...baseQuery,
    });

    // const settingsData = setting.map((val) => {
    //   const settingData = val.dataValues;
    //   return settingData;
    // });

    res
      .status(200)
      .send({
        status: true,
        message: "Setting fetched successfully",
        data: setting,
      });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send({
        status: false,
        message: "Unable to fetch Setting, Please try again later.",
        data: [],
        error: err.message,
      });
  }
};

exports.updateNotification = async (req, res) => {
  try {
    const user_id = req.userId;
    const {
      email_message_received,
      email_order_accepted,
      email_order_completed,
      email_order_created,
      email_order_declined,
      email_order_missing_details,
      email_payment_failed,
      email_payment_reminder,
      email_payment_succeeded,
      email_recommendations_available,
    } = req.body;

    const editData = {
      email_message_received,
      email_order_accepted,
      email_order_completed,
      email_order_created,
      email_order_declined,
      email_order_missing_details,
      email_payment_failed,
      email_payment_reminder,
      email_payment_succeeded,
      email_recommendations_available,
    };

    const [updateCount] = await Models.Setting.update(editData, {
      where: { user_id },
    });
    if (updateCount === 1) {
      res
        .status(200)
        .send({
          status: true,
          message: "Setting updated successfully.",
          data: updateCount,
        });
    } else {
      res.status(500).send({
        status: false,
        message: "Setting not found or something went wrong during update.",
      });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send({
        status: false,
        message: "Something went wrong.",
        data: [],
        error: err.message,
      });
  }
};

exports.addCustomerDomain = async (req, res) => {
  try {
    const { domain_name } = req.body;
    const { category_id } = req.body;
    const { budget } = req.body;
    const user_id = req.userId;

    const domainPattern =
      /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+(\.[a-zA-Z]{2,}){1,2})(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?$/;
    function extractMainDomain(url) {
      let mainDomain = url.replace(/^https?:\/\//, "");
      mainDomain = mainDomain.split("/")[0];
      return mainDomain;
    }
    if (domainPattern.test(domain_name)) {
      let mainDomain = extractMainDomain(domain_name);
      mainDomain = mainDomain.trim().replace(/\/+$/, "");
      const existingDomain = await Models.Domains.findOne({
        where: {
          domain_name: {
            [Sequelize.Op.substring]: mainDomain.replace("www", ""),
          },
          user_id: req.userId,
        },
      });
      if (existingDomain) {
        return res.status(400).send({
          status: false,
          message: "A domain with a similar name already exists.",
        });
      }
      let hash_id = generateUniqueId({
        length: 8,
        useLetters: true,
      });

      hash_id.toUpperCase();
      const domainParts = domain_name.split(".");
      const tld = domainParts[domainParts.length - 1];
      const addData = {
        domain_name: mainDomain,
        tld,
        category_id,
        budget,
        user_id,
        hash_id,
      };
      const addDomain = await Models.Domains.create(addData);

      res
        .status(200)
        .send({
          status: true,
          message: "Domain added successfully",
          data: addDomain,
        });

      if (isMainThread) {
        const domainId = addDomain.id;
        const type = "user";
        const worker = new Worker(
          "./controllers/domainBackgroundProcesses.js",
          { workerData: { url: mainDomain, hash_id, domainId, type } }
        );

        worker.on("message", (message) => {
          console.log(message);
        });

        worker.on("error", (error) => {
          console.error(`Worker error: ${error}`);
        });

        worker.on("exit", (code) => {
          if (code !== 0) {
            console.error(`Worker stopped with exit code ${code}`);
          }
        });
      }
    } else {
      res.status(400).send({
        status: false,
        message: "Invalid domain name.",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({
      status: false,
      message: "Something went wrong, Please try again.",
      data: [],
      error: err.message,
    });
  }
};

exports.getUserDomain = async (req, res) => {
  try {
    const userId = req.userId;
    const { hash_id } = req.params;
    const baseQuery = {
      include: [
        {
          model: Models.domain_category,
          as: "category",
          attributes: ["id", "name"],
        },
        {
          model: Models.customerDomainData,
          as: "contentData",
        },
      ],
    };
    const domainData = await Models.Domains.findOne({
      where: { user_id: userId, hash_id: hash_id },
      ...baseQuery,
    });
    const getOrders = await Models.newOrder.findAll({
      where: { project_id: hash_id, customer_id: userId },
      limit: 3,
      include: [
        {
          model: Models.publisherDomain,
          as: "domain",
          attributes: ["domain_name"],
        },
      ],
    });
    domainData.dataValues.orderData = getOrders;
    res
      .status(200)
      .send({
        status: true,
        message: "Domain fetch successfully.",
        data: domainData,
      });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({
        status: false,
        message: "Something went to wrong.",
        error: err.message,
      });
  }
};

exports.addMessageToOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const { order_id } = req.params;
    const { message } = req.body;
    const image = req.files;
    const { files } = req.body;
    if (!message && image.length === 0)
      return res
        .status(404)
        .send({
          status: false,
          message: "Please send a message or file",
          data: [],
        });
    let chatData = { sender_id: userId, order_id };
    if (message || message !== "") {
      chatData.message = message;
    }

    if (files || files !== "") {
      if (image) {
        const array = await Promise.all(
          image.map(async (val) => {
            return val.filename;
          })
        );
        let string = array.join(",");
        chatData.files = string;
      }
    }

    const data = await Models.Message.create(chatData);
    res
      .status(200)
      .send({
        status: true,
        message: "Order message saved success",
        data: data,
      });
  } catch (err) {
    res
      .status(500)
      .send({
        status: false,
        message: "Something went to wrong.",
        data: [],
        error: err.message,
      });
  }
};

exports.transactionHistory = async (req, res) => {
  try {
    const userId = req.userId;

    const userTransaction = await Models.Transactions.findAll({
      where: { user_id: userId },
      // include: [
      // 	{
      // 		model: Models.Transactions,
      // 	    as: 'transaction',
      // 	}
      // ],
      // attributes: { exclude: ['password'] },
      order: [["id", "DESC"]],
      // order: [[{ model: Models.Transactions, as: 'transaction'}, 'id', 'DESC' ]]
    });
    res
      .status(200)
      .send({
        status: true,
        message: "User Transaction fecth successfully.",
        data: userTransaction,
      });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({
        status: false,
        message: "Something went to wrong.",
        data: [],
        error: err.message,
      });
  }
};

exports.publisherTransaction = async (req, res) => {
  try {
    const userId = req.userId;
    const orderData = await Models.newOrder.findAll({
      where: { publisher_id: userId },
    });
    const orderIds = orderData.map((order) => order.id);
    const publisherTransaction = await Models.Transactions.findAll({
      where: {
        order_id: {
          [Op.in]: orderIds,
        },
      },
      order: [["id", "DESC"]],
    });
    res
      .status(200)
      .send({
        status: true,
        message: "Publisher Transaction fecth successfully.",
        data: publisherTransaction,
      });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({
        status: false,
        message: "Something went to wrong.",
        data: [],
        error: err.message,
      });
  }
};

exports.adminTransaction = async (req, res) => {
  try {
    const adminTransaction = await Models.Transactions.findAll({
      include: [
        {
          model: Models.Users,
          as: "user",
          attributes: ["firstName", "lastName", "email"],
        },
      ],
      attributes: { exclude: ["paymentData"] },
    });
    res.status(200).send({ status: true, data: adminTransaction });
  } catch (err) {
    res
      .status(500)
      .send({
        status: false,
        message: "Something went to wrong.",
        data: [],
        error: err.message,
      });
  }
};

exports.updateMonthlyBudget = async (req, res) => {
  try {
    const userId = req.userId;
    const { budget, id, hash_id } = req.body;
    const updateData = await Models.Domains.update(
      { budget },
      { where: { id } }
    );
    res
      .status(200)
      .send({
        status: true,
        message: "Monthly budget update successfully.",
        data: updateData,
      });
  } catch (err) {
    res
      .status(500)
      .send({
        status: false,
        message: "Monthly amount can not update, an error occured.",
        error: err.message,
      });
  }
};

exports.userAddStaticAmount = async (req, res) => {
  try {
    const userId = req.userId;
    const { amount } = req.body;
    if (amount) {
      const tranInfo = {
        user_id: userId,
        amount,
        transaction_type: "Manual Added",
        description: "For Testing",
        status: "paid",
      };
      await Models.Transactions.create(tranInfo);
      const walletInfo = await Models.UserWallet.findOne({
        where: { user_id: userId },
      });
      let walletInfoData;
      if (walletInfo) {
        const balance = parseFloat(amount) + parseFloat(walletInfo.balance);
        const updateOnfo = { balance };
        walletInfoData = await Models.UserWallet.update(updateOnfo, {
          where: { id: walletInfo.dataValues.id },
        });
      } else {
        walletInfoData = await Models.UserWallet.create({
          user_id: userId,
          balance: amount,
        });
      }
      const newBalance = await Models.UserWallet.findOne({
        where: { user_id: userId },
        attributes: ["balance"],
      });
      return res
        .status(200)
        .send({
          status: true,
          message: "Amount added in your wallet successfully.",
          data: newBalance,
        });
    }
    return res
      .status(400)
      .send({ status: false, message: "Amount can not be zero", data: [] });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({
        status: false,
        message: "Amount can not added, an error occured.",
        error: err.message,
      });
  }
};

exports.updateArchiveProject = async (req, res) => {
  try {
    const user_id = req.userId;
    const { hash_id, status } = req.params;

    const updateData = await Models.Domains.update(
      { isArchieved: status },
      {
        where: { hash_id, user_id },
      }
    );
    res
      .status(200)
      .send({
        status: true,
        message: "Update successfully.",
        data: updateData,
      });
  } catch (err) {
    res
      .status(500)
      .send({
        status: false,
        message: "Project Archive can not update, an error occured.",
        error: err.message,
      });
  }
};

exports.getUserWalletBalance = async (req, res) => {
  try {
    const user_id = req.userId;
    const getWallet = await Models.UserWallet.findOne({ where: { user_id } });
    const data = getWallet ?? {
      id: 0,
      user_id: user_id,
      balance: "0.00",
      created_at: "",
    };

    res.status(200).send({
      status: true,
      message: "Wallet amount fetched successfully",
      data,
    });
    // res.status(200).send({ status: true, message: "Wallet amount fetched successfully", data: getWallet });
  } catch (err) {
    res
      .status(500)
      .send({
        status: false,
        message: "Something went to wrong",
        error: err.message,
      });
  }
};

exports.linkBundlePlaceOrderCheckBalance = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.userId;
    const checkPlan = await Models.SubscriptionPlans.findOne({
      where: { id },
      attributes: { exclude: ["updated_at", "created_at"] },
    });
    const getWallet = await Models.UserWallet.findOne({
      where: { user_id },
      attributes: { exclude: ["updated_at", "created_at", "id", "user_id"] },
    });
    if (checkPlan.price > getWallet.balance) {
      return res
        .status(400)
        .send({ status: false, message: "Insufficient balance" });
    }
    return res
      .status(200)
      .send({
        status: true,
        message: "Process...",
        data: { checkPlan, getWallet },
      });
  } catch (err) {
    res
      .status(500)
      .send({
        status: false,
        message: "Something went to wrong",
        error: err.message,
      });
  }
};
