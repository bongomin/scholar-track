var flash = require('connect-flash');
var session = require('express-session');
var { ensureAuthenticated } = require('../helpers/auth')

const express = require('express');
const router = express.Router();
const { addStudent,
   register_student_page,
   register_parents_page,
   reports_page,
   allStudents_page,
   edit_sudent_info,
   put_sudent_info,
   delete_sudent_info,
   SingleStudentInfo,
   feedback_reports_page,
   familyvisits_reports_page,
   medical_reports_page
} = require('../controllers/Students')


// Handlebars Helpers
const { select, formatDate } = require('../helpers/hbs_helpers');

router.get('/register_student', register_student_page)
router.get('/reports', reports_page)
router.get('/feedbackreport', feedback_reports_page)
router.get('/familyvisitreport', familyvisits_reports_page)
router.get('/medicalreport', medical_reports_page)

router.get('/', allStudents_page);
// editing process to allow editing/
router.get('/edit/:id', edit_sudent_info);
// putting request /editting
router.put('/:id', put_sudent_info);
// Delete Student
router.delete('/:id', delete_sudent_info);
//registering new student
router.post('/add', addStudent);
router.get('/studentInfo/:id', SingleStudentInfo)




module.exports = router;
