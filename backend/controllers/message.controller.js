const Models = require("../models");
const Sequelize = require("sequelize");
const { unlinkMessageFiles } = require("../utils/deleteFile");
const { Op } = require("sequelize");

exports.addMessageToOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const { domain_id } = req.params;
    const { message, reciever_id } = req.body;
    const image = req.files;
    const { files } = req.body;

    const getUserInfo = await Models.Users.findOne({ where: { id: userId } });
    if (!message && image.length === 0)
      return res
        .status(404)
        .send({ status: false, message: "Please write a message", data: [] });
    let chatData = {
      sender_id: userId,
      receiver_id: reciever_id,
      domain_id,
      isRead: 0,
    };
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
    res.status(200).send({
      status: true,
      message: "Message Send success",
      data: data,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: false,
      message: "Something went to wrong.",
      data: [],
      error: err.message,
    });
  }
};

exports.getOrderMessageByOrderId = async (req, res) => {
  try {
    const { domain_id } = req.params;
    const user_id = req.userId;
    // const getMessages = await Models.Message.findAll({ where: { order_id } })

    const getMessages = await Models.Message.findAll({
      where: {
        domain_id,
        [Op.or]: [{ sender_id: user_id }, { receiver_id: user_id }],
      },
      include: [
        {
          model: Models.Users,
          as: "sender",
          attributes: ["firstName", "lastName", "id"],
        },
        {
          model: Models.Users,
          as: "receiver",
          attributes: ["firstName", "lastName", "id"],
        },
      ],
    });

    // const getInfo = await getMessages.map((val) => {
    //   delete val.dataValues.order_id;
    //   return val.dataValues.sender_id;
    // });

    // const getUserImg = await Promise.all(
    //   getInfo.map(async (val) => {
    //     const getUserInfo = await Models.Users.findOne({
    //       where: { id: val },
    //       paranoid: false,
    //     });
    //     return getUserInfo.dataValues.profile;
    //   })
    // );

    // const getUsername = await Promise.all(
    //   getInfo.map(async (val) => {
    //     const getUserInfo = await Models.Users.findOne({
    //       where: { id: val },
    //       paranoid: false,
    //     });
    //     return (
    //       getUserInfo.dataValues.firstName +
    //       " " +
    //       getUserInfo.dataValues.lastName
    //     );
    //   })
    // );

    // getUserImg.map((val, i) => (getMessages[i].dataValues.user_profile = val));
    // getUsername.map((val, i) => (getMessages[i].dataValues.user_name = val));
    res.status(200).send({
      status: true,
      message: "Order Message fecthed success",
      data: getMessages,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: false,
      message: "Something went to wrong.",
      data: [],
      error: err.message,
    });
  }
};
exports.getPublisherDomainMsg = async (req, res) => {
  try {
    const { domain_id, sender_id } = req.params;
    const user_id = req.userId;
    const getMessages = await Models.Message.findAll({
      where: {
        domain_id,
        [Op.or]: [{ receiver_id: sender_id }, { sender_id: sender_id }],
      },
      include: [
        {
          model: Models.Users,
          as: "sender",
          attributes: ["firstName", "lastName", "id"],
        },
        {
          model: Models.Users,
          as: "receiver",
          attributes: ["firstName", "lastName", "id"],
        },
      ],
    });
    res.status(200).send({
      status: true,
      message: "Order Message fecthed success",
      data: getMessages,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: false,
      message: "Something went to wrong.",
      data: [],
      error: err.message,
    });
  }
};

exports.deleteOrderMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const { order_id } = req.body;
    const messageData = await Models.Message.findOne({ where: { id } });
    if (messageData != null && messageData.dataValues.files) {
      const fileNames = messageData.dataValues.files.split(",");
      await Promise.all(
        fileNames.map(async (fileName) => {
          unlinkMessageFiles(fileName.trim());
        })
      );
    }
    const deleteMessageData = await Models.Message.destroy({
      where: { id, order_id, sender_id: userId },
    });
    res.status(200).send({
      status: true,
      message: "Message deleted success.",
      data: deleteMessageData,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: true,
      message: "Something went to wrong",
      data: [],
      error: err.message,
    });
  }
};

