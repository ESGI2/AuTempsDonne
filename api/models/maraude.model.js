const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Maraude = sequelize.define('Maraude', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_truck: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'truck',
            key: 'id'
        }
    }
}, {
    tableName: 'maraude',
    timestamps: false
});

module.exports = Maraude;
