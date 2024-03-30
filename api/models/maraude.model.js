const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Maraude = sequelize.define('Maraude', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    duration: {
        type: DataTypes.STRING(5),
        allowNull: false,
        validate: {
            is: {
                args: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, //to obtain this format HH:mm
                msg: "Duration must be in the format HH:mm"
            }
        }
    },
    id_truck: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'truck',
            key: 'id'
        }
    },
    people_needed: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'maraude',
    timestamps: false
});

module.exports = Maraude;
