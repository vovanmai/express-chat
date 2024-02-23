module.exports = (sequelize, Sequelize) => {
  const File = sequelize.define("files", {
    message_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    path: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return File;
};