const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const DeliveryDriver = sequelize.define('delivery_driver', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_user: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    id_delivery: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = DeliveryDriver;
