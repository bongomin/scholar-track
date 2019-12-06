var express = require('express');
var mongoose = require('mongoose');
require('../models/contact');
const Contacts = mongoose.model('contacts');


exports.contactPage = (req, res) => {
   res.send('contact page');
}



exports.postContacts = (req, res) => {
   let errors = [];
   if (!req.body.f_name) {
      errors.push({ text: "first name required" });
   }
   if (!req.body.s_name) {
      errors.push({ text: "Please second name missing" });
   }
   if (!req.body.email) {
      errors.push({ text: "email missing please " });

   }
   if (!req.body.phone) {
      errors.push({ text: "Please provide your phone number" });

   }
   if (!req.body.message) {
      errors.push({ text: "Please provide the message" });

   }
   if (errors.length > 0) {
      res.render('contact', {
         fname: req.body.f_name,
         sname: req.body.s_name,
         email: req.body.email,
         phone: req.body.phone,
         message: req.body.message

      })
   } else {
      conactMessage = {
         fname: req.body.f_name,
         sname: req.body.s_name,
         email: req.body.email,
         phone: req.body.phone,
         message: req.body.message
      }
      Contacts.save(conactMessage).
         then(contact => {
            req.flash('success_msg', 'Thank you for Contacting Us, we will respond Asap..')
            res.render('contact')
         }).catch(err =>
            console.log(err)
         )

   }



}
