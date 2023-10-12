const { DataTypes } = require('sequelize')
const { sequelize } = require('../../database')

const Pets = sequelize.define(
    'pets',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        birth_date: {
            type: DataTypes.DATE,
            validate: {
                len: [0, 8] 
              }
        },
        chip_num: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        species: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        breed: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        sex: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        profile_picture: {
            type: DataTypes.STRING,
        },
       comments: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
        {timestamps: false}
)

module.exports = Pets