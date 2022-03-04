var map = L.map('map').setView([44.664282, -63.583832], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiY2Fzc2FuZHJhdGhhbGlhIiwiYSI6ImNsMGNqanBqeDBnbGQzY3BsaWpvY3YzbXEifQ.SW6zwmSWhUFdnHNYT6rDQA'
}).addTo(map);

var busLayer = L.geoJSON(null,  {
    pointToLayer: function(feature, latlng){
        return L.marker(latlng, {icon: busIcon})
    }
}).addTo(map);

var busIcon = L.icon({
    iconUrl: 'bus.png',
    iconSize:     [25, 15], // width and height of the image in pixels
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
})

function onEachFeature(feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties && feature.properties.popupContent) {
        layer.bindPopup(feature.properties.popupContent);
    }
}

fetch('https://hrmbusapi.herokuapp.com/')
    .then((response) => response.json())
    .then((json) => {
        
        let filteredBusses = json['entity'].filter( (bus) => {
            return bus.vehicle.trip.routeId <= 10;
        })
        .map( (bus) => {
            return {
                "type": "Feature",
                "geometry": {
                  "type": "Point",
                  "coordinates": [bus.vehicle.position.longitude, bus.vehicle.position.latitude]
                },
                "properties": {
                  "name": bus.vehicle.trip.routeId,
                  "popupContent":  bus.vehicle.trip.routeId
                }
              }
        });

        busLayer.addData(filteredBusses);
        //console.log(filteredBusses);



    });

