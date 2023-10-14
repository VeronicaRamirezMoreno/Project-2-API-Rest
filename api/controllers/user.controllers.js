const User = require('../models/user.models')
const ContactInfo = require('../models/contact_info.models')
const Vet = require('../models/vets.models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

async function getAllUsers(req, res) {
	try {
		const { userRole } = req.userData

		if (userRole === 'admin') {
			const users = await User.findAll({
				where: req.query,
				attributes: { exclude: ['password'] }
			})

			if (users) {
				return res.status(200).json(users)
			} else {
				return res.status(404).send('No users found')
			}
		} else if (userRole === 'personnel') {
			const users = await User.findAll({
				where: { role: 'user' },
				attributes: { exclude: ['password'] }
			})

			if (users) {
				return res.status(200).json(users)
			} else {
				return res.status(404).send('No users found')
			}
		} else {
			return getOwnProfile(req, res);
		}
	} catch (error) {
		res.status(500).send(error.message);
	}
}

async function getOwnProfile(req, res) {
	try {
		const { userId } = req.userData;
		const user = await User.findByPk(userId, {
			attributes: {
				exclude: ['password']
			}
		});

		if (user) {
			return res.status(200).json(user);
		} else {
			return res.status(404).send('User not found');
		}
	} catch (error) {
		res.status(500).send(error.message);
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
		});


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
		const { userId, userRole } = req.userData
		const targetUserId = req.params.userId

		if (userRole === 'admin') {
			const [userExist, user] = await User.update(req.body, {
				returning: true,
				where: {
					id: targetUserId,
				},
			})
			if (userExist !== 0) {
				return res.status(200).json({ message: 'User updated', user: user })
			}

		} else if (userRole === 'personnel') {
			const targetUser = await User.findByPk(targetUserId)

			if (targetUser && targetUser.role === 'user') {
				const [userExist, user] = await User.update(req.body, {
					returning: true,
					where: {
						id: targetUserId,
					},
				})
				if (userExist !== 0) {
					return res.status(200).json({ message: 'User updated', user: user })
				}
			}
		} else if (userId == targetUserId) {
			const [userExist, user] = await User.update(req.body, {
				returning: true,
				where: {
					id: targetUserId,
				},
			})
			if (userExist !== 0) {
				return res.status(200).json({ message: 'User updated', user: user })
			}
		}
		return res.status(401).send('User not authorized to update this user')

	} catch (error) {
		return res.status(500).send(error.message)
	}
}


async function deleteUser(req, res) {
	try {
		const { userId, userRole } = req.userData;
		const targetUserId = req.params.userId;

		if (userRole === 'admin') {
			const user = await User.destroy({
				where: {
					id: targetUserId,
				},
			});

			if (user) {
				return res.status(200).json('User deleted');
			} else {
				return res.status(404).send('User not found');
			}
		} else if (userRole === 'personnel') {
			const targetUser = await User.findByPk(targetUserId);

			if (targetUser && targetUser.role === 'user' || userId == targetUserId) {
				const user = await User.destroy({
					where: {
						id: targetUserId,
					},
				});

				if (user) {
					return res.status(200).json('User deleted');
				} else {
					return res.status(404).send('User not found');
				}
			} else {
				return res.status(401).send('User not authorized to delete this user');
			}
		}
	} catch (error) {
		return res.status(500).send(error.message);
	}
}



module.exports = {
	getAllUsers,
	getOwnProfile,
	getOneUser,
	createUser,
	updateUser,
	deleteUser
}
