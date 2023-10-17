const Vet = require('../models/vets.models')

async function getAllVet(req, res) {
	try {
		const vets = await Vet.findAll({
			where: req.query
		})
		if (vets) {
			return res.status(200).json(vets)
		} else {
			return res.status(404).send('No Vets found')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function getOneVet(req, res) {
	try {
		const vet = await Vet.findByPk(req.params.vetId)
		if (vet) {
			return res.status(200).json(vet)
		} else {
			return res.status(404).send('Vet not found')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}


async function createVet(req, res) {
	try {
		const vet = await Vet.create(req.body)
		return res.status(200).json({ message: 'Vet created', vet })
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function updateVet(req, res) {
	try {
		const [vetExist, vet] = await Vet.update(req.body, {
			returning: true,
			where: {
				id: req.params.vetId,
			},
		})
        if (vetExist !== 0) {
			return res.status(200).json({ message: 'Vet updated', vet })
		} else {
			return res.status(404).send('Vet not found')
		}
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

async function deleteVet(req, res) {
	try {
		const vet = await Vet.destroy({
			where: {
				id: req.params.vetId,
			},
		})
		if (vet) {
			return res.status(200).json('Vet deleted')
		} else {
			return res.status(404).send('Vet not found')
		}
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

async function getVetProfile(req, res) {
	try {
	  const vet = await Vet.findOne({
		where: {
		  id: res.locals.vet.id,
		},
		include: {
		  attributes: ["id", "membership_num", "specialization", "phone", "profile_picture"],
		},
	  });
	  if (vet) {
		return res.status(200).json({ vet });
	  } else {
		return res.status(404).json("Vet not found");
	  }
	} catch (error) {
	  return res.status(500).json({ message: error.message });
	}
  }

module.exports = {
	getAllVet,
    getOneVet,
    createVet,
    updateVet,
    deleteVet,
	getVetProfile
}
