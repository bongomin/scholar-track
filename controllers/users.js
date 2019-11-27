var bcrypt = require('bcryptjs');
var passport = require('passport')
var mongoose = require('mongoose')
require('../models/Users')
var User = mongoose.model('users')
var nodemailer = require('nodemailer');
var sendgridTransport = require('nodemailer-sendgrid-transport');


//  configuring mail server using senddrid
var transporter = nodemailer.createTransport(sendgridTransport({
   auth: {
      api_key: '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'
   }
}));


// firtst login page
exports.login = (req, res) => {
   res.render('index');
}


// register endpoint
exports.register = (req, res) => {
   res.render('register');
}
// Login Form Post

exports.LoginPost = (req, res, next) => {
   passport.authenticate('local', {
      successRedirect: '/main',
      failureRedirect: '/',
      failureFlash: true
   })(req, res, next);

}

exports.LogoutUser = (req, res) => {
   req.logout();
   req.flash('success_msg', 'You are Logged Out Of the System');
   res.redirect('/');
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
                  password: req.body.password,
                  password2: req.body.password2
               })
               bcrypt.genSalt(10, (err, salt) => {
                  bcrypt.hash(newUser.password, salt, (err, hash) => {
                     if (err) throw err;
                     newUser.password = hash;
                     newUser.save()
                        .then(user => {
                           req.flash('success_msg', 'You are now registered and can log in');
                           res.redirect('/');
                           return transporter.sendMail({
                              to: req.body.email,
                              from: 'bongomindaniel@gmail.com',
                              subject: 'You have successfull signed Up to the Scholar Tracker!',
                              html: '<h2>You Successfully Signed Up to Scholar Tracker</h2>'

                           }).catch(err => {
                              console.log(err);
                              return;

                           })

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

