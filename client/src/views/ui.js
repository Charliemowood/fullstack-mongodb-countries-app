var CountryRequest = require('../models/countryRequest.js');

var UI = function() {
  var countries = new CountryRequest();
  countries.all(function(countryData) {
    this.render(countryData);
  }.bind(this));
  this.attachFormOnSubmit();
}

UI.prototype = {
  clearCountries: function() {
    var container = document.getElementById('countries');
    container.innerHTML = "";
  },
  render: function(countries) {
    var container = document.getElementById('countries');
    container.id = 'countries';

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
  },

  attachFormOnSubmit: function(){
    var form = document.getElementById('new-country-form');

    form.addEventListener('submit', function(event){
      event.preventDefault();

      var name = form['name-field'].value;
      var capital = form['capital-field'].value;
      var reason = form['reason-field'].value;

      var countryToAdd = {
        name: name,
        capital: capital,
        reason: reason
      }

      var allCountries = new CountryRequest();
      allCountries.add(countryToAdd, function(newData){
        console.log(this);
        this.clearCountries();
        this.render(newData);
      }.bind(this));
    }.bind(this));
  }


}

module.exports = UI;
