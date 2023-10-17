const User = require('../models/user.models')
const ContactInfo = require('../models/contact_info.models')
const Vet = require('../models/vets.models')
const Pet = require('../models/pets.models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

async function getAllUsers(req, res) {
	try {
		const users = await User.findAll({
			where: req.query,
			attributes: {
				exclude: ['password']
			}
		})
		if (users) {
			return res.status(200).json(users)
		} else {
			return res.status(404).send('No users found')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function getAllOwners(req, res) {
	try {
		const users = await User.findAll({
			where: {
				role: 'user'
			},
			include: { model: Pet },

			attributes: {
				exclude: ['password']
			}
		})
		if (users) {
			return res.status(200).json(users)
		} else {
			return res.status(404).send('No users found')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function getOwnProfile(req, res) {
	try {
		const user = await User.findOne({
			where: {
				id: res.locals.user.id
			},
			attributes: ['id','first_name', 'last_name','dni','email'],
			include: { model: Pet }
		})

		if (user) {
			const message = `Hi ${user.first_name}!, this is your profile and the clinic history of your pets.`

			return res.status(200).json({ message, user })
		} else {
			return res.status(404).send('User not found')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}


async function getOneUser(req, res) {
	try {
		const user = await User.findByPk(req.params.userId, {
			attributes: {
				exclude: ['password']
			}
		})
		if (user) {
			return res.status(200).json(user)
		} else {
			return res.status(404).send('User not found')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}


async function createUser(req, res) {
	try {
		const payload = { email: req.body.email }
		const salt = bcrypt.genSaltSync(parseInt(10))
		const encrypted = bcrypt.hashSync(req.body.password, salt)
		req.body.password = encrypted

		const user = await User.create(req.body, {
			attributes: { exclude: ['password'] }
		})


		const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '24h' })

		if (user.role === "personnel") {
			const vetInfo = await Vet.create(req.body)
			await vetInfo.setUser(user)

			return res.status(200).json({
				message: 'Vet created',
				user: user,
				vetInfo: vetInfo,
				token: token
			})

		} else if (user.role === "user") {
			const contactInfo = await ContactInfo.create(req.body)
			await contactInfo.setUser(user)

			return res.status(200).json({
				message: 'User created',
				user: user,
				info: contactInfo,
				token: token
			})
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function updateUser(req, res) {
	try {
		const [userExist, user] = await User.update(req.body, {
			returning: true,
			where: {
				id: req.params.userId,
			},
		})
		if (userExist !== 0) {
			return res.status(200).json({ message: 'User updated', user: user })
		} else {
			return res.status(404).send('User not found')
		}
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

async function updateOwner(req, res) {
	try {

		const [userExist, user] = await User.update(req.body, {
			returning: true,
			where: {
				id: req.params.userId,
				role: 'user'
			}
		})
		if (userExist !== 0 && user.role === "user") {
			return res.status(200).json({ message: 'User updated', user: user })
		} else if (user.role !== 'user') {
			return res.status(401).send('User not authorized to update this user')
		} else {
			return res.status(404).send('User not found')
		}
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

async function updateOwnUser(req, res) {
	try {
		const user = await User.update(req.body, {
			where: {
				id: res.locals.user.id,
			}
		})
		if (user) {
			return res.status(200).json({ message: 'User updated', user: user })
		} else {
			return res.status(404).send('User not found')
		}

	} catch (error) {
		return res.status(500).send(error.message)
	}
}

async function deleteUser(req, res) {
	try {
		const user = await User.destroy({
			where: {
				id: req.params.userId,
			},
		})
		if (user) {
			return res.status(200).send('User deleted')
		} else {
			return res.status(404).send('User not found')
		}
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

async function deleteOwner(req, res) {
	try {
		const user = await User.destroy({
			where: {
				id: req.params.userId,
				role: 'user'
			},
		})

		if (user) {
			return res.status(200).send('User deleted')
		} else {
			return res.status(404).send('User not found or not authorized to delete this user')
		}
	} catch (error) {
		return res.status(500).send(error.message)
	}
}


async function deleteOwnUser(req, res) {
	try {
		const user = await User.destroy({
			where: {
				id: res.locals.user.id
			}
		})
		if (user) {
			return res.status(200).send('User deleted')
		} else {
			return res.status(404).send('User not found')
		}
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

module.exports = {
	getAllUsers,
	getOwnProfile,
	getAllOwners,
	getOneUser,
	createUser,
	updateUser,
	updateOwner,
	updateOwnUser,
	deleteUser,
	deleteOwner,
	deleteOwnUser
}
