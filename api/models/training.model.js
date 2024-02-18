const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const Training = sequelize.define('training', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    duration: {
        type: Sequelize.INTEGER
    }
},
{
    timestamps: false,
    tableName: 'training'
});

module.exports = Training;