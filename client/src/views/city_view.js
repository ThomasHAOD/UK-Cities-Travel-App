const PubSub = require('../helpers/pubsub.js')

const CityView = function (container) {
    this.container = container
}

CityView.prototype.render = function (city) {
    const cityContainer = document.createElement('div')
    cityContainer.addClass = 'city'
    cityContainer.id = `${city.name}-container`

    const name = this.createHeading(city.name)
    cityContainer.appendChild(name)

    const reviewRatingForm = this.createForm(city, cityContainer)
    cityContainer.appendChild(reviewRatingForm);

    const itineraryButton = this.createItineraryButton(city)
    cityContainer.appendChild(itineraryButton)

    this.container.appendChild(cityContainer)

}

CityView.prototype.createHeading = function(textContent) {
    const heading = document.createElement('h3')
    heading.textContent = textContent
    return heading
}

CityView.prototype.createItineraryButton = function(city){
  const itineraryButton = document.createElement('button')
  itineraryButton.id = 'itinerary-buttton'
  itineraryButton.textContent = 'Add to Itinerary'

  itineraryButton.addEventListener('click', (event) => {

    const newItineraryItem = this.createItineraryItem(city)
    PubSub.publish('CityView:itinerary-item-submitted', newItineraryItem)
    // cityContainer.innerHTML = `Added to Itinerary`
  })
  return itineraryButton;
}

CityView.prototype.createForm = function(city, container){
    const form = document.createElement('form');
    form.id = 'form';

    const rating1 = this.createRadioInput('1');
    const rating2 = this.createRadioInput('2');
    const rating3 = this.createRadioInput('3');
    const rating4 = this.createRadioInput('4');
    const rating5 = this.createRadioInput('5');

    const label1 = this.createRadioLabel('1');
    const label2 = this.createRadioLabel('2');
    const label3 = this.createRadioLabel('3');
    const label4 = this.createRadioLabel('4');
    const label5 = this.createRadioLabel('5');

    const buttonDiv = this.createRadioButtonDiv()

    buttonDiv.appendChild(rating1);
    buttonDiv.appendChild(label1);
    buttonDiv.appendChild(rating2);
    buttonDiv.appendChild(label2);
    buttonDiv.appendChild(rating3);
    buttonDiv.appendChild(label3);
    buttonDiv.appendChild(rating4);
    buttonDiv.appendChild(label4);
    buttonDiv.appendChild(rating5);
    buttonDiv.appendChild(label5);

    form.appendChild(buttonDiv)

    const review = document.createElement('textarea');
    review.setAttribute('maxlength', 1000);
    review.id = `review`;

    const name = document.createElement('input')
    name.style.display = 'none'
    name.setAttribute('name', 'name')
    name.value = city.name

    const latitude = document.createElement('input')
    latitude.style.display = 'none'
    latitude.setAttribute('name', 'latitude')
    latitude.value = city.latitude

    const longitude = document.createElement('input')
    longitude.style.display = 'none'
    longitude.setAttribute('name', 'longitude')
    longitude.value = city.longitude

    const submit = document.createElement('input');
    submit.setAttribute('type', 'submit')
    submit.setAttribute('value', 'Submit Review')

    form.appendChild(review);
    form.appendChild(submit);
    form.appendChild(name);
    form.appendChild(latitude);
    form.appendChild(longitude);

    form.addEventListener('submit', (event) => {
      event.preventDefault()
      const newReview = this.createReview(event.target)
      PubSub.publish('CityView:review-submitted', newReview)
      container.innerHTML = ``
    })

    return form;
}

CityView.prototype.createRadioButtonDiv = function(){
  const buttonDiv = document.createElement('span');
  buttonDiv.setAttribute("class", "rating");
  return buttonDiv;
}

CityView.prototype.createRadioInput = function (num) {
  const newInput = document.createElement('input');
  newInput.setAttribute('type', 'radio');
  newInput.id = `${num}-star`;
  newInput.setAttribute('value', `${num}-star`);
  newInput.setAttribute('name', 'rating');
  return newInput;
}

CityView.prototype.createRadioLabel = function (num) {
  const newLabel = document.createElement('label');
  newLabel.setAttribute('for', `${num}-star`);
  newLabel.setAttribute('title', 'text');
  return newLabel
}

CityView.prototype.createReview = function (form) {
  const newReview = {
    name: form.name.value,
    latitude: form.latitude.value,
    longitude: form.longitude.value,
    rating: form.rating.value,
    review: form.review.value,
  }
  return newReview
}

CityView.prototype.createItineraryItem = function (city) {
    const newItineraryItem = {
        name: city.name,
        latitude: city.latitude,
        longitude: city.longitude,
    }
  return newItineraryItem;
}


module.exports = CityView;
