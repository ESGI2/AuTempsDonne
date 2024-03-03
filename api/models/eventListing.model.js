const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const EventListing = sequelize.define('EventListing', {
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'user',
            key: 'id',
        }
    },
    id_event: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'event',
            key: 'id',
        }
    }
}, {
    tableName: 'event_listing',
    timestamps: false,
});

module.exports = EventListing;
