//Requerir modelos 
const User = require('../api/models/user.models')
const ContactInfo =require ('../api/models/contact_info.models')
const Vet =require ('../api/models/vets.models')

function addRelationsToModels() {
	try {
		console.log('Relations added to all models')
	} catch (error) {
		throw error
	}
}

module.exports = addRelationsToModels