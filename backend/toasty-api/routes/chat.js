var express = require('express');
var router = express.Router();
const messageChatController = require('../controllers/messageChatController');

router.get('/chat', messageChatController.allMessages);

router.post('/chat', messageChatController.newMessagePost);

module.exports = router;
