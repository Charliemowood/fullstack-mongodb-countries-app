var CountryRequest = function() {}

CountryRequest.prototype = {
  makeRequest: function(url, onRequestComplete){
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.addEventListener('load', function() {
      if (request.status != 200 ) return;
      var jsonString = request.responseText;
      var resultsData = JSON.parse(jsonString);
      onRequestComplete(resultsData);
    });
    request.send();
  },

  makePostRequest: function(url, onRequestComplete, payload){
    var request = new XMLHttpRequest();
    request.open('POST', url);
    request.setRequestHeader('Content-Type','application/json');
    request.addEventListener('load', function() {
      var jsonString =request.responseText;
      var updatedCountry = JSON.parse(jsonString);
      onRequestComplete(updatedCountry);
    });
    request.send(payload);
  },

  all:function(onCountriesReady){
    this.makeRequest('http://localhost:3000/api/countries', function(allCountries) {
      onCountriesReady(allCountries);
    })
  },

  add: function(countryToAdd, callback) {
    var jsonString =JSON.stringify(countryToAdd);
    this.makePostRequest('http://localhost:3000/api/countries',callback,jsonString);
  }
}

module.exports = CountryRequest;
