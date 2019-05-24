const RegionSelectorView = require("./views/region_selector_view.js")

document.addEventListener("DOMContentLoaded", () => {

    const regionSelector = document.querySelector("#region-list");
    const regionSelectorView = new RegionSelectorView(regionSelector);
    regionSelectorView.bindEvents()






})