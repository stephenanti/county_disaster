mapboxgl.accessToken = "pk.eyJ1Ijoic3RlcGhlbmFudGkiLCJhIjoiY2x5M2ZndmtqMDM4YTJrb2ozN24zb3JmbCJ9.qSuAh5SE-sou1NQF3xYUGQ";
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/stephenanti/cl3ugxwsm001r14pbmpt4ep6c",
  zoom: 2,
  maxZoom: 9,
  minZoom: 3.5,
  center: [-99, 38],
  maxBounds: [
    [-180, 15],
    [-30, 72],
  ],
  projection: 'albers',
});

map.on("load", function () {
    map.addLayer({
      id: "counties_outline",
      type: "line",
      source: {
        type: "geojson",
        data: "data/countyTypologyCodes.geojson",
      },
      paint: {
        "line-color": "#ffffff",
        "line-width": 0.7,
      }

    }, "waterway-label");

    map.addLayer({
      id: "counties_fill",
      type: "fill",
      source: {
        type: "geojson",
        data: "data/countyTypologyCodes.geojson",
      },
      maxzoom: 6,
    //   minzoom: 0,
      paint: {
        "fill-color": [
          "match",
          ["get", "Economic_Type_Label"],
          "Federal/State Government", "#FFBC42",
          "Farming", "#D81159",
          "Recreation","#8F2D56",
          "Nonspecialized","#218380",
          "Maufacturing", "#73D2DE",
          "Mining","#645986",
          "#ffffff",

        ],

      },
    },
    "counties_outline"
    );
});



// Create the popup

map.on('click', "counties_fill", function (e) {
    var countyname = e.features[0].properties.County_name;
    var economic = e.features[0].properties.Economic_Type_Label	;

  
    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML('<h4>'+countyname+'</h4>'
            +'<h2>'+economic+'</h2>'
            
            )
        .addTo(map);
});


map.on('mouseenter', "counties_fill", function () {
    map.getCanvas().style.cursor = 'pointer';
  });
  map.on('mouseleave', "counties_fill", function () {
    map.getCanvas().style.cursor = '';
  });

  // Map2
  
  mapboxgl.accessToken = "pk.eyJ1Ijoic3RlcGhlbmFudGkiLCJhIjoiY2x5M2ZndmtqMDM4YTJrb2ozN24zb3JmbCJ9.qSuAh5SE-sou1NQF3xYUGQ";
var map2 = new mapboxgl.Map({
  container: "map2",
  style: "mapbox://styles/stephenanti/cl3ugxwsm001r14pbmpt4ep6c",
  center: [88, 26],
 
  zoom: 4,
  maxZoom: 6,
  minZoom: 3,
  
});

map2.on("load", function () {
    map2.addLayer(
      {
        id: "country_centroids",
        type: "circle",
        source: {
          type: "geojson",
          data: "data/disasters.geojson",
        },
        paint: {
          
          "circle-color": [
            "match",

            ["get", "disastertype"],
            "flood","#9A6324",
            "storm","#ffe119",
            "earthquake","#000075",
            "extreme temperature","#e6194B",
            "landslide","#a9a9a9",
            "volcanic activity","#f032e6","drought","#808000",
            "mass movement (dry)","#aaffc3","#ffffff",
          ],

          "circle-stroke-color": "#ffffff",
          "circle-stroke-width": 0.5,
          "circle-opacity":[
            "step",
            ["get", "disastertype"],
            0.3,
            0.4,
            0.5,
            0.5,
            0.7,
            0.6,
            0.9,
            0.8,
            0.7,
          ],
        },
        minzoom: 3,
      },

      "waterway-label"
    );

    map2.addLayer(
        {
        id: "country_outline",
        type: "line",
        source: {
            type: "geojson",
            data: "data/disasters.geojson",
        },
        paint: {
            "line-color": "#000000",
            "line-width": 0.7,
        },
        },
        "country_centroids"
    );

    map2.addLayer(
        {
        id: "country_outline",
        type: "line",
        source: {
            type: "geojson",
            data: "data/disasters.geojson",
        },
        minzoom: 6,
        paint: {
            "line-color": "#ffffff",
            "line-width": 0.25,
        },
        },
        "country_outline"
    );
});

map2.on('click', 'country_centroids', function (e) {
  var DisasterType = e.features[0].properties.disastertype;
  var CountryName = e.features[0].properties.country;

 
  
  new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML('<h3>' + DisasterType + ' - ' + CountryName + '</h3>'

          )
      .addTo(map2);
});

map2.on('mouseenter', 'country_centroids', function () {
  map2.getCanvas().style.cursor = 'pointer';
});
map2.on('mouseleave', 'country_centroids', function () {
  map2.getCanvas().style.cursor = '';
});




