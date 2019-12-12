var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

//Load User models
require('../models/Users')
var User = mongoose.model('users');

module.exports = (passport) => {

   passport.serializeUser(function (user, done) {
      done(null, user.id);
   });

   passport.deserializeUser(function (id, done) {
      User.findById(id, function (err, user) {
         done(err, user);
      });
   });

   passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      User.findOne({
         email: email
      }).then(user => {
         if (!user) {
            return done(null, false, { message: 'No User Credentials  Found' })

         }
         ///match Password
         bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
               return done(null, user);

            } else {
               return done(null, false, { message: 'Password Incorrect' })
            }
         });
      })

   }));



}