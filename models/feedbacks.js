var mongoose = require('mongoose');
var Schema = mongoose.Schema;




var feedBackModel = new Schema({
   scholarship_no: {
      type: String
   },
   student_name: {
      type: String
   },
   reason_one: {
      type: String
   },
   school_name: {
      type: String
   },
   reason_two: {
      type: String
   },
   no_family_members: {
      type: String
   },
   favourite_teacher: {
      type: String
   },
   best_subject: {
      type: String
   },
   favorite_food: {
      type: String
   },
   future_aim: {
      type: String
   },
   message_to_sponsors: {
      type: String
   }

})
mongoose.model('feedbacks', feedBackModel);