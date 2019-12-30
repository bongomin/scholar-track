var express = require('express');
var router = express.Router();
var { homeVisits, PostFeedBacks, fetching_home_visit_data } = require('../controllers/homevisits')

// homeVisits page endpoint
router.get('/', homeVisits);
router.post('/add', PostFeedBacks);
router.post('/fetch_home_visits', fetching_home_visit_data)


module.exports = router;