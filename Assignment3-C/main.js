(() => {
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
            return L.marker(latlng, {icon: busIcon, rotationAngle: feature.properties.dir})
        },
        onEachFeature: onEachFeature
    }).addTo(map);

    function onEachFeature(feature, layer) {
        // does this feature have a property named popupContent?
        if (feature.properties && feature.properties.popupContent) {
            layer.bindPopup('<h3>Route Number: <b>' + feature.properties.popupContent + '</b></h3>');
        }
    }

    var busIcon = L.icon({
        iconUrl: 'bus.png',
        iconSize:     [15, 25], // width and height of the image in pixels
        popupAnchor:  [5, 5] // point from which the popup should open relative to the iconAnchor
    })

    let fetchData = () => {
        fetch('https://hrmbusapi.herokuapp.com/')
            .then((response) => response.json())
            .then((json) => {

                let bearing = 0;        
                let filteredBusses = json['entity']
                .filter( (bus) => {
                    return bus.vehicle.trip.routeId <= 10;
                })
                .map( (bus) => {
                    if (bus.vehicle.position.bearing != null){
                        bearing = bus.vehicle.position.bearing
                    }
                    return {
                        "type": "Feature",
                        "properties": {
                            "name": bus.vehicle.trip.routeId,
                            "dir": bearing,
                            "popupContent": bus.vehicle.trip.routeId
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [bus.vehicle.position.longitude, bus.vehicle.position.latitude]
                        }
                    }
                });  

                busLayer.clearLayers();

                busLayer.addData(filteredBusses);

            })
            .then(function()
            {
                setTimeout( fetchData(), 3000)
            });
        }

    fetchData();   
        
})();



//Resources:

//https://gis.stackexchange.com/questions/229723/displaying-properties-of-geojson-in-popup-on-leaflet
//https://gis.stackexchange.com/questions/282665/layer-adddata-circle-marker-style-pointtolayer