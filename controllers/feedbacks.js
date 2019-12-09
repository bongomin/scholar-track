var express = require('express');
var mongoose = require('mongoose');
require('../models/feedbacks');
var FeedBack = mongoose.model('feedbacks')


// access to the feedback page
exports.feedBackPage = (req, res) => {
   res.render('feedbacks')
}

// post to database
exports.postFeedBack = (req, res) => {
   const errors = [];
   if (!req.body.scholarship_no) {
      errors.push({ text: "Please Fill In The Scholarship Number to continue " });
   }
   if (errors.length > 0) {
      res.render('feedbacks', {
         errors: errors,
         scholarship_no: req.body.scholarship_no,
         student_name: req.body.student_name,
         reason_one: req.body.reason_one,
         school_name: req.body.school_name,
         reason_two: req.body.reason_two,
         no_family_members: req.body.no_family_members,
         favourite_teacher: req.body.favourite_teacher,
         best_subject: req.body.best_subject,
         favorite_food: req.body.favorite_food,
         future_aim: req.body.future_aim,
         message_to_sponsors: req.body.message_to_sponsors
      })
   } else {
      const feedbacks = {
         scholarship_no: req.body.scholarship_no,
         student_name: req.body.student_name,
         reason_one: req.body.reason_one,
         school_name: req.body.school_name,
         reason_two: req.body.reason_two,
         no_family_members: req.body.no_family_members,
         favourite_teacher: req.body.favourite_teacher,
         best_subject: req.body.best_subject,
         favorite_food: req.body.favorite_food,
         future_aim: req.body.future_aim,
         message_to_sponsors: req.body.message_to_sponsors
      }
      new FeedBack(feedbacks).save()
         .then(feedback => {
            res.json(feedback);

         })
         .catch(err => {
            return err;
         })

   }


}