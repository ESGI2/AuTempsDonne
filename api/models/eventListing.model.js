const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const EventListing = sequelize.define('EventListing', {
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id',
        }
    },
    id_event: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'event',
            key: 'id',
        }
    }
}, {
    tableName: 'event_listing',
    timestamps: false,
    primaryKey: ['id_user', 'id_event']
});

module.exports = EventListing;
