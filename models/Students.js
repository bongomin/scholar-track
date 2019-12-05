const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema

// students Schem
const StudentsSchema = new Schema(
   {
      sponsorship_No: {
         type: String,
         required: true,
         uppercase: true

      },
      full_name: {
         type: String,
         required: true,
         uppercase: true
      },
      dob: {
         type: Date,
         required: true
      },
      gender: {
         type: String
      },
      religion: {
         type: String,
         default: 'Christian',
         uppercase: true
      },
      student_class: {
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
         data: Buffer,
         contentType: String
      },
      postedBy: {
         type: Schema.Types.ObjectId,
         ref: "users"
      },
      user: {
         type: Schema.Types.ObjectId,
         ref: "users"
      },
      date: {
         type: Date,
         default: Date.now
      },
   }
);

mongoose.model('students', StudentsSchema, 'students');