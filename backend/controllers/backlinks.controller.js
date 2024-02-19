const Models = require("../models");
const Sequelize = require("sequelize");
const { Op } = require("sequelize");
const generateUniqueId = require("generate-unique-id");
const { sendVerifyMail, emailTemplate } = require("../utils/emailsUtils");
const { Worker, isMainThread } = require("worker_threads");
const nodemailer = require("nodemailer");
const ExcelJS = require("exceljs");
const fs = require("fs");

exports.getPublisherDomainList = async (req, res) => {
  try {
    const user_id = req.userId;
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
          // attributes: { exclude: ['updated_at'] }
        },
      ],
    };
    const publisherDomainList = await Models.publisherDomain.findAll({
      where: { user_id: user_id },
      ...baseQuery,
      order: [["id", "DESC"]],
    });
    res.status(200).send({
      status: true,
      message: "List fetch successfully.",
      data: publisherDomainList,
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

exports.getPublisherDomain = async (req, res) => {
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
          model: Models.publisherDomainData,
          as: "contentData",
        },
        {
          model: Models.newOrder,
          as: "orderData",
          limit: 3,
        },
      ],
    };
    const domainData = await Models.publisherDomain.findOne({
      where: { user_id: userId, hash_id: hash_id },
      ...baseQuery,
    });
    res.status(200).send({
      status: true,
      message: "Domain fetch succesfully.",
      data: domainData,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: false,
      message: "Something wnet to wrong.",
      error: err.message,
    });
  }
};

