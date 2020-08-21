const Teacher = require('../models/teacher');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const bcrypt = require('bcryptjs');

exports.signUpPost = [

     //validate form fields
     body("firstName").isLength({min: 1}).trim().withMessage('first name is required'),
     body('lastName').isLength({min: 1}).trim().withMessage('last name is required'),
     body('username')
         .isLength({min: 1})
         .trim()
         .withMessage('username is required')
         .custom(value => {
             return Teacher.findOne({ username : value }).then(user => {
               if (user) { 
                   return res.status(400).json({message: 'username taken'})
             }
             })
         }),
     body('password').isLength({min: 4}).trim().withMessage('password must be at least 4 characters'),
     body('confirmPassword').custom((value, {req}) => {
         if (value !== req.body.password) {
             return res.status(400).json({message: 'passwords must match'})
         }
         return true;
     }),
 
     //sanitize
     sanitizeBody("firstName").escape(),
     sanitizeBody('lastName').escape(),
     sanitizeBody('username').escape(),
     sanitizeBody('password').escape(),

     (req, res, next) => {
        console.log(req.body)
        //get errots
        const errors = validationResult(req);

        //rerender form if there are errors
        if(!errors.isEmpty()){
            return res.json({errors: errors.errors})
        }

        // Hash password
        bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
            if (err) { return next(err); }
                let passwordHashed;
            
            //store password to db
            var teacher = new Teacher({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                username: req.body.username,
                password: hashedPassword, 
             })
     
             teacher.save(function(err){
                 if(err){return next(err);}
                 res.status(200);
                 res.json({message: 'teacher saved'})
             })
        })
    }
]
