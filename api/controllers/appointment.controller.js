const Appointment = require('../models/appointment.model')
const Vet = require('../models/vets.models')
const Pet = require('../models/pets.models')
const User = require('../models/user.models')
const Treatment = require('../models/treatment.model')
const sequelize = require('sequelize')


async function getAllAppointments(req, res) {
	try {
		const appointments = await Appointment.findAll({
			where: req.query,
			include: { model: Vet, model: Pet }
		})
		if (appointments) {
			return res.status(200).json(appointments)
		} else {
			return res.status(404).send('No appointments found')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function getOneAppointment(req, res) {
	try {
		const appointment = await Appointment.findByPk(req.params.appointmentId, {
			include: [
				{
					model: Pet,
					as: 'pet',
					attributes: ['name'],
				},

				{
					model: User,
					as: 'user',
					attributes: ['first_name'],
				}
			]
		})
		if (appointment) {
			return res.status(200).json({ message: `${appointment.pet.name} has an appointment with ${appointment.user.first_name}`, appointment })
		} else {
			return res.status(404).send('Appointment not found')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function getVetAppointments(req, res) {
	const { vetId } = req.params

	try {
		const vet = await User.findOne({ where: { id: vetId } })

		if (!vet) {
			return res.status(404).send('Vet not found')
		}

		const vetAppointments = await Appointment.findAll({
			where: {
				userId: vetId,
			},
			include: [Pet],
		})

		if (vetAppointments) {
			const message = `Appointment schedule of ${vet.first_name}`
			return res.status(200).json({ message, appointments: vetAppointments })
		} else {
			return res.status(404).send('No appointments found for this vet')
		}
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

async function getPetAppointments(req, res) {

	try {
		const user = await User.findOne({
			where: {
				id: res.locals.user.id
			},
			include: { model: Pet }
		})
		if (!user) {
			return res.status(404).send('User not found')
		}

		const message = `${user.first_name}, these are the upcoming appointments for your pets.`
		const petAppointments = user.pets
		res.status(200).json({ message, petAppointments })

	} catch (error) {
		return res.status(500).send(error.message)
	}
}

async function getAvailableAppointments(req, res) {
	try {
		const availableAppointments = await Appointment.findAll({
			where: {
				status: 'available',
			},
			attributes: ['id', 'appointment_date', 'appointment_time', 'status'],
			include: {
				model: User,
				as: 'user',
				attributes: [[sequelize.col('first_name'), 'Vet']],
			},
		})
		const message = `These are our next available appointments:`
		return res.status(200).json({ message, availableAppointments })

	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function bookAppointment(req, res) {
	try {
		const { treatmentIds, petId } = req.body
		const appointment = await Appointment.findByPk(req.params.appointmentId)

		if (appointment) {
			if (appointment.status === 'available') {

				await appointment.addSchedule(treatmentIds)

				const treatments = await Treatment.findAll({
					 where: { id: treatmentIds } })
				const description = treatments.map(treatment => treatment.description).join(', ')

				await appointment.update({
					description,
					petId,
					status: 'not_available'
				})

				return res.status(200).json({ message: 'Appointment booked successfully' })
			} else {
				return res.status(409).send('Appointment is not available for booking')
			}
		} else {
			return res.status(404).send('Appointment not found')
		}
	} catch (error) {
		return res.status(500).send(error.message)
	}
}



async function createAppointment(req, res) {
	try {
		const appointment = await Appointment.create({

			appointment_date: req.body.appointment_date,
			appointment_time: req.body.appointment_time,
			duration: req.body.duration
		})
		const user = await User.findByPk(req.params.vetId)
		await appointment.setUser(user)



		return res.status(200).json({ message: 'Appointment created', appointment: appointment })
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function updateAppointment(req, res) {
	try {
		const [appointmentExist, appointment] = await Appointment.update(req.body, {
			returning: true,
			where: {
				id: req.params.appointmentId,
			},
		})
		if (appointmentExist !== 0) {
			return res.status(200).json({ message: 'Appointment updated', appointment: appointment })
		} else {
			return res.status(404).send('Appointment not found')
		}
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

async function deleteAppointment(req, res) {
	try {
		const appointment = await Appointment.destroy({
			where: {
				id: req.params.appointmentId,
			},
		})
		if (appointment) {
			return res.status(200).json('Appointment deleted')
		} else {
			return res.status(404).send('Appointment not found')
		}
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

module.exports = {
	getAllAppointments,
	getOneAppointment,
	getVetAppointments,
	getPetAppointments,
	getAvailableAppointments,
	createAppointment,
	updateAppointment,
	bookAppointment,
	deleteAppointment
}
