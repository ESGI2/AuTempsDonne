const mysql = require('mysql2');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({

    dialect: process.env.DB_DIALECT,
    host     : process.env.DB_HOST,
    username : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME,
    logging  : false // false disable SQL logs in the console	| 'console.log' to display the logs
});

module.exports = sequelize;