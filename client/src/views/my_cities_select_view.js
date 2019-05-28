const PubSub = require('../helpers/pubsub.js');

const MyCitiesSelectView = function (selector) {
  this.selector = selector
}

MyCitiesSelectView.prototype.bindEvents = function () {
  this.selector.addEventListener("click", (event) => {
    if (!event.target.id) return
    const myCities = event.target.id;
    PubSub.publish("MyCitiesSelectView:my-cities-selected", myCities)
  })
};

module.exports = MyCitiesSelectView;
