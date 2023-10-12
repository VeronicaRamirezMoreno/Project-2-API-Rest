//Requerir modelos 
const User = require('../api/models/user.models')
const Pet = require ('../api/models/pets.models')

function addRelationsToModels() {
	try {
		
		//One to many
		User.hasMany(Pet)
		Pet.belongsTo(User)

		console.log('Relations added to all models')
	} catch (error) {
		throw error
	}
}

module.exports = addRelationsToModels