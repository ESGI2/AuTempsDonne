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
        type: Sequelize.STRING(20) ,
        defaultValue: null
    },
    lon: {
        type: Sequelize.STRING(20),
        defaultValue: null
    }
}, {
    tableName: 'delivery_point',
    timestamps: false
});

module.exports = DeliveryPoint;
