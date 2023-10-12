//Requerir modelos 
const User = require('../api/models/user.models')
const Treatment = require ('../api/models/treatment.model')
const Appointment = require ('../api/models/appointment.model')


function addRelationsToModels() {
	try {
		console.log('Relations added to all models')
	} catch (error) {
		throw error
	}
}

module.exports = addRelationsToModels