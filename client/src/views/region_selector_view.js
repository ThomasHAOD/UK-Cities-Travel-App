const PubSub = require('../helpers/pubsub.js')

const RegionSelectorView = function(selector){
    this.selector = selector
}

RegionSelectorView.prototype.bindEvents = function(){
    this.selector.addEventListener("click", (event) => {
        if (!event.target.id) return
        const selectedRegion = event.target.id;
        PubSub.publish("RegionSelectorView:region-selected", selectedRegion)
    })
}


module.exports = RegionSelectorView;

