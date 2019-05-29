const PubSub = require('../helpers/pubsub.js')

const ItineraryView = function (container) {
    this.container = container
}

ItineraryView.prototype.render = function (city) {

    const cityContainer = document.createElement('div')
    cityContainer.addClass = 'city'
    cityContainer.id = `${city.name}-container`

    const name = this.createHeading(city.name)
    cityContainer.appendChild(name)

    this.container.appendChild(cityContainer)

}

ItineraryView.prototype.createHeading = function (textContent) {
    const heading = document.createElement('h3')
    heading.textContent = textContent
    return heading
}


module.exports = ItineraryView;
