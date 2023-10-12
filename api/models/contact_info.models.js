const { DataTypes } = require('sequelize')
const { sequelize } = require('../../database')

const ContactInfo = sequelize.define(
	'contact_info',
	{
		phone: {
			type: DataTypes.STRING,
            validate: {
                len: [0, 15] 
              }
		},
		address: {
            type: DataTypes.STRING,
            validate: {
                len: [0, 150] 
              }
        },      
    },
    {timestamps: false}
)

module.exports = ContactInfo