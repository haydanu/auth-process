require("dotenv").config();

const commonConfig = {
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
    },
  },
};

module.exports = {
  development: {
    ...commonConfig,
    database: process.env.POSTGRES_DATABASE_DEV,
  },
  test: {
    ...commonConfig,
    database: process.env.POSTGRES_DATABASE_TEST,
  },
  production: {
    ...commonConfig,
    database: process.env.POSTGRES_DATABASE,
  },
};
