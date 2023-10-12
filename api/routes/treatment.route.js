const router = require('express').Router()

const { getAllTreatments, getOneTreatment, createTreatment, updateTreatment, deleteTreatment } = require('../controllers/tratment.controllers')

router.get('/', getAllTreatments)
router.get('/:treatmentId', getOneTreatment)
router.post('/', createTreatment)
router.put('/:treatmentId', updateTreatment)
router.delete('/:treatmentId', deleteTreatment)

module.exports = router
