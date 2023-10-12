//Requerir modelos 
const User = require('../api/models/user.models')
const Treatment = require ('../api/models/treatment.model')
const Appointment = require ('../api/models/appointment.model')


function addRelationsToModels() {
	try {

		//One to Many
		
		
		//Many to Many
		Treatment.belongsToMany(Appointment, {through:"Schedule", as: 'schedule', timestamps:false })
		Appointment.belongsToMany(Treatment, {through:"Schedule", as: 'schedule', timestamps:false })
		
		console.log('Relations added to all models')
	} catch (error) {
		throw error
	}
}

module.exports = addRelationsToModels