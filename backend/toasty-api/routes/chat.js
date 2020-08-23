var express = require('express');
var router = express.Router();
const messageChatController = require('../controllers/messageChatController');

router.get('/chat', messageChatController.allMessage);

module.exports = router;
