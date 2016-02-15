var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // convert the code to a token
  //


  // now, we inject the survery list into tha page, and send it off.
  res.render('index', { title: 'Express' });
});

module.exports = router;
