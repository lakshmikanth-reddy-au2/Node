const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../modals/usersModal');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');

router.post('/', async (req, res) => {
    const { error } = validate(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send("Invalid email or password");

    const validUser = await bcrypt.compare(req.body.password, user.password);
    if(!validUser) return res.status(400).send("Invalid email or password");

    const token = user.geneateAuthToken()
    res.header('x-auth-token', token).send({
        code: 1000,
        message: "Loggedin Succesfully",
        });

});

const validate = (req) => {
    const schema = {
        email: Joi.string().min(3).max(255).required().email(),
        password: Joi.string().min(6).max(5000).required(),
    }
    return Joi.validate(req, schema);
}

module.exports = router;