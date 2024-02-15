const db = require("../models");
const Channel = db.channel;

exports.list = async (req, res) => {
  try {
    let channels = []
    for (let i = 1; i<= 250; i++) {
      channels.push({
        id: i,
        name: "Channel " + i
      })
    }

    res.json({
      data: channels
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
