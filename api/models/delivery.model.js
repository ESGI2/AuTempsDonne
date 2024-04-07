const Sequelize = require('sequelize');
const sequelize = require('../config/db');
const Truck = require('./truck.model');

const Delivery = sequelize.define('delivery', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    departure: {
        type: Sequelize.DATE,
        allowNull: false
    },
    theorical_arrival: {
        type: Sequelize.DATE,
        allowNull: false
    },
    id_truck: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'truck',
            key: 'id'
        }
    },
    status:{
        type: Sequelize.INTEGER,
        allowNull:false
    }
}, {
    tableName: 'delivery',
    timestamps: false
});

module.exports = Delivery;
