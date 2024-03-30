const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const DeliveryListingModel = sequelize.define('delivery_listing', {
    id_product: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
            model: 'product',
            key: 'id'
        }
    },
    id_delivery: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
            model: 'delivery',
            key: 'id'
        }
    },
    departure: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    arrival: {
        type: Sequelize.INTEGER,
        allowNull: false
    }}, {
    tableName: 'delivery_listing',
    timestamps: false
});

module.exports = DeliveryListingModel;
