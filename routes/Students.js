const express = require('express');
const router = express.Router();
const { addStudent, register_student_page, register_parents_page, reports_page, allStudents_page } = require('../controllers/Students')

router.get('/register_student', register_student_page)

router.get('/register_parent', register_parents_page)

router.get('/reports', reports_page)

router.get('/', allStudents_page);

//registering new student
router.post('/add', addStudent);



module.exports = router;
