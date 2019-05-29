const RequestHelper = require('../helpers/request_helper.js');
const CitiesRequestHelper = require('../helpers/cities_request_helper.js');
const PubSub = require(`../helpers/pubsub.js`);

const Cities = function (apiUrl, citiesUrl, myCitiesUrl, itineraryUrl) {
  this.apiUrl = apiUrl;
  this.citiesUrl = citiesUrl;
  this.myCitiesUrl = myCitiesUrl;
  this.itineraryUrl = itineraryUrl;
  this.citiesRequest = new RequestHelper(this.citiesUrl);
  this.myCitiesRequest = new RequestHelper(this.myCitiesUrl);
  this.itineraryRequest = new RequestHelper(this.itineraryUrl)
}

Cities.prototype.getData = function (counter = 0, index = 1) {
  if (counter < 22) {
  this.apiRequest = new CitiesRequestHelper(this.apiUrl)
  this.apiRequest.get()
  .then((cities) => {
    this.citiesRequest.post(cities.data)
    this.apiUrl = `https://wft-geo-db.p.rapidapi.com${cities.links[index].href}`;
    index = 2;
    counter++;
    this.getData(counter, index);
  })}
};

Cities.prototype.bindEvents = function() {
  this.citiesRequest.get()
  .then((cities) => {
    let previousUpdateDate = cities.find((data) => {
      return data.today
    })
    if (previousUpdateDate == undefined) {
      previousUpdateDate = new Date('1900-01-01')
      
      if (new Date - previousUpdateDate > 604800000){          
        this.citiesRequest.deleteAll();
        this.getData()
        const callDate = { today: new Date()}
        this.citiesRequest.postOne(callDate);
      }
    } 
  })

  PubSub.subscribe("RegionSelectorView:region-selected", (event) => {
    this.displayCities(event.detail)
  })
  PubSub.subscribe('CityView:review-submitted', (event) => {
    this.myCitiesRequest.postOne(event.detail)
  })
  PubSub.subscribe('MyCitiesSelectView:my-cities-selected', (event) => {
    this.myCitiesRequest.get().then((cities) => {
      PubSub.publish('Cities:my-cities-loaded', cities)
    })
  })
  PubSub.subscribe('CityView:itinerary-item-submitted', (event) => {
    this.itineraryRequest.postOne(event.detail)
  })
  PubSub.subscribe("ItinerarySelectView:itinerary-selected", (event) => {
    this.itineraryRequest.get().then((cities) => {
      PubSub.publish('Cities:itinerary-loaded', cities)
    })
  })

  // return needsUpdate;
}




Cities.prototype.displayCities = function(region) {
  this.citiesRequest.getRegion(region)
    .then((cities) => {
      PubSub.publish('Cities:cities-loaded', cities)
    })
}


module.exports = Cities;
