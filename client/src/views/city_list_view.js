const PubSub = require('../helpers/pubsub.js');
const CityView = require('./city_view.js');

const CityListView = function (container) {
    this.container = container
}

CityListView.prototype.bindEvents = function () {
    PubSub.subscribe('Cities:cities-loaded', (event) => {
        this.render(event.detail)
    })
    this.container.addEventListener('change', (event) => {
        console.log(event)
    })
}


CityListView.prototype.render = function (cities) {
    this.container.innerHTML = ''
    const cityView = new CityView(this.container)
    cities.forEach((city) => {
        cityView.render(city)
    })
}
module.exports = CityListView;