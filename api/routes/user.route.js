const router = require('express').Router()
const { checkAdmin , checkPersonnel} = require("../middlewares/auth");

const { 
    getAllUsers, 
    getOwnProfile,
    getAllOwners,
    getOneUser, 
    createUser, 
    updateUser, 
    updateOwner,
    updateOwnUser,
    deleteUser,
    deleteOwner,
    deleteOwnUser, 
} = require('../controllers/user.controllers')



router.get('/',checkAdmin, getAllUsers)
router.get('/owner',checkPersonnel, getAllOwners)
router.get('/profile', getOwnProfile)
router.get('/:userId', getOneUser)
router.post('/',checkPersonnel, createUser)
router.put('/:userId', checkAdmin, updateUser)
router.put('/owner/:userId', checkPersonnel, updateOwner)
router.put('/profile', updateOwnUser)
router.delete('/:userId',checkAdmin, deleteUser)
router.delete('/owner/:userId',checkPersonnel, deleteOwner)
router.delete('/profile', deleteOwnUser)

module.exports = router
