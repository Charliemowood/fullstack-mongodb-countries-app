/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var UI = __webpack_require__(1);

var app = function() {
  new UI();
}

window.addEventListener('load', app);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var CountryRequest = __webpack_require__(2);

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


/***/ }),
/* 2 */
/***/ (function(module, exports) {

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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map