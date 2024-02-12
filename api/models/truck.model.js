// truck.model.js

const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const Truck = sequelize.define('truck', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    localisation: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    tableName: 'truck',
    timestamps: false
});

module.exports = Truck;
