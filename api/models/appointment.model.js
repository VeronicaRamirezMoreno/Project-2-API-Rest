const { DataTypes } = require('sequelize')
const { sequelize } = require('../../database')

const Appointment = sequelize.define(
    'appointment',
    {
        appointment_date: {

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
        appointment_time: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isTimeFormat(value) {
                    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/; // Formato HH:MM en 24 horas
                    if (!timeRegex.test(value)) {
                        throw new Error('Ivalid time. Use the format HH:MM in 24 hours.');
                    }
                },
            },
        },
        description: {
            type: DataTypes.STRING,
        },
        duration: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isDurationValid(value) {
                    const minDuration = 15; // Minutes
                    const maxDuration = 240; // Minutes
                    const duration = parseInt(value, 10);
                    if (isNaN(duration) || duration < minDuration || duration > maxDuration) {
                        throw new Error('Invalid duration. It should be between 15 and 240 minutes.');
                    }
                },
            },
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: 'available'
        },
    },
    { timestamps: false }
)

module.exports = Appointment