exports.publisherMessageMenu = async (req, res) => {
  try {
    const publisher_id = req.userId;
    const baseQuery = {
      attributes: [
        "order_id",
        [
          Sequelize.literal(`
			        (SELECT CONCAT(message, ',,', created_at, ',,', isRead) 
			         FROM messages 
			         WHERE id = (SELECT MAX(id) 
			                     FROM messages 
			                     WHERE order_id = \`order\`.id)
			        ) 
			      `),
          "message",
        ],
      ],
      include: [
        {
          model: Models.newOrder,
          as: "order",
          attributes: ["id"],
          where: { publisher_id },
          include: [
            {
              model: Models.publisherDomain,
              as: "domain",
              attributes: ["domain_name"],
            },
          ],
        },
      ],
      group: ["order_id"],
    };
    const messageData = await Models.Message.findAll(baseQuery);
    res.status(200).send({ status: true, data: messageData });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: "Something went to wrong.",
      error: err.message,
    });
  }
};

exports.publisherUnreadMessageCount = async (req, res) => {
  try {
    const publisher_id = req.userId;
    const unreadMessageCount = await Models.Message.count({
      where: { receiver_id: publisher_id, isRead: 0 },
    });
    res.status(200).send({ status: true, data: unreadMessageCount });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: "Something went to wrong.",
      error: err.message,
    });
  }
};

exports.publisherReadMessage = async (req, res) => {
  try {
    const { order_id } = req.params;
    const updateRead = await Models.Message.update(
      { isRead: 1 },
      {
        where: { order_id },
      }
    );
    const publisher_id = req.userId;
    const unreadMessageCount = await Models.Message.count({
      where: { receiver_id: publisher_id, isRead: 0 },
    });
    res.status(200).send({ status: true, data: unreadMessageCount });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: "Something went to wrong.",
      error: err.message,
    });
  }
};

exports.getPublisherChatList = async (req, res) => {
  try {
    const receiver_id = req.userId;
    // const chatList = await Models.publisherDomain.findAll({
    //   attributes: [
    //     "id",
    //     "hash_id",
    //     "domain_name",
    //     [
    //       Models.sequelize.fn(
    //         "COUNT",
    //         Models.sequelize.literal(
    //           "CASE WHEN `messageData`.`receiver_id` = " +
    //             receiver_id +
    //             " AND `messageData`.`isRead` = 0 THEN 1 END"
    //         )
    //       ),
    //       "newMsg",
    //     ],
    //   ],
    //   include: [
    //     {
    //       model: Models.Message,
    //       as: "messageData",
    //       attributes: ["sender_id"],
    //       where: {
    //         receiver_id,
    //       },
    //       include: [
    //         {
    //           model: Models.Users,
    //           as: "sender",
    //           attributes: ["firstName", "lastName"],
    //         },
    //       ],
    //     },
    //   ],
    //   group: ["publisherDomain.id"],
    //   where: { user_id: receiver_id },
    // });
    const chatList = await Models.Message.findAll({
      include: [
        {
          model: Models.publisherDomain,
          as: "domain",
          attributes: ["id", "hash_id", "domain_name"],
        },
        {
          model: Models.Users,
          as: "sender",
          attributes: ["firstName", "lastName"],
        },
      ],
      where: {
        receiver_id,
      },
      group: ["sender.id", "domain.id"],
    });

    const newMessageCounts = await Models.Message.findAll({
      attributes: [
        "sender_id",
        "domain_id",
        "receiver_id",
        [
          Models.sequelize.fn(
            "COUNT",
            Models.sequelize.literal(
              "CASE WHEN `Message`.`receiver_id` = " +
                receiver_id +
                " AND `Message`.`isRead` = 0 THEN 1 END"
            )
          ),
          "newMsg",
        ],
      ],
      where: {
        receiver_id,
      },
      group: ["sender_id", "domain_id"],
    });

    const combinedList = chatList.map((chat) => {
      const matchingCounts = newMessageCounts.filter(
        (count) =>
          count.sender_id === chat.sender.id &&
          count.domain_id === chat.domain.id
      );
    
      const totalNewMsg = matchingCounts.reduce((sum, count) => {
        return sum + count.newMsg;
      }, 0);
    
      return {
        ...chat.toJSON(),
        newMsg: totalNewMsg,
      };
    });

    res.status(200).send({
      status: true,
      message: "Chat listed",
      data: combinedList,
    });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: "Something went to wrong",
      error: err.message,
    });
  }
};

exports.publisherReadMsg = async (req, res) => {
  try {
    const receiver_id = req.userId;
    const { domain_id, sender_id } = req.params;
    const updateRead = await Models.Message.update(
      { isRead: 1 },
      {
        where: { domain_id, sender_id, receiver_id },
      }
    );
    res.status(200).send({
      status: true,
      message: "Success",
    });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};
