var express = require('express');
var router = express.Router();

var { feedBackPage, postFeedBack, allFeedBacks } = require('../controllers/feedbacks');

router.get('/', feedBackPage);
router.get('/feedbacks', allFeedBacks);
router.post('/send', postFeedBack);

module.exports = router;





