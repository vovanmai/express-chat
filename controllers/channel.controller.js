const db = require("../models");
const Channel = db.channel;

exports.list = async (req, res) => {
  try {
    console.log(req.user)
    const channels = await Channel.findAll();

    res.json({
      data: channels
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
