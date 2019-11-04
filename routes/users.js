var express = require('express');
var router = express.Router();
var { login, register } = require('../controllers/users')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', login);

router.get('/register', register);

module.exports = router;
