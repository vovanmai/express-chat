module.exports = {
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USERNAME,
  PASSWORD: process.env.DB_PASSWORD,
  DB: process.env.DB_NAME,
  dialect: "mysql",
  port: process.env.DB_PORT,
  timezone: process.env.TZ,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};