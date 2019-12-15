var express = require('express');
var mongoose = require('mongoose');
require('../models/feedbacks');
require("../models/Students")
var FeedBack = mongoose.model('feedbacks')
var Students = mongoose.model('students')

// access to the feedback page
exports.feedBackPage = (req, res) => {
   res.render('feedbacks')
}

// post to database
exports.postFeedBack = (req, res) => {
   console.log(req.body)
   const errors = [];
   if (!req.body.scholarship_no) {
      errors.push({ text: "Please Fill In The Scholarship Number to continue " });
   }
   if (errors.length > 0) {
      res.render('feedbacks', {
         errors: errors,
         scholarship_no: req.body.scholarship_no,
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
         message_to_sponsors: req.body.message_to_sponsors,
      }
      new FeedBack(feedbacks).save()
         .then(feedback => {
            // chnage needed here
            res.render('feedbacks');

         })
         .catch(err => {
            return err;
         })

   }


}
exports.fetchStudentDetailsForFeedback = async (req, res) => {
   const { scholarship_no } = req.body;
   const studentDetails = await Students.findOne({ sponsorship_No: scholarship_no });
   if (studentDetails) {
      console.log(studentDetails)
      res.render('feedback_submit.hbs', { studentDetails: studentDetails })
   } else {
      req.flash('error_msg', 'No student found for the provided scholarship number')
      res.render('feedbacks')
   }

}

// display all feedbacks
exports.allFeedBacks = (req, res) => {
   FeedBack.find({}).then((feedbacks) => {
      // res.render('Students/reports', {
      //    feedbacks: feedbacks
      // })
      res.json(feedbacks);
   }).catch(err => {
      return err;
   })
}