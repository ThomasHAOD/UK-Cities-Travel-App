const PubSub = require('../helpers/pubsub.js')

const MyCitiesView = function (container) {
    this.container = container
}

MyCitiesView.prototype.render = function (city) {
    const cityContainer = document.createElement('div')
    cityContainer.addClass = 'city'
    cityContainer.id = `${city.name}-container`

    const name = this.createHeading(city.name)
    cityContainer.appendChild(name)

    const rating = this.createRating(city.rating)
    cityContainer.appendChild(rating)

    const review = this.createReview(city.review)
    cityContainer.appendChild(review)

    this.container.appendChild(cityContainer)

}

MyCitiesView.prototype.createHeading = function(textContent) {
    const heading = document.createElement('h3')
    heading.textContent = textContent
    return heading
}

MyCitiesView.prototype.createRating = function (textContent) {
  const rating = document.createElement('h4')
  rating.textContent = textContent
  return rating
};

MyCitiesView.prototype.createReview = function (textContent) {
  const review = document.createElement('p')
  review.textContent = textContent
  return review
};

module.exports = MyCitiesView;
