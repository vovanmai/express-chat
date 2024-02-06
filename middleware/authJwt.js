const jwt = require('jsonwebtoken')
const config = require('../config/auth.config')

verifyToken = (req, res, next) => {
  let token = req.get('Authorization');
  if (!token) {
    return res.status(401).json({
      message: "You need to login again.",
    });
  }

  const TokenArray = token.split(" ");

  jwt.verify(TokenArray[1],
    config.secret,
    (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized!",
        });
      }
      req.user = decoded;
      next();
    });
};

const authJwt = {
  verifyToken,
};
module.exports = authJwt;