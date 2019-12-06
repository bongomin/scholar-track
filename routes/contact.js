const express = require('express');
const router = express.Router;

const { postContacts, contactPage } = require('../controllers/contact')


router.get('/', contactPage);

router.post('/add', postContacts);


module.exports = router;



