module.exports = (sequelize, Sequelize) => {
  const Channel = sequelize.define("chat_channels", {
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    sent_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    last_message: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return Channel;
};