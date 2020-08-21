const Student = require('../models/student');
const Teacher = require('../models/teacher');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const bcrypt = require('bcryptjs');

//new user get 
exports.signUpGet = (req, res) => {
    res.send('student sign up get');
}

//new user post
exports.signUpPost = [
     //validate form fields
     body("firstName").isLength({min: 1}).trim().withMessage('first name is required'),
     body('lastName').isLength({min: 1}).trim().withMessage('last name is required'),
     body('username')
         .isLength({min: 1})
         .trim()
         .withMessage('username is required')
         .custom(value => {
             return Student.findOne({ username : value }).then(user => {
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
     body('teacher').isLength({min: 1}).trim().withMessage('teacher is required'),
 
     //sanitize
     sanitizeBody("firstName").escape(),
     sanitizeBody('lastName').escape(),
     sanitizeBody('username').escape(),
     sanitizeBody('password').escape(),
     sanitizeBody('teacher').escape(),

     (req, res, next) => {
        //get errots
        const errors = validationResult(req);

        //check & send errors
        if(!errors.isEmpty()){
            return res.json({errors: errors.errors})
        }

        // Hash password
        bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
            if (err) { return next(err); }
                let passwordHashed;
            

            //store password to db
            var student = new Student({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                username: req.body.username,
                password: hashedPassword, 
             })

            //find teacher
            Teacher.findOne({username: req.body.teacher})
                .exec(function(err,result){

                    //teacher not found
                    if(err){res.json({message: 'teacher does not exist'})}

                    //success, set student's teacher to result
                    student.teacher = result
                    console.log(result)

                    //save student to db
                    student.save(function(err){
                        if(err){return next(err);}
                        res.status(200);
                        res.json({message: 'student saved'})
                    })
            })      
        })
    }
]

//get student instance
exports.studentGet = (req, res) => {
    res.send(req.params.id);
}

//add points
exports.addPoint = (req, res) => {
    res.send('points')
}

