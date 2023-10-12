const ContactInfo = require('../models/contact_info.models')

async function getAllContactInfo(req, res) {
	try {
		const contact_info = await ContactInfo.findAll({
			where: req.query
		})
		if (contact_info) {
			return res.status(200).json(contact_info)
		} else {
			return res.status(404).send('No contact found')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function getOneContactInfo(req, res) {
	try {
		const contact_info = await ContactInfo.findByPk(req.params.contactId)
		if (contact_info) {
			return res.status(200).json(contact_info)
		} else {
			return res.status(404).send('Contact not found')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}


async function createContactInfo(req, res) {
	try {
		const contact_info = await ContactInfo.create(req.body)
		return res.status(200).json({ message: 'Contact created', contact_info })
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function updateContactInfo(req, res) {
	try {
		const [contactExist, contact_info] = await ContactInfo.update(req.body, {
			returning: true,
			where: {
				id: req.params.contactId,
			},
		})
        if (contactExist !== 0) {
			return res.status(200).json({ message: 'Contact updated', contact_info })
		} else {
			return res.status(404).send('Contact not found')
		}
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

async function deleteContactInfo(req, res) {
	try {
		const contact_info = await ContactInfo.destroy({
			where: {
				id: req.params.contactId,
			},
		})
		if (contact_info) {
			return res.status(200).json('Contact deleted')
		} else {
			return res.status(404).send('Contact not found')
		}
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

module.exports = {
	getAllContactInfo,
    getOneContactInfo,
    createContactInfo,
    updateContactInfo,
    deleteContactInfo
}
