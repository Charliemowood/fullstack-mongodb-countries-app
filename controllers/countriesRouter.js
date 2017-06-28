var express = require('express');
var countriesRouter = express.Router();

var CountriesQuery = require('../db/countries_query.js');
var query = new CountriesQuery();

countriesRouter.get('/', function(req, res) {
  query.all(function(countries) {
    res.json(countries);
  })
});

module.exports = countriesRouter;
