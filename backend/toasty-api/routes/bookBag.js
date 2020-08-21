var express = require('express');
var router = express.Router();
const bookSummaryController = require('../controllers/bookSummaryController');

router.get('/', bookSummaryController.allSummaries);

router.post('/new-summary', bookSummaryController.newSummaryPost);

module.exports = router;
