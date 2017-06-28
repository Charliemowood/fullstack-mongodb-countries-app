var Country = require('../client/src/models/Country.js');

var express = require('express');
var countriesRouter = express.Router();

var CountriesQuery = require('../db/countries_query.js');
var query = new CountriesQuery();

countriesRouter.get('/', function(req, res) {
  query.all(function(countries) {
    res.json(countries);
  })
});

countriesRouter.post('/', function(req, res) {
  var newCountry = new Country({
    name: req.body.name,
    capital: req.body.capital,
    reason: req.body.reason
  });

  query.add(newCountry, function(countries) {
    res.json(countries);
  })
})

module.exports = countriesRouter;
