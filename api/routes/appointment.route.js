const router = require('express').Router()
const { checkAdmin , checkPersonnel} = require("../middlewares/auth");

const {
    getAllAppointments,
    getOneAppointment,
    getVetAppointments,
    getPetAppointments,
    getAvailableAppointments,
    createAppointment,
    bookAppointment,
    updateAppointment,
    deleteAppointment } = require('../controllers/appointment.controller')

router.get('/', checkPersonnel, getAllAppointments)
router.get('/:appointmentId', checkPersonnel,getOneAppointment)
router.get('/vet/:vetId',checkPersonnel, getVetAppointments)
router.post('/', checkPersonnel,createAppointment)
router.put('/:appointmentId',checkPersonnel, updateAppointment)
router.delete('/:appointmentId',checkPersonnel, deleteAppointment)
router.get ('/owner/appointments', getPetAppointments)
router.get('/owner/available',getAvailableAppointments)
router.put('/book/:appointmentId', bookAppointment)

module.exports = router
