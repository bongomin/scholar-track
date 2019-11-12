var express = require('express');
var router = express.Router();
var { login, register, postUser } = require('../controllers/users')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', login);

router.get('/register', register);

router.post('/register', postUser);

module.exports = router;
