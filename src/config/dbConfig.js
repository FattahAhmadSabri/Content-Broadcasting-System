require("dotenv").config(); // ← add this first

const { Sequelize } = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("./config");

const sequelize = new Sequelize(
  process.env[config[env].use_env_variable],
  config[env],
);

module.exports = sequelize;
