const router = require('express').Router()
const { checkAdmin, checkPersonnel } = require("../middlewares/auth");

const {
    getAllPets,
    getOnePet,
    getOwnerPet,
    createPetProfile,
    createPetPersonnel,
    updatePet,
    addPetToUser,
    deletePet } = require('../controllers/pets.controllers')

router.get('/me', getOwnerPet)
router.get('/', checkPersonnel, getAllPets)
router.get('/:petId', checkPersonnel, getOnePet)


router.post('/profile', createPetProfile)
router.post('/:userId',checkPersonnel, createPetPersonnel)

router.put('/:petId', checkPersonnel, updatePet)
router.put('/:petId/:userId', checkPersonnel, addPetToUser)

router.delete('/:petId', checkPersonnel, deletePet)

module.exports = router