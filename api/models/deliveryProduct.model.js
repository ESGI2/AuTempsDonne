const Sequelize = require('sequelize');
const sequelize = require('../config/db');
const Product = require('./product.model');
const Delivery = require('./delivery.model');

const DeliveryProduct = sequelize.define('delivery_product', {
    id_product: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: 'product',
            key: 'id'
        }
    },
    id_delivery: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: 'delivery',
            key: 'id'
        }
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'delivery_product',
    timestamps: false
});

module.exports = DeliveryProduct;
