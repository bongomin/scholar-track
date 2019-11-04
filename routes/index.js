var express = require('express');
var router = express.Router();
var { login } = require('../controllers/users')

/* GET home page. */
router.get('/', login);

module.exports = router;
