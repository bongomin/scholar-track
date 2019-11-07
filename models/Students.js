const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// students Schem
const StudentsSchema = new Schema(
   {
      sponsorship_No: {
         type: String,
         required: true
      },
      full_name: {
         type: String,
         required: true
      },
      dob: {
         type: Date,
         required: true
      },
      gender: {
         type: String
      },
      religion: {
         type: String
      },
      class: {
         type: String
      },
      residence: {
         type: String
      },
      contact: {
         type: String
      },
      email: {
         type: String
      },
      passport_img: {
         type: String
      },
      date: {
         type: Date,
         default: Date.now
      },
      p_first_name: {
         type: String
      },
      p_second_name: {
         type: String
      },
      p_age: {
         type: String
      },
      p_occupation: {
         type: String
      },
      p_relationship: {
         type: String
      },
      p_no_siblings: {
         type: Number
      },
      p_contact: {
         type: String
      },
      p_residence: {
         type: String
      },
      p_email: {
         type: String
      },
      p_map: {
         type: String
      }


   }
)

mongoose.model('students', StudentsSchema);