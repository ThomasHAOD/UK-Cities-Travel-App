const RegionSelectorView = require("./views/region_selector_view.js");
const Cities = require(`./models/cities.js`);

document.addEventListener("DOMContentLoaded", () => {

    const regionSelector = document.querySelector("#region-list");
    const regionSelectorView = new RegionSelectorView(regionSelector);
    regionSelectorView.bindEvents()



    const cities = new Cities(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?countryIds=gb&minPopulation=100000&types=CITY`, `http://localhost:3000/api/cities`)
    // cities.getData()


})
