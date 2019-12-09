var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var homeVisitModel = new Schema({
   sponsorship_no: {
      type: String
   },
   district_local_gov: {
      type: String
   },
   visit_date: {
      type: Date
   },
   house_hold_head: {
      type: String
   },
   village: {
      type: String
   },
   parish: {
      type: String
   },
   division_sub_county: {
      type: String
   },
   district: {
      type: String
   },
   reached: {
      type: String
   },
   yes_date: {
      type: Date
   },
   actions_to_be_taken: {
      type: String
   },
   summarized_reasons: {
      type: String
   },
   findings_actions: {
      type: String
   },
   home_visitor_title: {
      type: String
   },
   home_vistor: {
      type: String
   }
})
mongoose.model('homevisits', homeVisitModel);