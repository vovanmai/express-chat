const { Op } = require('sequelize');
const { getPagination } = require('../helpers/common');

const db = require("../models");
const Message = db.message;

exports.store = async (req, res) => {
  try {
    const channelId = req.params.id
    const data = {
      channel_id: channelId,
      user_id: req.user.id,
      message: req.body.message,
      sent_at: new Date(),
    }
    const response = await Message.create(data)
    let result = response.dataValues
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

    // for (let i = 0; i <= 3000000000; i++) {
    //
    // }

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
