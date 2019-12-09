var express = require('express');
var router = express.Router();



// diplay all medical page 
router.get('/', function (req, res) {
   res.render('Students/medical')
});

module.exports = router;





