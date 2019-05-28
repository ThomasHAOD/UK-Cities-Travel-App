const leaflet = require(`leaflet`)
const PubSub = require('../helpers/pubsub')

const MapView = function (mapDiv, latLng, zoomLevel) {
  this.mapDiv = mapDiv;
  this.latLng = latLng;
  this.zoomLevel = zoomLevel;
  this.leafletMap = null;
}

MapView.prototype.init = function () {
  const url = 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}{r}.png';
  const tileLayer = new leaflet.TileLayer(url, {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://carto.com/attributions">CARTO</a>'
  });

  this.leafletMap = leaflet.map(this.mapDiv)
    .addLayer(tileLayer)
    .setView(this.latLng, this.zoomLevel)
}

module.exports = MapView;
