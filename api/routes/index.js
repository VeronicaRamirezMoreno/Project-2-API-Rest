const router = require('express').Router()

router.use('/user', require('./user.route'))
router.use('/pet', require('./pets.route'))


module.exports = router
