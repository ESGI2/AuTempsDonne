const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const Product = sequelize.define('product', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    type: {
        type: Sequelize.STRING(20),
    },
    donation: {
        type: Sequelize.BOOLEAN,
    }
}, {
    tableName: 'product',
    timestamps: false
});

module.exports = Product;
