const controller = require("../controllers/channel.controller");
const authJwt = require('../middleware/authJwt')

module.exports = function(app) {

  app.get(
    "/api/channels",
    [authJwt.verifyToken],
    controller.list
  );
};