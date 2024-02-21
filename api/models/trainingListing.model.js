const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const TrainingListing = sequelize.define('training_listing', {
    id_training: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
            model: 'training',
            key: 'id'
        }
    },
    id_user: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
            model: 'user',
            key: 'id'
        }
    }
}, {
    timestamps: false,
    tableName: 'training_listing'
});

module.exports = TrainingListing;