const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const Ticket = sequelize.define('ticket', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    message: {
        type: Sequelize.STRING,
        allowNull: false
    },
    date_creation: {
        type: Sequelize.STRING,
        allowNull: false
    },
    id_user: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id'
        },
    },
    id_answer: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: 'user',
            key: 'id'
        },
    },
    status: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
},{
    tableName: 'ticket',
    timestamps: false
});

module.exports = Ticket;