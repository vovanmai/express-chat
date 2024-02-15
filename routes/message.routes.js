const controller = require("../controllers/message.controller")
const authJwt = require('../middleware/authJwt')

module.exports = function(app) {
  app.post(
    "/api/channels/:id/messages",
    [authJwt.verifyToken],
    controller.store
  );
  app.get(
    "/api/channels/:id/messages",
    [authJwt.verifyToken],
    controller.index
  );
};