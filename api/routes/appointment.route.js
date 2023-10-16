const router = require('express').Router()
const { checkAdmin, checkPersonnel } = require("../middlewares/auth");

const { getAllAppointments, 
    getOneAppointment, 
    getAvailableAppointments,
    getVetAppointments,
    createAppointment, 
    updateAppointment, 
    deleteAppointment 
} = require('../controllers/appointment.controller')


router.get('/',checkPersonnel, getAllAppointments)
router.get('/:appointmentId', checkPersonnel, getOneAppointment)
//router.get('/available', getAvailableAppointments)
router.get('/profile', getVetAppointments)
router.post('/', checkAdmin, createAppointment)
router.put('/:appointmentId', updateAppointment)
router.delete('/:appointmentId', deleteAppointment)

module.exports = router