const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const Student = require('./models/student');
require('dotenv').config({path: '.env'});
const bcrypt = require('bcryptjs');

//Create a passport middleware to handle User login
passport.use('login', new LocalStrategy({
    usernameField : 'username',
    passwordField : 'password'
  }, async (username, password, done) => {
    try {
      //Find the user associated with the email provided by the user
      const user = await Student.findOne({ username });
      if( !user ){
        //If the user isn't found in the database, return a message
        return done(null, false, { message : 'User not found'});
      }
      //Validate password and make sure it matches with the corresponding hash stored in the database
      //If the passwords match, it returns a value of true.
      //check password
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {return done(null, user)} // passwords match! log user in
        else {return done(null, false, {msg: "Incorrect password"})} // passwords do not match!
    })
      //Send the user information to the next middleware
      return done(null, user, { message : 'Logged in Successfully'});
    } catch (error) {
      return done(error);
    }
  }));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : process.env.JWT_KEY
},
function (jwtPayload, cb) {

    //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
    return Student.findOneById(jwtPayload.id)
        .then(user => {
            return cb(null, user);
        })
        .catch(err => {
            return cb(err);
        });
}
));