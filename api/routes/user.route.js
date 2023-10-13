const router = require('express').Router()
const { checkAdmin , checkPersonnel} = require("../middlewares/auth");
const { signUp, login } = require("../controllers/auth.controller");

const { 
    getAllUsers, 
    getOneUser, 
    createUser, 
    updateUser, 
    deleteUser 
} = require('../controllers/user.controllers')



router.get('/', getAllUsers)
router.get('/:userId', getOneUser)
router.post('/',checkPersonnel,checkAdmin, createUser)
router.put('/:userId', updateUser)
router.delete('/:userId', deleteUser)

module.exports = router
