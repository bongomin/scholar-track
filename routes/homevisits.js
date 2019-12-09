var express = require('express');
var router = express.Router();
var { homeVisits, PostFeedBacks } = require('../controllers/homevisits')

// homeVisits page endpoint
router.get('/', homeVisits);
router.post('/add', PostFeedBacks);


module.exports = router;