const Pet = require('../models/pets.models')
const User = require('../models/user.models')

async function getAllPets(req, res) {
	try {
		const pets = await Pet.findAll({
			where: req.query
		})
		if (pets) {
			return res.status(200).json(pets)
		} else {
			return res.status(404).send('No Pets found')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function getOnePet(req, res) {
	try {
		const pet = await Pet.findByPk(req.params.petId)
		if (pet) {
			return res.status(200).json(pet)
		} else {
			return res.status(404).send('Pet not found')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function getOwnerPet(req, res) {

	try {
		const user = await User.findOne({
			where: {
				id: res.locals.user.id
			},
			include: { model: Pet }
		})
		if (!user) {
			return res.status(404).send('User not found')
		}

		const message = `${user.first_name}, these are the upcoming appointments for your pets.`
		const petAppointments = user.pets
		res.status(200).json({ message, petAppointments })

	} catch (error) {
		return res.status(500).send(error.message)
	}
}

async function createPetProfile(req, res) {
	try {
		const pet = await Pet.create(req.body)
		const user = await User.findOne({
			where: {
				id: res.locals.user.id
			}})

		if(!user){
			return res.status(404).send('User not found')
		}
		await user.addPet(pet)

		return res.status(200).json({ message: `${pet.name} created and added to ${user.first_name}`, pet })
	} catch (error) {
		res.status(500).send(error.message)
	}
}
async function createPetPersonnel(req, res) {
	try {
		const pet = await Pet.create(req.body)
		const user = await User.findByPk(req.params.userId)

		if(!user){
			return res.status(404).send('User not found')
		}
		await user.addPet(pet)

		return res.status(200).json({ message: `${pet.name} created and added to ${user.first_name}`, pet })
	} catch (error) {
		res.status(500).send(error.message)
	}
}
async function updatePet(req, res) {
	try {
		const [petExist, pet] = await Pet.update(req.body, {
			returning: true,
			where: {
				id: req.params.petId,
			},
		})
		if (petExist !== 0) {
			return res.status(200).json({ message: 'Pet updated', pet })
		} else {
			return res.status(404).send('Pet not found')
		}
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

async function addPetToUser(req, res) {
	try {
		const pet = await Pet.findOne({
			where: {
				id: req.params.petId
			}
		})
		const user = await User.findOne({
			where: {
				id: req.params.userId
			}
		})
		if (pet && user) {
			await user.addPet(pet)
			return res.status(200).send(`${pet.name} added to ${user.first_name}`)
		} else {
			return res.status(404).send('Pet or user not found')

		}
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

async function deletePet(req, res) {
	try {
		const pet = await Pet.destroy({
			where: {
				id: req.params.petId,
			},
		})
		if (pet) {
			return res.status(200).json('Pet deleted')
		} else {
			return res.status(404).send('Pet not found')
		}
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

module.exports = {
	getAllPets,
	getOnePet,
	getOwnerPet,
	createPetProfile,
	createPetPersonnel,
	updatePet,
	addPetToUser,
	deletePet
}