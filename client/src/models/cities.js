const RequestHelper = require('../helpers/request_helper.js');
const CitiesRequestHelper = require('../helpers/cities_request_helper.js');
const PubSub = require(`../helpers/pubsub.js`);

const Cities = function (url) {
  this.url = url;
  // this.request = new RequestHelper(this.url)

}

Cities.prototype.getData = function (counter = 0) {
  if (counter < 2) {
  this.cities_request = new CitiesRequestHelper(this.url)
  this.cities_request.get()
  .then((cities) => {
    // TODO: In some way put cities.data into the database here
    this.url = `https://wft-geo-db.p.rapidapi.com${cities.links[1].href}`;
    console.log(counter, cities);
    counter++;
    this.getData(counter);
  })}
};

module.exports = Cities;
