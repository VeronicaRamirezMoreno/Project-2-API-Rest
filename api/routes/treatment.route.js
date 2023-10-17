const router = require('express').Router()

const { checkAdmin } = require("../middlewares/auth");

const { getAllTreatments,
     getOneTreatment, 
     createTreatment, 
     updateTreatment, 
     deleteTreatment 
    } = require('../controllers/treatment.controllers')

router.get('/', getAllTreatments)
router.get('/:treatmentId', getOneTreatment)
router.post('/',checkAdmin, createTreatment)
router.put('/:treatmentId',checkAdmin, updateTreatment)
router.delete('/:treatmentId',checkAdmin, deleteTreatment)

module.exports = router
