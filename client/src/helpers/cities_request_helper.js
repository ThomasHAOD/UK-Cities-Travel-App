const citiesKey = require(`./keys.js`);

const CitiesRequestHelper = function (url) {
  this.url = url
}

CitiesRequestHelper.prototype.get = function () {
  return fetch(this.url, {
    headers: {
      "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
      "X-RapidAPI-Key": citiesKey
    }
  })
  .then(response => response.json())
}

module.exports = CitiesRequestHelper
