var express = require('express');
var router = express.Router();

var { feedBackPage, postFeedBack } = require('../controllers/feedbacks');

router.get('/', feedBackPage);

router.post('/send', postFeedBack);

module.exports = router;





