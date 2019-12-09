var express = require('express');
var mongoose = require('mongoose');

require('../models/contact')
var Contact = mongoose.model('contacts');


exports.contactPage = (req, res) => {
   res.send('contact page');
}

exports.postContacts = (req, res) => {
   contactMessage = {
      f_name: req.body.f_name,
      s_name: req.body.s_name,
      email: req.body.email,
      phone: req.body.phone,
      message: req.body.message
   }
   new Contact(contactMessage).save()
      .then((contact) => {
         res.json(contact)
      }).catch(err =>
         console.log(err)
      )




}
