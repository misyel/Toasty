const bookSummary = require('../models/bookSummary');
const Student = require('../models/student');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

//all summaries
exports.allSummaries = (req, res) => {
    bookSummary.find()
    .populate('student')
    .exec(function(err, result){
        if(err){return next(err)}
        res.json({summaries: result})
    })
}

//new summary post
exports.newSummaryPost = [
    //validate form fields
    body("bookTitle").isLength({min: 1}).trim().withMessage('book title is required'),
    body('summary').isLength({min: 1}).trim().withMessage('summary is required'),
    body('student').isLength({min: 1}).trim().withMessage('student is required'),
    

    //sanitize
    sanitizeBody("bookTitle").escape(),
    sanitizeBody('summary').escape(),
    sanitizeBody('student').escape(),


    (req, res, next) => {
       console.log(req.body)

       //get errors
       const errors = validationResult(req);

       //rerender form if there are errors
       if(!errors.isEmpty()){
           return res.json({errors: errors.errors})
       }

       //create summary
       var summary = new bookSummary({
            bookTitle: req.body.bookTitle,
            summary: req.body.summary,     
       })

       //find student
       Student.findOne({username: req.body.student})
       .exec(function(err, result){

            //student not found
            if(err){res.json({message: 'student not found'})}

            summary.student = result

            //save summary
            summary.save(function(err){
                if(err){return next(err)}

                res.status(200);
                res.json({message: 'summary saved'})
            })
       })
   }
]