exports.addPublisherDomain = async (req, res) => {
  try {
    const {
      domain_name,
      category_id,
      price,
      anchorText,
      deliveryTime,
      attribute,
      sensitiveTopic,
      sensitiveTopicCharge,
      minWordCount,
      textByCustomer,
      textInclude,
      language,
    } = req.body;
    const userId = req.userId;
    const domainPattern =
      /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+(\.[a-zA-Z]{2,}){1,2})(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?$/;

    if (domainPattern.test(domain_name)) {
      let mainDomain = extractMainDomain(domain_name);
      mainDomain = mainDomain.trim().replace(/\/+$/, "");
      const existingDomain = await Models.publisherDomain.findOne({
        where: {
          domain_name: {
            [Sequelize.Op.substring]: mainDomain.replace("www", ""),
          },
          user_id: userId,
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

      const domainParts = domain_name.split(".");
      const tld = domainParts[domainParts.length - 1];
      const addData = {
        domain_name: mainDomain,
        tld,
        category_id,
        price,
        user_id: userId,
        hash_id,
        anchorText,
        deliveryTime,
        attribute,
        sensitiveTopic,
        sensitiveTopicCharge,
        minWordCount,
        textByCustomer,
        textInclude,
        language,
        status: 0,
      };
      const addDomain = await Models.publisherDomain.create(addData);

      /* send publisher notification email to successed added domain */

      const userInfo = await Models.Users.findOne({ where: { id: userId } });
      let categoryName;
      if (category_id) {
        const category = await Models.domain_category.findOne({
          where: { id: category_id },
        });
        categoryName = category.dataValues.name;
      }

      const mailText = await Models.email_format.findOne({
        where: { email_type: "new_domain_added" },
      });

      let text = mailText.email_content;
      let subject = mailText.header;
      let username =
        userInfo.dataValues.firstName + " " + userInfo.dataValues.lastName;
      text = text.replace("{username}", username);
      text = text.replace("{domain_name}", domain_name);
      text = text.replace("{price}", price);
      text = text.replace("{category}", categoryName);
      const email = await emailTemplate(text);
      sendVerifyMail(userInfo.dataValues.email, subject, "", email);

      res.status(200).send({
        status: true,
        message: "Domain added successfully",
        data: addDomain,
      });

      if (isMainThread) {
        const domainId = addDomain.id;
        const type = "publisher";
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
    console.log(err);
    res.status(500).send({
      status: false,
      message: "Domain add failed.",
      data: [],
      error: err.message,
    });
  }
};

exports.editPublisherDomain = async (req, res) => {
  try {
    const {
      category_id,
      price,
      anchorText,
      deliveryTime,
      attribute,
      sensitiveTopic,
      sensitiveTopicCharge,
      minWordCount,
      textByCustomer,
      textInclude,
      language,
    } = req.body;
    const user_id = req.userId;
    const { domainId } = req.params;
    // const domainPattern = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+(\.[a-zA-Z]{2,}){1,2})(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?$/;
    // if(domainPattern.test(domain_name))
    // {
    // 	let mainDomain = extractMainDomain(domain_name);
    // 	mainDomain = mainDomain.trim().replace(/\/+$/,'');
    // 	const existingDomain = await Models.publisherDomain.findOne({
    // 		where: {
    // 			domain_name: {
    // 				[Sequelize.Op.substring] : mainDomain.replace("wwww",""),
    // 			},
    // 			user_id:user_id,
    // 			id: {
    // 		      [Op.not]: domainId,
    // 		    },
    // 		}
    // 	})
    // 	if(existingDomain)
    // 	{
    // 		return res.status(400).send({ status: false, message: "A Domain with a similar name already exists."})
    // 	}
    // const domainParts = domain_name.split(".");
    // const tld = domainParts[domainParts.length - 1];
    const updateData = {
      category_id,
      price,
      anchorText,
      deliveryTime,
      attribute,
      sensitiveTopic,
      sensitiveTopicCharge,
      minWordCount,
      textByCustomer,
      textInclude,
      language,
      status: 0,
    };
    const updateDomain = await Models.publisherDomain.update(updateData, {
      where: { id: domainId, user_id: user_id },
    });
    res.status(200).send({
      status: true,
      message: "Domain updated successfully.",
      data: updateDomain,
    });
    // }
    // else
    // {
    // 	res.status(400).send({ status: false, message: "Domain name Invalid." })
    // }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: false,
      message: "Domain update failed.",
      error: err.message,
    });
  }
};

exports.deletePublisherDomain = async (req, res) => {
  try {
    const id = req.params;
    const deleteDomain = await Models.publisherDomain.destroy({ where: id });
    res.status(200).send({
      status: true,
      message: "Domain deleted successfully.",
      data: deleteDomain,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: false,
      message: "Domain delete failed.",
      error: err.message,
    });
  }
};

exports.getConetentLinks = async (req, res) => {
  try {
    const { category_id, tld, price, language, domain_name, favoriteFilter } =
      req.body;
    const userId = req.userId;
    const filters = {
      category_id: category_id,
      tld: tld,
      price: price,
      // 'contentData.language': language,
      language: language,
      domain_name: domain_name,
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
        {
          model: Models.DomainRequest,
          as: "domainRequest",
          where: {
            user_id: userId,
          },
          required: false,
        },
      ],
      where: { status: 1 },
    };

    if (filters["category_id"] && filters["category_id"].length > 0) {
      baseQuery.where["category_id"] = filters["category_id"];
    }

    if (filters["tld"] && filters["tld"].length > 0) {
      baseQuery.where["tld"] = filters["tld"];
    }

    if (filters["price"] && filters["price"].min && filters["price"].max) {
      baseQuery.where["price"] = {
        [Op.gte]: filters["price"].min,
        [Op.lte]: filters["price"].max,
      };
    }

    if (
      filters["contentData.language"] &&
      filters["contentData.language"].length > 0
    ) {
      baseQuery.where["$contentData.language$"] =
        filters["contentData.language"];
    }
    if (filters["domain_name"] !== undefined && filters["domain_name"] !== "") {
      baseQuery.where["domain_name"] = {
        [Op.like]: `%${filters["domain_name"]}%`,
      };
    }
    if (favoriteFilter) {
      const favoriteProducts = await Models.favoriteProducts.findAll({
        where: {
          user_id: userId,
        },
      });
      const favoriteProductIds = favoriteProducts.map(
        (favoriteProduct) => favoriteProduct.product_id
      );
      baseQuery.where["id"] = favoriteProductIds;
    }

    const contentData = await Models.publisherDomain.findAll({
      ...baseQuery,
      order: [["id", "DESC"]],
    });

    const favoriteProducts = await Models.favoriteProducts.findAll({
      where: {
        user_id: userId,
        product_id: contentData.map((data) => data.id),
      },
    });
    contentData.map((data, index) => {
      if (
        (data.domainRequest.length > 0 && data.domainRequest[0].status === 0) ||
        data.domainRequest.length === 0
      ) {        
        const lastDotIndex = data.domain_name.lastIndexOf(".");
        if (lastDotIndex !== -1) {
          const subdomain = data.domain_name.substring(0, lastDotIndex);
          contentData[index].domain_name = `****${data.domain_name.substring(
            lastDotIndex
          )}`;
        }
        contentData[index].category.name = "***";
      }
    });
    res.status(200).send({
      status: true,
      message: "Content links get successfully.",
      data: { contentData, favoriteProducts },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: false,
      message: "Something went to wrong, Please try again.",
      data: [],
    });
  }
};

exports.getDailyDealsConetentLinks = async (req, res) => {
  try {
    const userId = req.userId;
    const projectCategory = await Models.Domains.findAll({
      attributes: ["category_id"],
      where: { user_id: userId },
    });
    const categoryIdsArray = projectCategory.map(
      (category) => category.category_id
    );
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
        {
          model: Models.DomainRequest,
          as: "domainRequest",
          where: {
            user_id: userId,
          },
          required: false,
        },
      ],
      where: { category_id: categoryIdsArray, status: 1 },
    };

    // const contentData = await Models.publisherDomain.findAll({ ...baseQuery,order: [['id', 'DESC']] });
    const contentData = await Models.publisherDomain.findAll({
      ...baseQuery,
      order: [["price", "ASC"]],
      limit: 5,
    });    

    const favoriteProducts = await Models.favoriteProducts.findAll({
      where: {
        user_id: userId,
        product_id: contentData.map((data) => data.id),
      },
    });

    contentData.map((data, index) => {
      if (
        (data.domainRequest.length > 0 && data.domainRequest[0].status === 0) ||
        data.domainRequest.length === 0
      ) {        
        const lastDotIndex = data.domain_name.lastIndexOf(".");
        if (lastDotIndex !== -1) {
          const subdomain = data.domain_name.substring(0, lastDotIndex);
          contentData[index].domain_name = `****${data.domain_name.substring(
            lastDotIndex
          )}`;
        }
        contentData[index].category.name = "***";
      }
    });

    res.status(200).send({
      status: true,
      message: "Content links get successfully.",
      data: { contentData, favoriteProducts },
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

exports.getSingleConetentLinks = async (req, res) => {
  try {
    const { hash_id } = req.params;
    const userId = req.userId;
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
        {
          model: Models.DomainRequest,
          as: "domainRequest",
          where: {
            user_id: userId,
          },
          required: false,
        },
      ],
      where: {},
    };
    const contentData = await Models.publisherDomain.findOne({
      ...baseQuery,
      where: { hash_id: hash_id },
      order: [["id", "DESC"]],
    });
    const favoriteProducts = await Models.favoriteProducts.findOne({
      where: {
        user_id: userId,
        product_id: contentData.id,
      },
    });

    if (
      (contentData.domainRequest.length > 0 && contentData.domainRequest.status === 0) ||
      contentData.domainRequest.length === 0
    ) {
      const lastDotIndex = contentData.domain_name.lastIndexOf(".");
      if (lastDotIndex !== -1) {
        const subdomain = contentData.domain_name.substring(0, lastDotIndex);
        contentData.domain_name = `****${contentData.domain_name.substring(
          lastDotIndex
        )}`;
      }
      contentData.category.name = "***";
    }

    contentData.dataValues.isFovarite = favoriteProducts ? 1 : 0;
    res.status(200).send({ status: true, data: contentData });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: false,
      message: "Something wnet to wrong",
      error: err.message,
    });
  }
};

