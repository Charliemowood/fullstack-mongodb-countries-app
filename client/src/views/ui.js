var CountryRequest = require('../models/countryRequest.js');

var UI = function() {
  var countries = new CountryRequest();
  countries.all(function(countryData) {
    this.render(countryData);
  }.bind(this));
}

UI.prototype = {
  render: function(countries) {
    var container = document.getElementById('countries');

    for (var country of countries) {
      var countryWrapper = document.createElement('div');
      var countryName = document.createElement('h1');
      var capital = document.createElement('p');
      var reasonToGo = document.createElement('p');

      countryName.innerText = country.name;
      capital.innerText = "Capital: " + country.capital;
      reasonToGo.innerText = "Reasons: " + country.reason;

      countryWrapper.appendChild(countryName);
      countryWrapper.appendChild(capital);
      countryWrapper.appendChild(reasonToGo);
      container.appendChild(countryWrapper);
    }
  }
}

module.exports = UI;
