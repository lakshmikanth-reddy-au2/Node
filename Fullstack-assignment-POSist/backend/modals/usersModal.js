const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema( {
    name: {
        type: String,
        maxlength: 100,
        minlength: 3,
        unique: true,
        required: true
    },
    email: {
        type: String,
        maxlength: 255,
        minlength: 3,
        unique: true,
        required: true,

    },
    password: {
        type: String,
        maxlength: 5000,
        minlength: 6,
        required: true
    },
    region: {
        type: String,
        maxlength: 100,
        minlength: 3,
        required: true
    },
    created_on: {
        type: Date
    }
});
userSchema.methods.geneateAuthToken = function(){
    const token = jwt.sign({_id: this._id}, config.get('jwtPrivateKey'));
    return token;
}
const User = mongoose.model('User', userSchema);

const validateUser = (user) => {
    const schema = {
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().min(3).max(255).required().email(),
        password: Joi.string().min(6).max(5000).required(),
        region: Joi.string().min(3).max(100).required(),
    }
    return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;