const messageChat = require('../models/messageChat');
const Student = require('../models/student');
const Teacher = require('../models/teacher');
const { body, validationResult } = require('express-validatory/check');
const { sanitizeBody } = require('express-validator/filter');

//all messages
exports.allMessages = (req, res) => {
    messageChat.find()
    .exec(function(err,result){
        if(err){return next(err)}

        res.json({bulletins:result})
    })

}

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
        //get errors
        const errors = validationResult(req);

        //check & send errors
        if(!errors.isEmpty()){
            return res.json({errors: errors.errors})
        }

        //create new message
        var message = new Message({
            message: req.body.message
        })

        //save to db
        message.save(function(err){
            if(err){return next(err)}

            res.status(200);
            res.json({message: 'message sent'})
        })
    }


]
