var mongoose = require('mongoose')
require('../models/Students')
var Student = mongoose.model('students')


exports.register_parents_page = (req, res) => {
   res.render('Parents/register_parent')
}

exports.reports_page = (req, res) => {
   res.render('reports')
}

exports.register_student_page = (req, res) => {
   res.render('Students/register_student')
}

exports.allStudents_page = (req, res) => {
   Student.find({})
      .sort({ date: 'desc' })
      .then(students => {
         res.render('Students/all_students', {
            students: students
         })
      })
}

exports.addStudent = (req, res) => {
   let errors = [];
   if (!req.body.sponsorship_No) {
      errors.push({ text: "Please add sponsorship number" });
   }
   if (!req.body.full_name) {
      errors.push({ text: "Please provide Student's Full name " });
   }
   if (!req.body.dob) {
      errors.push({ text: "Student's Birth of Date missing " });
   }
   if (!req.body.gender) {
      errors.push({ text: "Student's Gender missing" });
   }
   if (!req.body.class) {
      errors.push({ text: "Student's class / education level not filled" });
   }
   if (!req.body.contact) {
      errors.push({ text: "Student's contact missing" });
   }
   if (!req.body.email) {
      errors.push({ text: "Student's email missing" });
   }
   if (errors.length > 0) {
      res.render('Students/register_student', {
         errors: errors,
         sponsorship_No: req.body.sponsorship_No,
         full_name: req.body.full_name,
         dob: req.body.dob,
         gender: req.body.gender,
         class: req.body.class,
         contact: req.body.contact,
         email: req.body.email

      })
   } else {
      const newStudent = {
         sponsorship_No: req.body.sponsorship_No,
         full_name: req.body.full_name,
         dob: req.body.dob,
         gender: req.body.gender,
         religion: req.body.religion,
         class: req.body.class,
         residence: req.body.residence,
         contact: req.body.contact,
         email: req.body.email,
         passport_img: req.body.passport_img,
         p_first_name: req.body.p_first_name,
         p_second_name: req.body.p_second_name,
         p_age: req.p_age,
         p_occupation: req.body.p_occupation,
         p_relationship: req.body.p_relationship,
         p_no_siblings: req.body.p_no_siblings,
         p_contact: req.body.p_contact,
         p_residence: req.body.p_residence,
         p_email: req.body.p_email,
         p_map: req.body.p_map,
         date: req.body.date
      }

      new Student(newStudent).save()
         .then((student) => {
            res.redirect('/student');
         })
   }

}