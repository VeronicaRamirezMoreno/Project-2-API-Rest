const router = require('express').Router()
const { checkAdmin , checkPersonnel} = require("../middlewares/auth");

const { getAllPets, getOnePet, createPet, updatePet,addPetToUser, deletePet } = require('../controllers/pets.controllers')

router.get('/', checkPersonnel, getAllPets)
router.get('/:petId',checkPersonnel, getOnePet)
router.post('/', checkPersonnel,createPet)
router.put('/:petId',checkPersonnel, updatePet)
router.put('/:petId/:userId',checkPersonnel, addPetToUser)
router.delete('/:petId', checkPersonnel,deletePet)

module.exports = router