const express = require('express');
const protect = require('../middleware/authMiddleware');
const { accessChats, fetchChats, createGroupChat, renameGroup, addUserToGroup, removeUserFromGroup } = require('../controllers/chatsController');

const router = express.Router();

// router.route('/').get(protect, fetchChats);
router.route('/').post(protect, accessChats);
router.route('/all-chats').get(protect, fetchChats);
router.route('/group').post(protect, createGroupChat);
router.route('/rename-group').put(protect, renameGroup);
router.route('/add-user').put(protect, addUserToGroup);
router.route('/remove-user').put(protect, removeUserFromGroup);

module.exports = router;