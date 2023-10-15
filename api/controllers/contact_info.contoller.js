const ContactInfo = require('../models/contact_info.models')
const User = require('../models/user.models')

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

async function getOwnContactInfo(req, res) {
	try {
		const contactInfo = await ContactInfo.findOne({
			where: {
				id: res.locals.user.id
			}
		})

		if (contactInfo) {
			return res.status(200).json(contactInfo)
		} else {
			return res.status(404).send('Contact info not found for this user')
		}
	} catch (error) {
		return res.status(500).send(error.message)
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
		const contact_info = await ContactInfo.create(req.body, {
			where: {
				id: res.locals.user.id
			}
		})
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
				id: req.params.contactId
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
				id: req.params.contactId
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
	getOwnContactInfo,
	getOneContactInfo,
	createContactInfo,
	updateContactInfo,
	deleteContactInfo,	
}
