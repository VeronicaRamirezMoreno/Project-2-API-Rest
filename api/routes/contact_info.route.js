const router = require('express').Router()
const { checkAdmin, checkPersonnel } = require("../middlewares/auth");

const { 
    getAllContactInfo,
    getOwnContactInfo,
    getOneContactInfo,
    createContactInfo,
    updateContactInfo,
    deleteContactInfo } = require('../controllers/contact_info.contoller')

router.get('/', checkPersonnel, getAllContactInfo)
router.get('/me/profile', getOwnContactInfo)
router.get('/:contactId', checkPersonnel, getOneContactInfo)
router.post('/', checkPersonnel, createContactInfo)
router.put('/:contactId', checkPersonnel, updateContactInfo)
router.delete('/:contactId', checkPersonnel, deleteContactInfo)


module.exports = router
