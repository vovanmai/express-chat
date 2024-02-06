const db = require("../models");
const User = db.user;
const jwt = require("jsonwebtoken");
const config = require('../config/auth.config')

exports.signup = async (req, res) => {
  try {
    const username = req.body.username
    const data = {
      username: username
    }

    if (!username) {
      return res.status(422).json({ errors: { username: 'Vui lòng nhập username.' }});
    }

    const user = await User.create(data);

    const token = jwt.sign({ id: user.id, username: user.username }, config.secret);

    res.json({ data: {user: user,  access_token: token} });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
