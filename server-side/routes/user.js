var express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) { 
    res.end('Welcome to You in user Page');
});



module.exports = router;