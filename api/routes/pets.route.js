const router = require('express').Router()

const { getAllPets, getOnePet, createPet, updatePet, deletePet } = require('../controllers/pets.controllers')

router.get('/',  getAllPets)
router.get('/:petId', getOnePet)
router.post('/', createPet)
router.put('/:petId', updatePet)
router.delete('/:petId', deletePet)

module.exports = router