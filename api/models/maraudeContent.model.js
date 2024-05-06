const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const MaraudeContent = sequelize.define('maraude_content', {
    id_maraude: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'maraude',
            key: 'id'
        }
    },
    id_product: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'product',
            key: 'id'
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'maraude_content'
});

module.exports = MaraudeContent;