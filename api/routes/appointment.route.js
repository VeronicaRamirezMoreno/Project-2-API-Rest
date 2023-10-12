const router = require('express').Router()

const { getAllAppointments, getOneAppointment, createAppointment, updateAppointment, deleteAppointment } = require('../controllers/appointment.controller')

router.get('/', getAllAppointments)
router.get('/:appointmentId', getOneAppointment)
router.post('/', createAppointment)
router.put('/:appointmentId', updateAppointment)
router.delete('/:appointmentId', deleteAppointment)

module.exports = router
