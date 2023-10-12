const { DataTypes } = require('sequelize')
const { sequelize } = require('../../database')

const Vet = sequelize.define(
	'vet',
	{
		membership_num: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		specialization: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            validate: {
                len: [0, 15] 
              }
        },
        profile_picture: {
            type: DataTypes.STRING,
        }       
    },
    {timestamps: false}
)

module.exports = Vet