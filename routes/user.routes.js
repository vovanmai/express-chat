const controller = require("../controllers/user.controller");

module.exports = function(app) {

  app.post(
    "/api/users",
    controller.signup
  );
};