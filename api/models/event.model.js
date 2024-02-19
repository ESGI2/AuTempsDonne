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
        type: DataTypes.DATE,
        allowNull: false
    },
    end: {
        type: DataTypes.DATE,
        allowNull: false
    },
    activity_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'activity',
            key: 'id'
        }
    },
}, {
    tableName: 'event',
    timestamps: false
});

module.exports = Event;
