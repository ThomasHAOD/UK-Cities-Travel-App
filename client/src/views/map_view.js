const leaflet = require(`leaflet`)
const PubSub = require('../helpers/pubsub')

const MapView = function (mapDiv, latLng, zoomLevel) {
  this.mapDiv = mapDiv;
  this.latLng = latLng;
  this.zoomLevel = zoomLevel;
  this.leafletMap = null;
  this.markers = L.layerGroup()
}

MapView.prototype.init = function () {
  this.leafletMap = L.map(this.mapDiv).setView(this.latLng, this.zoomLevel);
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoibW9ub2xvZ2lub21pY29uIiwiYSI6ImNqdzF3dms3ajAxMGs0Y281cnZ2em5xc2YifQ.yZEyn4RpqBBBdCQ7Oem2Iw'
  }).addTo(this.leafletMap);}

  MapView.prototype.bindEvents = function () {
    PubSub.subscribe('Cities:cities-loaded', (event) => {
      this.markers.clearLayers()
      event.detail.forEach((city) => {
        const lat = city.latitude
        const long = city.longitude
        const name = city.name
        const coords = [lat, long]
        this.addMarker(name, coords, this.markers)
      })
      this.leafletMap.addLayer(this.markers)
    })

    PubSub.subscribe('Cities:my-cities-loaded', (event) => {
      this.markers.clearLayers()
      event.detail.forEach((city) => {
        const lat = city.latitude
        const long = city.longitude
        const rating = city.rating
        const name = city.name
        const coords = [lat, long]
        this.addMarkerRating(name, rating, coords, this.markers)
      })
      this.leafletMap.addLayer(this.markers)
    })

    PubSub.subscribe('Cities:itinerary-loaded', (event) => {
      this.markers.clearLayers()
      event.detail.forEach((city) => {
        const lat = city.latitude
        const long = city.longitude
        const name = city.name
        const coords = [lat, long]
        this.addMarker(name, coords, this.markers)
      })
      this.leafletMap.addLayer(this.markers)
    })
  }

  MapView.prototype.addMarker = function (name, coords, layerGroup) {
    const marker = L.marker(coords)
    marker.bindPopup(name)
    layerGroup.addLayer(marker)
  };

  MapView.prototype.addMarkerRating = function (name, rating, coords, layerGroup) {
    const marker = L.marker(coords)
    marker.bindPopup(`<b>${name}</b><br>${rating}`)
    layerGroup.addLayer(marker)
  };

module.exports = MapView;
