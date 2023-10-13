const router = require('express').Router()
const { checkAdmin } = require("../../middlewares/auth");

const { 
    getAllUsers, 
    getOneUser, 
    createUser, 
    updateUser, 
    deleteUser 
} = require('../controllers/user.controllers')



router.get('/', checkAdmin, getAllUsers)
router.get('/:userId', getOneUser)
router.post('/', createUser)
router.put('/:userId', updateUser)
router.delete('/:userId', deleteUser)

module.exports = router
