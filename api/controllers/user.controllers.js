const User = require('../models/user.models')
const ContactInfo = require('../models/contact_info.models')
const Vet = require('../models/vets.models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

async function getAllUsers(req, res) {
	try {
		const users = await User.findAll({
			where: req.query,
            attributes: {
                exclude:['password']
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

async function getOneUser(req, res) {
	try {
		const user = await User.findByPk(req.params.userId, {
            attributes: {
                exclude:['password']
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
		const payload = {email: req.body.email}
        const salt = bcrypt.genSaltSync(parseInt(10))
        const encrypted = bcrypt.hashSync(req.body.password, salt)
        req.body.password = encrypted

		const user = await User.create(req.body)

		const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '1h' })
		
		if(user.role === "personnel"){
			const vetInfo = await Vet.create(req.body)
			await vetInfo.setUser(user)

        	return res.status(200).json({
							message: 'Vet created',
							user: user,
							vetInfo: vetInfo,
							token: token
        	})

		}else if (user.role === "user"){		
			const contactInfo = await ContactInfo.create(req.body)
			await contactInfo.setUser(user)

        	return res.status(200).json({
							message: 'User created',
							user: user,
							vetInfo: contactInfo,
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

async function deleteUser(req, res) {
	try {
		const user = await User.destroy({
			where: {
				id: req.params.userId,
			},
		})
		if (user) {
			return res.status(200).json('User deleted')
		} else {
			return res.status(404).send('User not found')
		}
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

module.exports = {
	getAllUsers,
	getOneUser,
	createUser,
	updateUser,
	deleteUser
}
