const router = require('express').Router()
const { checkAdmin,checkPersonnel } = require("../middlewares/auth");
const { signUp, login } = require("../controllers/auth.controller");

const { getAllVet,
    getOneVet,
    createVet,
    updateVet, 
    deleteVet,
    getVetProfile 
} = require('../controllers/vets.controller')

router.get('/profile/:id', checkPersonnel,getVetProfile)
router.get('/', getAllVet)
router.get('/:vetId', getOneVet)
router.post('/', checkAdmin, createVet)
router.put('/:vetId',checkAdmin, updateVet)
router.delete('/:vetId',checkAdmin,deleteVet)

module.exports = router
