// User model definition

const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    first_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    last_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    role: {
        type: Sequelize.STRING,
        allowNull: false
    },
    registration_date: {
        type: Sequelize.STRING,
        allowNull: false
    },
    validation_status: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nbr_child: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    newsletter: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    salt: {
        type: Sequelize.STRING,
        allowNull: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: true
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: true
    },
    country: {
        type: Sequelize.STRING,
        allowNull: true
    },
    city: {
        type: Sequelize.STRING,
        allowNull: true
    },
    postal_code: {
        type: Sequelize.STRING,
        allowNull: true
    },
    road: {
        type: Sequelize.STRING,
        allowNull: true
    },
    road_number: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    date_of_birth: {
        type: Sequelize.DATE,
        allowNull: true
    },
    nationality: {
        type: Sequelize.STRING,
        allowNull: true
    },
    account_status: {
        type: Sequelize.STRING,
        allowNull: false
    },
    family_situation: {
        type: Sequelize.STRING,
        allowNull: true
    }
},
{
    tableName: 'user',
    timestamps: false
}
);

module.exports = User;