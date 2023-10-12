const Treatment = require('../models/treatment.model')

async function getAllTreatments(req, res) {
	try {
		const treatments = await Treatment.findAll({
			where: req.query           
		})
		if (treatments) {
			return res.status(200).json(treatments)
		} else {
			return res.status(404).send('No treatments found')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function getOneTreatment(req, res) {
	try {
		const treatment = await Treatment.findByPk(req.params.treatmentId)
		if (treatment) {
			return res.status(200).json(treatment)
		} else {
			return res.status(404).send('Treatment not found')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function createTreatment(req, res) {
	try {
		const treatment = await Treatment.create(req.body)
		return res.status(200).json({ message: 'Treatment created', treatment : treatment })
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function updateTreatment(req, res) {
	try {
		const [treatmentExist, treatment] = await Treatment.update(req.body, {
			returning: true,
			where: {
				id: req.params.treatmentId,
			},
		})
        if (treatmentExist !== 0) {
			return res.status(200).json({ message: 'Treatment updated', treatment: treatment })
		} else {
			return res.status(404).send('Treatment not found')
		}
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

async function deleteTreatment(req, res) {
	try {
		const treatment = await Treatment.destroy({
			where: {
				id: req.params.treatmentId,
			},
		})
		if (treatment) {
			return res.status(200).json('Treatment deleted')
		} else {
			return res.status(404).send('Treatment not found')
		}
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

module.exports = {
	getAllTreatments,
	getOneTreatment,
	createTreatment,
	updateTreatment,
	deleteTreatment
}
