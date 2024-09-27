module.exports = {
  HOST: process.env.SQL_HOST,
  USER: String(process.env.SQL_USER),
  PASSWORD: process.env.MY_SQL_PASSWORD,
  DB: process.env.SQL_DATABASE,
  dialect: process.env.SQL_DIALECT,
  pool: {
    max: Number(process.env.POOL_MAX),
    min: Number(process.env.POOL_MIN),
    acquire: Number(process.env.POOL_ACQUIRE),
    idle: Number(process.env.POOL_IDLE),
  },
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  JWT_EXPIRATION_TIME: process.env.JWT_EXPIRATION_TIME,
};
