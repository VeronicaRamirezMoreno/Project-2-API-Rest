const { DataTypes } = require('sequelize')
const { sequelize } = require('../../database')

const Treatment = sequelize.define(
  'treatment',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 255],
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min:0,
        max:10000,     
      },
    },
  },
  { timestamps: false }
)

module.exports = Treatment