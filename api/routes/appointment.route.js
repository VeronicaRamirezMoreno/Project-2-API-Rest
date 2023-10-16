const router = require('express').Router()
const { checkAdmin , checkPersonnel} = require("../middlewares/auth");

const {
    getAllAppointments,
    getOneAppointment,
    createAppointment,
    updateAppointment,
    deleteAppointment } = require('../controllers/appointment.controller')

router.get('/', checkPersonnel, getAllAppointments)
router.get('/:appointmentId', checkPersonnel,getOneAppointment)
router.post('/', checkPersonnel,createAppointment)
router.put('/:appointmentId',checkPersonnel, updateAppointment)
router.delete('/:appointmentId',checkPersonnel, deleteAppointment)

module.exports = router
