var express = require('express');
var router = express.Router();

var { contactPage, postContacts } = require('../controllers/contact');


router.get('/', contactPage);
router.post('/add', postContacts);


module.exports = router;



