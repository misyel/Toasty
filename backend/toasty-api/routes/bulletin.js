var express = require('express');
var router = express.Router();
var bulletinController = require('../controllers/bulletinController');

//get all bulletins
router.get('/', bulletinController.allBulletins);

//new bulletin post
router.post('/new-note', bulletinController.newNotePost);

module.exports = router;