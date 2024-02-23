const { Op } = require('sequelize');
const { getPagination } = require('../helpers/common');

const db = require("../models");
const Message = db.message;
const File = db.file;

exports.store = async (req, res) => {
  try {
    const channelId = req.params.id
    const type = req.body.type
    console.log(type)
    let data = {
      channel_id: channelId,
      user_id: req.user.id,
      sent_at: new Date(),
      type: type,
      message: type === 'text' ? req.body.message : null
    }
    const message = await Message.create(data)
    let result = message.dataValues

    if (type === 'image') {
      const images = req.body.images.map((item) => {
        return {
          path: item,
          message_id: result.id
        }
      })
      const files = await File.bulkCreate(images);
      console.log(files)
    }
    result.user = req.user
    res.json({
      data: result
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.index = async (req, res) => {
  try {
    const channelId = req.params.id

    const { limit, offset } = getPagination(req.query.page, req.query.per_page)

    let where = {
      channel_id: channelId
    }
    if (req.query.min_id) {
      where.id = {
        [Op.lt]: req.query.min_id
      }
    }

    const messages = await Message.findAll({
      where: where,
      include: ["user"],
      order: [
        ['id', 'DESC'],
      ],
      limit: limit,
      offset: offset,
    })
    res.json({
      data: messages
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteAll = async (req, res) => {
  try {
    const channelId = req.params.id

    // const channel = await Message.findOne({
    //   where: {
    //     channel_id: channelId
    //   }
    // })
    //
    //
    // if (!channel) {
    //   return res.status(404).json({ message: "channel is not found" });
    // }

    await Message.destroy({
      where: {
        channel_id: channelId
      },
    });

    res.json({
      message: 'Delete all successfully.'
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
