const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const MaraudePoint = sequelize.define('MaraudePoint', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    postal_code: {
        type: DataTypes.STRING,
        allowNull: false
    },
    road: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    tableName: 'maraude_point',
    timestamps: false
});

module.exports = MaraudePoint;
