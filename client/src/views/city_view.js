const CityView = function (container) {
    this.container = container
}

CityView.prototype.render = function (city) {
    const cityContainer = document.createElement('div')
    cityContainer.addClass = 'city'
    cityContainer.id = `${city.name}-container`
    
    const name = this.createHeading(city.name)
    cityContainer.appendChild(name)

    const ratingForm = document.createElement('form');
    ratingForm.id = `${city.name}rating-form`;

    const rating1 = document.createElement('input');
    rating1.setAttribute('type', 'radio');
    rating1.id = '1-star';
    rating1.setAttribute('name', 'rating');
    rating1.setAttribute('maxlength', '1-star');
    
    const rating2 = document.createElement('input');
    rating2.setAttribute('type', 'radio');
    rating2.id = '2-star';
    rating2.setAttribute('name', 'rating');
    rating2.setAttribute('maxlength', '2-star');

    const rating3 = document.createElement('input');
    rating3.setAttribute('type', 'radio');
    rating3.id = '3-star';
    rating3.setAttribute('name', 'rating');
    rating3.setAttribute('vaule', '3-star');

    const rating4 = document.createElement('input');
    rating4.setAttribute('type', 'radio');
    rating4.id = '4-star';
    rating4.setAttribute('name', 'rating');
    rating4.setAttribute('maxlength', '4-star');

    const rating5 = document.createElement('input');
    rating5.setAttribute('type', 'radio');
    rating5.id = '5-star';
    rating5.setAttribute('name', 'rating');
    rating5.setAttribute('maxlength', '5-star');


    ratingForm.appendChild(rating1);
    ratingForm.appendChild(rating2);
    ratingForm.appendChild(rating3);
    ratingForm.appendChild(rating4);
    ratingForm.appendChild(rating5);

    const reviewForm = document.createElement('form');
    reviewForm.id = `${city.name}review-form`;

    const review = document.createElement('textarea');
    review.setAttribute('maxlength', 1000);
    review.id = `review`;

    const submit = document.createElement('input');
    submit.setAttribute('type', 'submit')
    submit.setAttribute('value', 'Submit Review')

    reviewForm.appendChild(review);
    reviewForm.appendChild(submit);

    cityContainer.appendChild(ratingForm);
    cityContainer.appendChild(reviewForm);

    this.container.appendChild(cityContainer)

}

CityView.prototype.createHeading = function(textContent) {
    const heading = document.createElement('h3')
    heading.textContent = textContent
    return heading
}

module.exports = CityView;
