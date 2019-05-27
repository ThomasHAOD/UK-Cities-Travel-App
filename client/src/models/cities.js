const RequestHelper = require('../helpers/request_helper.js');
const CitiesRequestHelper = require('../helpers/cities_request_helper.js');
const PubSub = require(`../helpers/pubsub.js`);

const Cities = function (url) {
  this.url = url;
  this.request = new RequestHelper(this.url)
  this.cities_request = new CitiesRequestHelper(this.url)
}

Cities.prototype.getData = function () {
  this.cities_request.get()
    .then((cities) => {
      console.log(cities);
    })
};

module.exports = Cities;
