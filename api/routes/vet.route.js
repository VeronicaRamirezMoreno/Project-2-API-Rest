const router = require('express').Router()

const { getAllVet,getOneVet,createVet,updateVet, deleteVet } = require('../controllers/vets.controller')

router.get('/', getAllVet)
router.get('/:vetId', getOneVet)
router.post('/', createVet)
router.put('/:vetId', updateVet)
router.delete('/:vetId', deleteVet)

module.exports = router
