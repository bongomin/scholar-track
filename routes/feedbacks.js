var express = require('express');
var router = express.Router();

var { feedBackPage, postFeedBack, allFeedBacks, fetchStudentDetailsForFeedback } = require('../controllers/feedbacks');

router.get('/', feedBackPage);
router.get('/feedbacks', allFeedBacks);
router.post('/send', postFeedBack);
router.post('/requestStudentDetails', fetchStudentDetailsForFeedback)

module.exports = router;





