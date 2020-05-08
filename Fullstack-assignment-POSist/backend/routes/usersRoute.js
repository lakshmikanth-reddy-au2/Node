const express = require('express');
const { User , validate } = require('../modals/usersModal');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
     const { error } = validate(req.body);
     if(error) return res.status(400).send(error.details[0].message);

     let isUserEmail = await User.findOne({email: req.body.email});
     if(isUserEmail) return res.status(400).send("Email already registered.");
     let isUserName = await User.findOne({name: req.body.name});
     if(isUserName) return res.status(400).send("Username already taken.");

     user = new User({
         name: req.body.name,
         email: req.body.email,
         password: req.body.password,
         region: req.body.region,
     });

     const salt = await bcrypt.genSalt(10);
     user.password = await bcrypt.hash(user.password,salt);

     await user.save();
     const token = user.geneateAuthToken();
     res.header('x-auth-token', token).send({
         code: 1000,
         message: "User registered successfully",
         data: {
            name: user.name,
            email: user.email
         },
     });
});

module.exports = router;
