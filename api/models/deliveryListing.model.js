const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Delivery = require('./delivery.model');
const DeliveryPoint = require('./deliveryPoint.model');

const DeliveryListing = sequelize.define('delivery_listing', {
    id_delivery: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: Delivery,
            key: 'id'
        }
    },
    id_point: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: DeliveryPoint,
            key: 'id'
        }
    },
    isDeparture: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    isArrival: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    tableName: 'delivery_listing',
    timestamps: false,
});

module.exports = DeliveryListing;
