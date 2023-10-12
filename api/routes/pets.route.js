const router = require('express').Router()

const { getAllPets, getOnePet, createPet, updatePet, deletePet } = require('../controllers/pets.controllers')

router.get('/',  getAllPets)
router.get('/:userId', getOnePet)
router.post('/', createPet)
router.put('/:userId', updatePet)
router.delete('/:userId', deletePet)

module.exports = router