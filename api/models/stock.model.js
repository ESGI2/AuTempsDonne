const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const Stock = sequelize.define('stock', {
    id_product: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'product',
            key: 'id'
        }
    },
    id_warehouse: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'warehouse',
            key: 'id'
        }
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    dlc: {
        type: Sequelize.DATE,
        allowNull: false
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false
    }
}, {
    tableName: 'stock',
    timestamps: false
});

module.exports = Stock;
