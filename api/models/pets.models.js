const { DataTypes } = require('sequelize')
const { sequelize } = require('../../database')

const Pets = sequelize.define(
    'pets',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        birth_date: {
            type: DataTypes.DATE
        },
        chip_num: {
            type: DataTypes.INTEGER            
        },
        species: {
            type: DataTypes.STRING
        },
        breed: {
            type: DataTypes.STRING
        },
        sex: {
            type: DataTypes.STRING
        },
        profile_picture: {
            type: DataTypes.STRING
        },
       comments: {
            type: DataTypes.STRING
        }
    },
        {timestamps: false}
)

module.exports = Pets