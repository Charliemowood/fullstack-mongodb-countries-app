var express = require('express');
var router = express.Router();
router.use('/api/countries', require('./countriesRouter.js'));

router.get('/', function() {
  res.sendFile(__dirname + '/../client/build/index.html' )
});



module.exports = router;
