const router = require('express').Router()

router.use('/user', require('./user.route'))
router.use('/treatment', require('./treatment.route'))
router.use('/appointment', require('./appointment.route'))

module.exports = router
