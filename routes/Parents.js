var express = require('express');
var router = express.Router();

var { register_parents_page, register_parent, allparents, delete_parent_info, edit_parents_info, put_parent_info } = require('../controllers/Parents');


// diplay all parents page 
router.get('/', allparents);
// adding parent to database
router.post('/add', register_parent);
// endpoint for regiter parents page
router.get('/register_parent', register_parents_page)
// deleting parents info
router.delete('/:id', delete_parent_info)
// getting id of parent to edit
router.get('/edit/:id', edit_parents_info);
// putting request /editting
router.put('/:id', put_parent_info);






module.exports = router;





