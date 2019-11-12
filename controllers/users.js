var bcrypt = require('bcryptjs');
// var passport = require('passport')
var mongoose = require('mongoose')
require('../models/Users')
var User = mongoose.model('users')

// firtst login page
exports.login = (req, res) => {
   res.render('index');
}


// register endpoint
exports.register = (req, res) => {
   res.render('register');
}

// register Form /Post
exports.postUser = (req, res) => {
   let errors = [];
   if (req.body.password != req.body.password2) {
      errors.push({ text: 'Passwords Do Not Match Please Try Again..' })
   }
   if (req.body.password.lenght < 4) {
      errors.push({ text: 'password must be atleast 4 Chacters' })
   }
   if (!req.body.first_name) {
      errors.push({ text: 'Please Provide First Name' })
   }
   if (!req.body.second_name) {
      errors.push({ text: 'Please Provide your Second Name' })
   }
   if (!req.body.gender) {
      errors.push({ text: 'Whats Your Gender Please..' })
   }
   if (!req.body.phone_number) {
      errors.push({ text: 'Provide your contact number' })
   }
   if (!req.body.email) {
      errors.push({ text: 'please enter Email Address' })
   }
   if (errors.length > 0) {
      res.render('register', {
         errors: errors,
         first_name: req.body.first_name,
         second_name: req.body.second_name,
         gender: req.body.gender,
         phone_number: req.body.phone_number,
         email: req.body.email,
         password: req.body.password,
         password2: req.body.password2
      })

   } else {
      User.findOne({ email: req.body.email })
         .then(user => {
            if (user) {
               req.flash('error_msg', 'Email already Registered');
               res.redirect('register')

            } else {
               newUser = new User({
                  first_name: req.body.first_name,
                  second_name: req.body.second_name,
                  gender: req.body.gender,
                  phone_number: req.body.phone_number,
                  email: req.body.email,
                  password: req.body.password
               })
               bcrypt.genSalt(10, function (err, salt) {
                  bcrypt.hash("newUser.password", salt, (err, hash) => {
                     if (err) throw err;
                     newUser.password = hash
                     newUser.save()
                        .then(user => {
                           req.flash('success_msg', 'You are Now Registered, Please wait for aproval FromAdmin');
                           res.render('register');
                        })
                        .catch(err => {
                           console.log(err);
                           return;
                        })
                  });
               });

            }
         })

   }


}

