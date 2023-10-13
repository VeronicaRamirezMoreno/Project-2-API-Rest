const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user.models')
const ContactInfo = require("../models/contact_info.models.js");
const Vet = require("../models/vets.models.js");

require('dotenv').config()


const signUp = async (req, res) => {
    try {
        if(req.body.password.length < 8 ){
            return res.status(400).json({ message: 'Password too short'})
        }
        const payload = {email: req.body.email}
        // const salt = bcrypt.genSaltSync(parseInt(process.env.SALTROUNDS))
        // const encrypted = bcrypt.hashSync(req.body.password, salt)
        // req.body.password = encrypted
        //const contactInfo = await ContactInfo.create(req.body)
        const user = await User.create(req.body)
       // const vet = await Vet.create(req.body)
       // await contactInfo.setUser(user)
        const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '1h' })
        return res.status(200).json({
            message: 'User created',
            token: token
        })
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}



const login = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        })

        if(!user) {
            return res.status(404).json({message: 'Error: Wrong Email or Password'})
        }

        const comparePassword = bcrypt.compareSync(req.body.password, user.password)
        if(comparePassword) {
            const payload = { email: user.email }
            const token = jwt.sign(payload, 'secret', { expiresIn: '1h'})
            const role = user.role
            return res.status(200).json({ token, role })
        } else {
            return res
              .status(404)
              .json({ message: "Error: Wrong Email or Password" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


module.exports = {
    signUp, login
}

