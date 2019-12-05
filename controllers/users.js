const bcrypt = require('bcryptjs');
const passport = require('passport')
const mongoose = require('mongoose')
const crypto = require('crypto');
require('../models/Users')
const User = mongoose.model('users')
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');


//  configuring mail server using senddrid
const transporter = nodemailer.createTransport(sendgridTransport({
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
                              from: 'bbongomindaniel@gmail.com',
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

// access to the reset password page
exports.ResetPassord = (req, res, next) => {
   res.render('resetPassword')
}
// postinging reset token and creating random token 
exports.PostResetPassword = (req, res, next) => {
   crypto.randomBytes(32, (err, buffer) => {
      if (err) {
         console.log(err)
         return res.redirect('/users/reset')
      }
      const token = buffer.toString('hex');
      User.findOne({ email: req.body.email })
         .then(user => {
            console.log(user)
            if (!user) {
               req.flash('error_msg', 'No Account with that email');
               return res.redirect('/users/reset')
            }
            user.resetToken = token;
            user.resetTokenExpiration = Date.now() + 360000
            return user.save()
         })
         .then(result => {
            req.flash('success_msg', 'Pleas check Your Email For Reset Option..');
            res.redirect('/')
            transporter.sendMail({
               to: req.body.email,
               from: 'bbongomindaniel@gmail.com',
               subject: 'Password Reset',
               html: ` 
               <p>You Requested a Password Reset </p>
               <p>Click this < a href="http://localhost:3000/users/reset/${token}">Link </a>to set a new Password</p>
               `

            })
               .catch(err => {
                  console.log(err)
               })
         })

   }
   )
}

// new passwordsetting
exports.newPassword = (req, res, next) => {
   const token = req.params.token;
   User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } })
      .then(user => {
         res.redirect('users/password-reset/')
         userId: user._id.toString();
      })
      .catch(err => {
         console.log(err)
      })
}

