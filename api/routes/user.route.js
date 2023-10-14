const router = require('express').Router()
const { checkAdmin , checkPersonnel} = require("../middlewares/auth");

const { 
    getAllUsers, 
    getOwnProfile,
    getOneUser, 
    createUser, 
    updateUser, 
    deleteUser 
} = require('../controllers/user.controllers')



router.get('/', getAllUsers)
router.get('/profile', getOwnProfile);
router.get('/:userId', getOneUser)
router.post('/',checkPersonnel,checkAdmin, createUser)
router.put('/:userId', updateUser)
router.delete('/:userId', deleteUser)

module.exports = router
