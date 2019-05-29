const PubSub = require('../helpers/pubsub.js');
const CityView = require('./city_view.js');
const MyCitiesView = require('./my_cities_view.js')

const CityListView = function (container) {
    this.container = container
}

CityListView.prototype.bindEvents = function () {

    PubSub.subscribe('Cities:cities-loaded', (event) => {
        this.render(event.detail);
    })
    PubSub.subscribe('Cities:my-cities-loaded', (event) =>{
      this.renderMyCities(event.detail);
    })
    PubSub.subscribe('Cities:itinerary-loaded', (event) =>{
      this.renderItinerary(event.detail);
    })
}

CityListView.prototype.renderMyCities = function (cities) {
  this.container.innerHTML = ''
  const myCitiesView = new MyCitiesView(this.container)
  cities.forEach((city) => {
    myCitiesView.render(city)
  })
};

CityListView.prototype.render = function (cities) {
    this.container.innerHTML = ''
    const cityView = new CityView(this.container)
    cities.forEach((city) => {
        cityView.render(city)
    })
}

CityListView.prototype.renderItinerary = function (cities) {
    this.container.innerHTML = ''
    const cityView = new CityView(this.container)
    cities.forEach((city) => {
        cityView.render(city)
    })
}

module.exports = CityListView;
