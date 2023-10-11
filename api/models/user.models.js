const { DataTypes } = require('sequelize')
const { sequelize } = require('../../database')

const User = sequelize.define(
	'user',
	{
		first_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		last_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dni: {
            type: DataTypes.STRING,
            validate: {
                isDNIorNIE(value) {
                  const dniRegExp = /^[0-9]{8}[A-Z]$/;
                  const nieRegExp = /^[XYZ][0-9]{7}[A-Z]$/;
                  
                  if (!dniRegExp.test(value) && !nieRegExp.test(value)) {
                    throw new Error('DNI or NIE not valid');
                  }
                },
              },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                isEmail: true,
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                  isIn: {
                    args: [['admin','personnel','user']], 
                    msg: 'Valid role only admin, personnel or user',
                  },
                },
        },        
    },
    {timestamps: false}
)

module.exports = User