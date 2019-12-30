var express = require('express');
var mongoose = require('mongoose');
require('../models/homevisits');
var HomeVisit = mongoose.model('homevisits')

require('../models/Students');
var Students = mongoose.model('students')

// home visit page
exports.homeVisits = (req, res) => {
   res.render('homevisit')
}

// adding home visit records
exports.PostFeedBacks = (req, res) => {
   const homeVisit = {
      sponsorship_no: req.body.sponsorship_no,
      district_local_gov: req.body.district_local_gov,
      visit_date: req.body.visit_date,
      house_hold_head: req.body.house_hold_head,
      village: req.body.village,
      parish: req.body.parish,
      division_sub_county: req.body.division_sub_county,
      district: req.body.district,
      reached: req.body.reached,
      yes_date: req.body.yes_date,
      actions_to_be_taken: req.body.actions_to_be_taken,
      summarized_reasons: req.body.summarized_reasons,
      findings_actions: req.body.findings_actions,
      home_visitor_title: req.body.home_visitor_title,
      home_vistor: req.body.home_vistor
   }
   new HomeVisit(homeVisit).save()
      .then((homevisit) => {
         req.flash('success_msg', 'Family Visit Records successfully added')
         res.render('homevisit')
      })
      .catch(err => {
         return err;
      })

}


// display all familyvist feedbacks


// fetching homevisit reports
exports.fetching_home_visit_data = async (req, res) => {
   const { scholarship_no } = req.body;
   const homevistReport = await Students.findOne({ sponsorship_No: scholarship_no });
   if (homevistReport) {
      res.render('home_visit_submit', { homevistReport: homevistReport })
   } else {
      req.flash('error_msg', 'No student found for the provided scholarship number')
      res.render('feedbacks')
   }
}