function extractMainDomain(url) {
  let mainDomain = url.replace(/^https?:\/\//, "");
  mainDomain = mainDomain.split("/")[0];
  return mainDomain;
}

exports.publisherExcelFileDataAdd = async (req, res) => {
  try {
    const file = req.file;
    const userId = req.userId;
    const path = "./assets/excel_temp/" + file.filename;
    const workbook = new ExcelJS.Workbook();
    const domainPattern =
      /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+(\.[a-zA-Z]{2,}){1,2})(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?$/;
    const result = await new Promise((resolve, reject) => {
      workbook.xlsx.readFile(path).then(() => {
        const worksheet = workbook.getWorksheet(1);
        const columnIndex = 2;
        const data = [];

        worksheet.eachRow({ includeEmpty: false }, async (row, rowNumber) => {
          if (rowNumber > 1) {
            const domain_name = row.getCell(1).value;
            const price = row.getCell(2).value;
            const anchorText = row.getCell(3).value;
            const deliveryTime = row.getCell(4).value;
            const attribute = row.getCell(5).value;
            const sensitiveTopic = row.getCell(6).value;
            const sensitiveTopicCharge = row.getCell(7).value;
            const minWordCount = row.getCell(8).value;
            const textByCustomer = row.getCell(9).value;
            const textInclude = row.getCell(10).value;
            const language = row.getCell(11).value;

            if (domainPattern.test(domain_name)) {
              let mainDomain = extractMainDomain(domain_name);
              mainDomain = mainDomain.trim().replace(/\/+$/, "");
              const existingDomain = await Models.publisherDomain.findOne({
                where: {
                  domain_name: {
                    [Sequelize.Op.substring]: mainDomain.replace("www", ""),
                  },
                  user_id: userId,
                },
              });
              if (!existingDomain) {
                let hash_id = generateUniqueId({
                  length: 8,
                  useLetters: true,
                });

                const domainParts = domain_name.split(".");
                const tld = domainParts[domainParts.length - 1];
                const addData = {
                  domain_name: mainDomain,
                  tld,
                  category_id: 23,
                  price,
                  user_id: userId,
                  hash_id,
                  anchorText,
                  deliveryTime,
                  attribute,
                  sensitiveTopic,
                  sensitiveTopicCharge,
                  minWordCount,
                  textByCustomer,
                  textInclude,
                  language,
                  status: 0,
                };
                const addDomain = await Models.publisherDomain.create(addData);
                if (isMainThread) {
                  const domainId = addDomain.id;
                  const type = "publisher";
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
              }
            }

            data.push({
              domain_name,
              price,
              anchorText,
              deliveryTime,
              attribute,
              sensitiveTopic,
              sensitiveTopicCharge,
              minWordCount,
              textByCustomer,
              textInclude,
              language,
            });
          }
        });
        fs.unlinkSync(path);
        resolve(data);
      });
    });

    res.status(200).json({
      status: true,
      message:
        "File uploaded successfully, If there are any issues with the file data, it will be skipped from being stored in our portal. Otherwise, after some time, the data will be displayed here.",
      data: result,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: false,
      message: "Error occurred while reading the file.",
    });
  }
};

exports.addToFavorite = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.userId;
    const [favorite, created] = await Models.favoriteProducts.findOrCreate({
      where: { user_id, product_id: id },
      defaults: { user_id, product_id: id },
    });

    if (!created) {
      await Models.favoriteProducts.destroy({
        where: { user_id, product_id: id },
      });
    }
    const favoriteProducts = await Models.favoriteProducts.findAll({
      where: {
        user_id,
      },
    });
    res.status(200).send({
      status: true,
      message: "Content link added in favorite,",
      data: favoriteProducts,
    });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: "Contetn link can not added in Favorite, an error occurred.",
      error: err.message,
    });
  }
};

