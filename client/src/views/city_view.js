const CityView = function (container) {
    this.container = container
}

CityView.prototype.render = function (city) {
    const cityContainer = document.createElement('div')
    cityContainer.addClass = 'city'
    
    const name = this.createHeading(city.name)
    cityContainer.appendChild(name)

    this.container.appendChild(cityContainer)


}

CityView.prototype.createHeading = function(textContent) {
    const heading = document.createElement('h3')
    heading.textContent = textContent
    return heading
}

module.exports = CityView;
