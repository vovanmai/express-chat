module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "root",
  DB: "chats",
  dialect: "mysql",
  port: '3306',
  timezone: process.env.TZ,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};