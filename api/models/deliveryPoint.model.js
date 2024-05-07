const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const DeliveryPoint = sequelize.define('delivery_point', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING
    },
    country: {
        type: Sequelize.STRING
    },
    city: {
        type: Sequelize.STRING
    },
    postal_code: {
        type: Sequelize.STRING
    },
    road: {
        type: Sequelize.STRING
    },
    lat: {
        type: Sequelize.DECIMAL(10, 8),
        defaultValue: null
    },
    lon: {
        type: Sequelize.DECIMAL(11, 8),
        defaultValue: null
    }
}, {
    tableName: 'delivery_point',
    timestamps: false
});

module.exports = DeliveryPoint;
