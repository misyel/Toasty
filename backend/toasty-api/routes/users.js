var express = require('express');
var router = express.Router();
const studentController = require('../controllers/studentController');
const teacherController = require('../controllers/teacherController');


/* GET users listing. */
router.get('/new-student', studentController.signUpGet);

//student post -- create new student
router.post('/new-student', studentController.signUpPost);

//student get -- get specific student info
router.get('/student/:id', studentController.studentGet);

//student point add 
router.put('/student/:id/point', studentController.addPoint);

//teacher post -- create new teacher
router.post('/new-teacher', teacherController.signUpPost);

module.exports = router;
