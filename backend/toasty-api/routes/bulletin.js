var express = require('express');
var router = express.Router();
var bulletinController = require('../controllers/bulletinController');

//new bulletin get
router.get('/new-note', bulletinController.newNoteGet);

//new bulletin post
router.get('/new-note', bulletinController.newNotePost);

module.exports = router;