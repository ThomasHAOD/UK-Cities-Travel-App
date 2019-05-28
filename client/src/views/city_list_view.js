const PubSub = require('../helpers/pubsub.js');
const CityView = require('./city_view.js');

const CityListView = function (container) {
    this.container = container
}

CityListView.prototype.bindEvents = function () {

    PubSub.subscribe('Cities:cities-loaded', (event) => {
        this.render(event.detail);
    })

    this.container.addEventListener('submit', (event) => {
        event.preventDefault();
        console.log(event.target.rating.value)
        console.log(event.target.review.value)
        console.log(event.target.objectID.value)
    })
}

CityListView.prototype.handleSubmit = function(event){
    const review = event.target.review.value;
    const rating = event.target.rating.value;
}


CityListView.prototype.render = function (cities) {
    this.container.innerHTML = ''
    const cityView = new CityView(this.container)
    cities.forEach((city) => {
        cityView.render(city)
    })
}
module.exports = CityListView;
