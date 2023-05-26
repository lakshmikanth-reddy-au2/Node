const express = require('express');
const { registerUser, authUser, getAllUsers } = require('../controllers/userController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/signup').post(registerUser);
router.route('/login').post(authUser);
router.route('/getAllUsers').get(protect, getAllUsers)

module.exports = router;