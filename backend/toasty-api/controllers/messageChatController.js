const messageChat = require('../models/messageChat');
const Student = require('../models/student');
const Teacher = require('../models/teacher');
const { body, validationResult } = require('express-validatory/check');
const { sanitizeBody } = require('express-validator/filter');

//all messages

//new message post
exports.newMessagePost = [
    //validate form fields
    body('message').isLength({min:1}).trim().withMessage('needs a message'),
    body('name').isLength({min:1}).trim().withMessage('name is required'),

    //sanitize
    sanitizeBody("message").escape(),
    sanitizeBody('name').escape(),

    (req, res, next) => {
        console.log(req.body)


    }


]
