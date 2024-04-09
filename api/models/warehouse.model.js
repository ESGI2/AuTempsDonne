const Sequelize = require('sequelize');
const sequelize = require('../config/db');
const DeliveryPoint = require("./deliveryPoint.model");

const Warehouse = sequelize.define('warehouse', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    country: {
        type: Sequelize.STRING,
        allowNull: false
    },
    city: {
        type: Sequelize.STRING,
        allowNull: false
    },
    postal_code: {
        type: Sequelize.STRING,
        allowNull: false
    },
    road: {
        type: Sequelize.STRING,
        allowNull: false
    },
    road_number: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    id_delivery_point: {
    type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: DeliveryPoint,
            key: 'id'
        }
}
}, {
    tableName: 'warehouse',
    timestamps: false
});

module.exports = Warehouse;
