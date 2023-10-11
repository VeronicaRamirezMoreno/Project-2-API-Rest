//Requerir modelos 
const User = require('../api/models/user.models')


function addRelationsToModels() {
	try {
		console.log('Relations added to all models')
	} catch (error) {
		throw error
	}
}

module.exports = addRelationsToModels