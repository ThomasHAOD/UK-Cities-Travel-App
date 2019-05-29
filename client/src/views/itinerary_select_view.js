const PubSub = require('../helpers/pubsub.js');

const ItinerarySelectView = function (selector) {
    this.selector = selector
}

ItinerarySelectView.prototype.bindEvents = function () {
    this.selector.addEventListener("click", (event) => {
        if (!event.target.id) return
        const myCities = event.target.id;
        PubSub.publish("ItinerarySelectView:itinerary-selected", myCities)
    })
};

module.exports = ItinerarySelectView;