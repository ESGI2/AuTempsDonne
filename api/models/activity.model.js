const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Activity = sequelize.define('Activity', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    heure: {
        type: DataTypes.TIME,
        allowNull: false
    },
    lieu: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nbParticipantsMax: {
        type: DataTypes.INTEGER
    }
}, {
    tableName: 'activities',
    timestamps: false
});

module.exports = Activity;
