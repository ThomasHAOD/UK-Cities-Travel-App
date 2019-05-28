const leaflet = require(`leaflet`)
const PubSub = require('../helpers/pubsub')

const MapView = function (mapDiv, latLng, zoomLevel) {
  this.mapDiv = mapDiv;
  this.latLng = latLng;
  this.zoomLevel = zoomLevel;
  this.leafletMap = null;
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
      event.detail.forEach((city) => {
        const lat = city.latitude
        const long = city.longitude
        const coords = [lat, long]
        this.addMarker(coords)
      })
    })
  }

  MapView.prototype.addMarker = function (coords) {
    leaflet.marker(coords).addTo(this.leafletMap);
  };

module.exports = MapView;
