const Sequelize = require('sequelize');
const sequelize = require('../config/db');

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
    }
}, {
    tableName: 'warehouse',
    timestamps: false
});

module.exports = Warehouse;
