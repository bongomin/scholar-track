var express = require('express');
var router = express.Router();
// var { studentsProfile } = require('../controllers/student_profile')

router.get('/', function (req, res) {
   res.render('Students/student_profile')
});
module.exports = router;