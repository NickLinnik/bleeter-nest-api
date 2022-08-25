// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const { POSTGRES_PASSWORD, POSTGRES_USER, POSTGRES_DB, POSTGRES_HOST } =
  process.env;

const config = {
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  host: POSTGRES_HOST,
  dialect: 'postgres',
};

module.exports = {
  development: config,
  test: config,
  production: config,
};
