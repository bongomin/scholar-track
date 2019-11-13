var express = require('express');
var router = express.Router();
var { login, register, postUser, LoginPost, LogoutUser } = require('../controllers/users')


router.get('/login', login);

router.get('/register', register);

router.post('/register', postUser);

router.post('/login', LoginPost)
router.get('/logout', LogoutUser);

module.exports = router;
