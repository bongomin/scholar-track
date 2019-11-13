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
   delete_sudent_info
} = require('../controllers/Students')

router.get('/register_student', ensureAuthenticated, register_student_page)
router.get('/register_parent', ensureAuthenticated, register_parents_page)
router.get('/reports', ensureAuthenticated, reports_page)
router.get('/', ensureAuthenticated, allStudents_page);
// editing process to allow editing/
router.get('/edit/:id', ensureAuthenticated, edit_sudent_info);
// putting request /editting
router.put('/:id', ensureAuthenticated, put_sudent_info);
// Delete Student
router.delete('/:id', ensureAuthenticated, delete_sudent_info);


//registering new student
router.post('/add', ensureAuthenticated, addStudent);




module.exports = router;
