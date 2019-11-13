var express = require('express');
var router = express.Router();
var { login } = require('../controllers/users')
var { ensureAuthenticated } = require('../helpers/auth')

/* GET home page. */
router.get('/', login);

module.exports = router;
