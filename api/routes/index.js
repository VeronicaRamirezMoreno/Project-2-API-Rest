const router = require('express').Router()

router.use('/user', require('./user.route'))

router.use('/pet', require('./pets.route'))

router.use('/contactInfo', require('./contact_info.route'))
router.use('/vet', require('./vet.route'))


module.exports = router
