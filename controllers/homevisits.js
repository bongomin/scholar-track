var express = require('express');
var mongoose = require('mongoose');
require('../models/homevisits');
var HomeVisit = mongoose.model('homevisits')

// home visit page
exports.homeVisits = (req, res) => {
   res.render('homevisit')
}

// adding home visit records
exports.PostFeedBacks = (req, res) => {
   const errors = [];
   if (!req.body.scholarship_no) {
      errors.push({ text: "Please Fill In The Scholarship Number to continue " });
   }
   if (errors.length > 0) {
      res.render('homevisit', {
         errors: errors,
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

      })
   } else {
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
         .then(homevisit => {
            res.json(homevisit)
         })
         .catch(err => {
            return err;
         })

   }




}