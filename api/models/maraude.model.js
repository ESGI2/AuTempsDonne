const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Maraude = sequelize.define('maraude', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    id_truck: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'truck',
            key: 'id'
        }
    },
    id_event: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'event',
            key: 'id'
        }
    },
}, {
    tableName: 'maraude',
    timestamps: false
});

module.exports = Maraude;
