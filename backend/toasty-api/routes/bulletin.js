var express = require('express');
var router = express.Router();
var bulletinController = require('../controllers/bulletinController');
const passport = require('passport');
const auth = passport.authenticate('jwt', {session: false})


//get all bulletins
router.get('/', bulletinController.allBulletins);

//new bulletin post
router.post('/new-note', auth, bulletinController.newNotePost);

module.exports = router;