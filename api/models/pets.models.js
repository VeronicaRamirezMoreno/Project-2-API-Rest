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
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isDateValid(value) {
                    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
                    if (!dateRegex.test(value)) {
                        throw new Error('Incorrect date. Use the format YYYYY-MM-DD.');
                    }
                },
            },
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