const router = require('express').Router()
const { checkAuth } = require("../middlewares/auth");

router.use('/auth', require('./auth.router'))

router.use('/user',checkAuth, require('./user.route'))
router.use('/pet',checkAuth, require('./pets.route'))
router.use('/contactInfo', checkAuth, require('./contact_info.route'))
router.use('/vet',checkAuth, require('./vet.route'))
router.use('/treatment',checkAuth, require('./treatment.route'))
router.use('/appointment', checkAuth,require('./appointment.route'))


module.exports = router
