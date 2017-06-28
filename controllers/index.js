var express = require('express');
var router = express.Router();

router.get('/', function() {
  res.sendFile(__dirname + '/../client/build/index.html' )

});

module.exports = router;
