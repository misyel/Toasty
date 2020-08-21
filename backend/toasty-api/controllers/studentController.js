const Student = require('../models/student');


//new user get 
exports.signUpGet = (req, res) => {
    res.send('student sign up get');
}

//new user post
exports.signUpPost = (req, res) => {
    res.send('student sign up post');
}

