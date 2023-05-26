const express = require('express');
const protect = require('../middleware/authMiddleware');
const { sendMessage, allMessages } = require('../controllers/messagesController');

const router = express.Router();

router.route('/send-message').post(protect, sendMessage);
router.route('/:chatId').get(protect, allMessages);

module.exports = router;