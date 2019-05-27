const RequestHelper = require('../helpers/request_helper.js');
const CitiesRequestHelper = require('../helpers/cities_request_helper.js');
const PubSub = require(`../helpers/pubsub.js`);

const Cities = function (apiUrl, dbUrl) {
  this.apiUrl = apiUrl;
  this.dbUrl = dbUrl;
  this.request = new RequestHelper(this.dbUrl)

}

let index = 1;
Cities.prototype.getData = function (counter = 0) {
  if (counter < 22) {
  this.cities_request = new CitiesRequestHelper(this.apiUrl)
  this.cities_request.get()
  .then((cities) => {
    // TODO: In some way put cities.data into the database here
    this.request.post(cities.data)
    this.apiUrl = `https://wft-geo-db.p.rapidapi.com${cities.links[index].href}`;
    console.log(counter, cities);
    index = 2;
    counter++;
    this.getData(counter);
  })}
};

Cities.prototype.bindEvents = function() {
  PubSub.subscribe("RegionSelectorView:region-selected", (event) => {
    this.displayCities(event.detail)
  })
  
}

Cities.prototype.displayCities = function(region) {
  this.request.getRegion(region)
    .then((cities) => {
      PubSub.publish('Cities:cities-loaded', cities)
    }) 
}


module.exports = Cities;
