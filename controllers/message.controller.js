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
    await Message.create(data)
    res.json({
      data: data
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.index = async (req, res) => {
  try {
    const channelId = req.params.id


    const { limit, offset } = getPagination(req.query.page, req.query.per_page)
    console.log(limit, offset)
    const messages = await Message.findAll({
      where: {
        channel_id: channelId
      },
      order: [
        ['id', 'ASC'],
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
