const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const MaraudePassing = sequelize.define('maraude_passing', {
    id_maraude: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'maraude',
            key: 'id'
        }
    },
    id_point: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'maraudePoint',
            key: 'id'
        }
    },
    step: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'maraude_passing'
});

module.exports = MaraudePassing;