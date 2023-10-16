const Appointment = require('../models/appointment.model')

async function getAllAppointments(req, res) {
	try {
		const appointments = await Appointment.findAll({
			where: req.query           
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
		const appointment = await Appointment.findByPk(req.params.appointmentId)
		if (appointment) {
			return res.status(200).json(appointment)
		} else {
			return res.status(404).send('Appointment not found')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}
async function getVetAppointments(req, res) {
	try {
		const appointments = await Appointment.findAll({
	 	where: {
				id: res.locals.user.id
			},            
		})
		if (appointments) {
			return res.status(200).json({appointments})
		} else {
			return res.status(404).send('Have not appointments available')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function createAppointment(req, res) {
	try {
		const appointment = await Appointment.create(req.body)
		return res.status(200).json({ message: 'Appointment created', appointment : appointment })
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
	createAppointment,
	updateAppointment,
	deleteAppointment
}
