const router = require('express').Router()

const { getAllContactInfo, getOneContactInfo, createContactInfo, updateContactInfo, deleteContactInfo } = require('../controllers/contact_info.contoller')

router.get('/', getAllContactInfo)
router.get('/:contactId', getOneContactInfo)
router.post('/', createContactInfo)
router.put('/:contactId', updateContactInfo)
router.delete('/:contactId', deleteContactInfo)

module.exports = router
