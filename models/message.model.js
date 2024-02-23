module.exports = (sequelize, Sequelize) => {
  const ChatMessage = sequelize.define("chat_messages", {
    channel_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    sent_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    message: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
  });

  return ChatMessage;
};