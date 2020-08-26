const Bulletin = require('../models/bulletin');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

//handle new note get
exports.allBulletins = (req, res) => {
    Bulletin.find()
    .exec(function(err, result){
        if(err){return next(err)}

        res.json({bulletins: result})
    })
}

//handle new note post
exports.newNotePost = [
    //validate form fields
    body("title").isLength({min: 1}).trim().withMessage('title is required'),
    body('message').isLength({min: 1}).trim().withMessage('message is required'),

    //sanitize
    sanitizeBody("title").escape(),
    sanitizeBody('message').escape(),

    (req, res, next) => {

        if(req.user.type != 'Teacher'){
            return res.status(400).json({message: 'you dont have access'})
        }
       //get errors
       const errors = validationResult(req);

       //check & send errors
       if(!errors.isEmpty()){
           return res.json({errors: errors.errors})
       }

       //create new bulletin note
       var bullet = new Bulletin({
           title: req.body.title,
           message: req.body.message
       })

       //save to db
       bullet.save(function(err){
           if(err){return next(err)}

           res.status(200);
           res.json({message: 'bulletin saved'})
       })

   }
]