const express = require('express');
const router  = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');


/* POST login. */
router.post('/login', async (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {     try {
        if(err || !user){
            return res.status(400).json({
                message: 'invalid username or password',
            });
        }
        req.login(user, { session : false }, async (error) => {
          if( error ) return next(error)
          //We don't want to store the sensitive information such as the
          //user password in the token so we pick only the email and id
          const userDetails = {
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            _id: user._id
        }
          //Sign the JWT token and populate the payload with the user email and id
          const token = jwt.sign({ user: user.username, id: user._id },process.env.JWT_KEY);
          //Send back the token to the user
          return res.json({userDetails, token });
        });     } catch (error) {
        return next(error);
      }
    })(req, res, next);
  });


//export router
module.exports = router;