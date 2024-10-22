const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const DeliveryDriver = sequelize.define('delivery_drivers', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_user: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id'
        }
    },
    id_delivery: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'delivery',
            key: 'id'
        }
    }}, {
        tableName: 'delivery_drivers',
        timestamps: false
});

module.exports = DeliveryDriver;
