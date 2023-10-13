//Requerir modelos 
const User = require('../api/models/user.models')
const Treatment = require ('../api/models/treatment.model')
const Appointment = require ('../api/models/appointment.model')
const Pet = require ('../api/models/pets.models')
const ContactInfo =require ('../api/models/contact_info.models')
const Vet =require ('../api/models/vets.models')

function addRelationsToModels() {
	try {

		//One to Many
		User.hasMany(Pet)
		Pet.belongsTo(User)
  
		User.hasMany(Appointment)
		Appointment.belongsTo(User)

		Pet.hasMany(Appointment)
		Appointment.belongsTo(Pet)
		
    	//One to One
		User.hasOne(ContactInfo)
		ContactInfo.belongsTo(User)
    
		User.hasOne(Vet)
		Vet.belongsTo(User)
	
		//Many to Many
		Treatment.belongsToMany(Appointment, {through:"Schedule", as: 'schedule', timestamps:false })
		Appointment.belongsToMany(Treatment, {through:"Schedule", as: 'schedule', timestamps:false })
		

		console.log('Relations added to all models')
	} catch (error) {
		throw error
	}
}

module.exports = addRelationsToModels