exports.adminViewPublisherDomain = async (req, res) => {
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
          model: Models.publisherDomainData,
          as: "contentData",
        },
        {
          model: Models.newOrder,
          as: "orderData",
          limit: 3,
          include: [
            {
              model: Models.Users,
              as: "customer",
              attributes: ["firstName", "lastName", "email"],
            },
          ],
        },
      ],
    };
    const domainData = await Models.publisherDomain.findOne({
      where: { hash_id: hash_id },
      ...baseQuery,
    });
    res.status(200).send({
      status: true,
      message: "Backlinks fetch succesfully.",
      data: domainData,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: false,
      message: "Something wnet to wrong.",
      error: err.message,
    });
  }
};

exports.updateBacklinkStatus = async (req, res) => {
  try {
    const { hash_id, status, id } = req.params;
    const updateStatus = await Models.publisherDomain.update(
      { status },
      { where: { id, hash_id } }
    );
    if (status === "1") {
      const getData = await Models.publisherDomain.findOne({
        where: { id, hash_id },
      });
      const getPublisherData = await Models.Users.findOne({
        where: { id: getData.user_id },
      });

      const mailText = await Models.email_format.findOne({
        where: { email_type: "backlink_actived" },
      });

      let text = mailText.email_content;
      let subject = mailText.header;
      let username =
        getPublisherData.firstName + " " + getPublisherData.lastName;
      text = text.replace("{user_name}", username);
      text = text.replace("{backlink_name}", getData.domain_name);
      const email = await emailTemplate(text);
      sendVerifyMail(getPublisherData.email, subject, "", email);
    }
    res.status(200).send({
      status: true,
      message: "Update successfully.",
      data: updateStatus,
    });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: "Status cannot update, an error occurred.",
      error: err.message,
    });
  }
};

exports.ConetentLinksList = async (req, res) => {
  try {
    const { category_id, tld, price, language, domain_name, favoriteFilter } =
      req.body;
    const userId = req.userId;
    const filters = {
      category_id: category_id,
      tld: tld,
      price: price,
      // 'contentData.language': language,
      language: language,
      domain_name: domain_name,
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
        {
          model: Models.Users,
          as: "publisher",
          attributes: ["id", "firstName", "lastName", "email"],
        },
      ],
      where: {},
    };

    if (filters["category_id"] && filters["category_id"].length > 0) {
      baseQuery.where["category_id"] = filters["category_id"];
    }

    if (filters["tld"] && filters["tld"].length > 0) {
      baseQuery.where["tld"] = filters["tld"];
    }

    if (filters["price"] && filters["price"].min && filters["price"].max) {
      baseQuery.where["price"] = {
        [Op.gte]: filters["price"].min,
        [Op.lte]: filters["price"].max,
      };
    }

    if (
      filters["contentData.language"] &&
      filters["contentData.language"].length > 0
    ) {
      baseQuery.where["$contentData.language$"] =
        filters["contentData.language"];
    }
    if (filters["domain_name"] !== undefined && filters["domain_name"] !== "") {
      baseQuery.where["domain_name"] = {
        [Op.like]: `%${filters["domain_name"]}%`,
      };
    }

    const contentData = await Models.publisherDomain.findAll({
      ...baseQuery,
      order: [["id", "DESC"]],
    });
    res.status(200).send({
      status: true,
      message: "Content links get successfully.",
      data: contentData,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: false,
      message: "Something went to wrong, Please try again.",
      data: [],
    });
  }
};
