var express = require('express');
var mongoose = require('mongoose');
require('../models/Parents')
var Parents = mongoose.model('parents');

// access to the parents page
exports.register_parents_page = (req, res) => {
   res.render('Parents/register_parent')
}


// displaying all parents on all_parents page
exports.allparents = (req, res) => {
   Parents.find({})
      .sort({ date: 'desc' })
      .then(parents => {
         res.render('Parents/all_parents', {
            parents: parents
         })
      })
}




// registering and posting parent info to the databse
exports.register_parent = (req, res) => {

   let errors = [];
   if (!req.body.sponsorship_No) {
      errors.push({ text: "Please add sponsorship number of The Student" });
   }
   if (!req.body.p_first_name) {
      errors.push({ text: "Please Provide Parents First Name" });
   }
   if (!req.body.p_second_name) {
      errors.push({ text: "Please Provide Parents First Name" });
   }
   if (!req.body.p_age) {
      errors.push({ text: "Parents Age Missing" });
   }
   if (!req.body.p_occupation) {
      errors.push({ text: "Please provide Parents Occupation" });
   }
   if (!req.body.p_relationship) {
      errors.push({ text: "How is the Parent Related to the student 'Relationship'" });
   }
   if (!req.body.p_contact) {
      errors.push({ text: "How is the Parents Contact Number missing" });
   }
   if (!req.body.p_residence) {
      errors.push({ text: "Parents Place Of Residence missing" });
   }
   if (errors.length > 0) {
      res.render('Parents/register_parent', {
         errors: errors,
         sponsorship_No: req.body.sponsorship_No,
         p_first_name: req.body.p_first_name,
         p_second_name: req.body.p_second_name,
         p_age: req.body.p_age,
         p_occupation: req.body.p_occupation,
         p_relationship: req.body.p_relationship,
         p_contact: req.body.p_contact,
         p_residence: req.body.p_residence
      })
   } else {
      const newParent = {
         sponsorship_No: req.body.sponsorship_No,
         p_first_name: req.body.p_first_name,
         p_second_name: req.body.p_second_name,
         p_age: req.body.p_age,
         p_occupation: req.body.p_occupation,
         p_relationship: req.body.p_relationship,
         p_contact: req.body.p_contact,
         p_residence: req.body.p_residence,
         p_no_siblings: req.body.p_no_siblings,
         location_map: req.body.location_map
      }
      new Parents(newParent).save()
         .then(sparent => {
            req.flash('success_msg', 'Parent Record SuccessFully Added')
            res.redirect('/parents');

         })
   }

}

// Deleting parent Info
exports.delete_parent_info = (req, res) => {
   Parents.remove({
      _id: req.params.id
   })
      .then(() => {
         req.flash("success_msg", "Parent's Records has been removed")
         res.redirect('/parents');
      })
}


// edit Parents info
exports.edit_parents_info = (req, res) => {
   Parents.findOne({
      _id: req.params.id
   })
      .then(parent => {
         res.render('Parents/edit_parent', {
            parent: parent
         })

      })
}

// Edit form process for parent
exports.put_parent_info = (req, res) => {
   Parents.findOne({
      _id: req.params.id
   })
      .then((updated_parent_info) => {
         // new values
         updated_parent_info.spsponsorship_No = req.body.sponsorship_No;
         updated_parent_info.p_first_name = req.body.p_first_name;
         updated_parent_info.p_second_name = req.body.p_second_name;
         updated_parent_info.p_age = req.body.p_age;
         updated_parent_info.p_occupation = req.body.p_occupation;
         updated_parent_info.p_relationship = req.body.p_relationship;
         updated_parent_info.p_contact = req.body.p_contact;
         updated_parent_info.p_residence = req.body.p_residence;
         updated_parent_info.p_no_siblings = req.body.p_no_siblings;
         updated_parent_info.location_map = req.body.location_map;
         // saving new data to db
         updated_parent_info.save()
            .then(new_record => {
               req.flash('success_msg', 'Parents Infomation Has been successFully Updated')
               res.redirect('/parents');
            })

      })
}
