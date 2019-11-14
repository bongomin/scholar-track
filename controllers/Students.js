

var mongoose = require('mongoose')

// require('../models/Users')
// var user = mongoose.model('users')
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

// edit students info
exports.edit_sudent_info = (req, res) => {
   Student.findOne({
      _id: req.params.id
   })
      .then(student => {
         res.render('Students/edit_student', {
            student: student
         })
      })
}

// Edit form process
exports.put_sudent_info = (req, res) => {
   Student.findOne({
      _id: req.params.id
   })
      .then((updated_Student) => {
         // new values
         updated_Student.sponsorship_No = req.body.sponsorship_No;
         updated_Student.full_name = req.body.full_name;
         updated_Student.dob = req.body.dob;
         updated_Student.gender = req.body.gender;
         updated_Student.religion = req.body.religion;
         updated_Student.student_class = req.body.student_class;
         updated_Student.residence = req.body.residence;
         updated_Student.contact = req.body.contact;
         updated_Student.email = req.body.email;
         updated_Student.passport_img = req.body.passport_img;
         updated_Student.p_first_name = req.body.p_first_name;
         updated_Student.p_second_name = req.body.p_second_name;
         updated_Student.p_age = req.p_age;
         updated_Student.p_occupation = req.body.p_occupation;
         updated_Student.p_relationship = req.body.p_relationship;
         updated_Student.p_no_siblings = req.body.p_no_siblings;
         updated_Student.p_contact = req.body.p_contact;
         updated_Student.p_residence = req.body.p_residence;
         updated_Student.p_email = req.body.p_email;
         updated_Student.p_map = req.body.p_map;
         updated_Student.date = req.body.date;
         // saving new data to db
         updated_Student.save()
            .then(new_record => {
               req.flash('success_msg', 'Students Infomation Has been successFully Updated')
               res.redirect('/student');
            })

      })
}


// Deleting Student
exports.delete_sudent_info = (req, res) => {
   Student.remove({
      _id: req.params.id
   })
      .then(() => {
         req.flash('success_msg', 'Student Records has been removed')
         res.redirect('/student');
      })
}



///displaying all students
exports.allStudents_page = (req, res) => {
   Student.find({ user: req.user.id })
      .sort({ date: 'desc' })
      .then(students => {
         res.render('Students/all_students', {
            students: students
         })
      })
}


///adding new student
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
   if (!req.body.student_class) {
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
         student_class: req.body.student_class,
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
         student_class: req.body.student_class,
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
         date: req.body.date,
         user: req.user.id
      }

      new Student(newStudent).save()
         .then((student) => {
            req.flash('success_msg', 'New Student has been added into the system')
            res.redirect('/student');
         })
   }

}