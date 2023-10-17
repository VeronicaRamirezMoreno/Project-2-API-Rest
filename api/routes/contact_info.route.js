const router = require('express').Router()
const { checkAdmin, checkPersonnel } = require("../middlewares/auth");

const { 
    getAllContactInfo,
    getOwnContactInfo,
    getOneContactInfo,
    createContactInfo,
    updateContactInfo,
    updateContactInfoProfile,
    deleteContactInfo } = require('../controllers/contact_info.contoller')



router.get('/', checkPersonnel, getAllContactInfo)
router.get('/me/profile', getOwnContactInfo)
router.get('/:contactId', checkPersonnel, getOneContactInfo)
router.post('/:userId', checkPersonnel, createContactInfo)
router.put('/me/profile', updateContactInfoProfile)
router.put('/:contactId', checkPersonnel, updateContactInfo)
router.delete('/:contactId', checkPersonnel, deleteContactInfo)


module.exports = router
