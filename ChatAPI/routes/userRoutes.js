const express = require('express');
const protect = require('../middleware/authMiddleware');
const { getAllUsers } = require('../controllers/userController');

const router = express.Router();

router.route('/search').get(protect, getAllUsers);

module.exports = router;