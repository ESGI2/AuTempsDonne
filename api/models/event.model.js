const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Event = sequelize.define('Event', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    start: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    end: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    activity_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    activity_type: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
}, {
    tableName: 'event',
    timestamps: false
});

module.exports = Event;
