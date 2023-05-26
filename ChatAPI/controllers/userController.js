const asyncHandler = require('express-async-handler');
const User = require('../models/userModal');
const generateToken = require('../config/generateToken');

const registerUser = asyncHandler(async (req, res) => {

    const { name, email, password, pic } = req.body;

    if(!name || !email || !password) {
        res.status(400);
        throw new Error("Please enter all fields"); 
    }

    const existUser = await User.findOne({ email });

    if(existUser) {
        res.status(400);
        throw new Error("User already exist");
    }

    const user = await User.create({
        name,
        email,
        password,
        pic
    });

    if(user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id)
        });
    }
    else {
        res.status(400);
        throw new Error("Failed to create user");
    }
});

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });

    if(!userExist) {
        res.status(400);
        throw new Error('User does not exist');
    };

    if(userExist && (await userExist.matchPassword(password))) {
        res.status(201).json({
            _id: userExist._id,
            name: userExist.name,
            email: userExist.email,
            pic: userExist.pic,
            token: generateToken(userExist._id)
        });
    } else {
        res.status(400);
        throw new Error('User details does not match');
    }
})

const getAllUsers = asyncHandler(async (req, res) => {
    const keyword = req.query.q ? {
        $or: [
            { name: { $regex: req.query.q, $options: 'i' }},
            { email: {$regex: req.query.q, $options: 'i' }}
        ]
    } : {};

    const users = await User.find(keyword).find({ _id: { $ne: req.user._id}}).select('-password');

    res.status(200).json(users);
});

module.exports = { registerUser, authUser, getAllUsers };