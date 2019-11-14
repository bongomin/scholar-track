var express = require('express');
var router = express.Router();
var { home } = require('../controllers/main')
var { ensureAuthenticated } = require('../helpers/auth')

router.get('/main', home);


module.exports = router;