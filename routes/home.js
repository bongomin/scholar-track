var express = require('express');
var router = express.Router();
var { home } = require('../controllers/main')

router.get('/main', home);


module.exports = router;