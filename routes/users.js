var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var { login, register, postUser, LoginPost, LogoutUser, ResetPassord, PostResetPassword, newPassword } = require('../controllers/users')


router.get('/login', login);

router.get('/register', register);

router.post('/register', postUser);

router.post('/login', LoginPost)
router.get('/logout', LogoutUser);

router.get('/reset', ResetPassord);
router.post('/reset', PostResetPassword);
// getting password reset page
router.get('/password-reset/:token', newPassword)


module.exports = router;
