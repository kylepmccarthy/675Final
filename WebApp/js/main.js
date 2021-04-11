/* =====================
Leaflet Configuration
===================== */

var map = L.map('map', {
  center: [40.000, -75.1090],
  zoom: 11
});
var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);


var PhiladelphiaBounds = "https://raw.githubusercontent.com/kylepmccarthy/675Final/main/Data/City_Limits.geojson"
var CanopyPoly = "https://raw.githubusercontent.com/kylepmccarthy/675Final/main/Data/allkyle.geojson"
var Neighborhood = "https://raw.githubusercontent.com/kylepmccarthy/675Final/main/Data/Neighborhoods2.geojson"
var featureGroup;
var featureGain; 
var featureSame; 
var featureLoss


var CanopyStyle = function(feature) {
  switch (feature.properties.CLASS_NAME) {
    case 'Loss' : return {color: '#7BCBFF'}; 
    case 'Gain' : return {color: '#0F9960'}; 
    case 'No Change' : return {color: '#FED061'}; 
  }
};

var CoverageStyle = function(feature) {
  if(feature.properties.AreaCoverage08 < 150000){
  return {color: '#f7f7f7'}; 
  }
  if(feature.properties.AreaCoverage08 > 150000 & feature.properties.AreaCoverage08 < 800000){ 
    return{color: '#cccccc'}
  }
  if(feature.properties.AreaCoverage08 > 800000 & feature.properties.AreaCoverage08 < 1750000){ 
    return{color: '#969696'}
  }
  if(feature.properties.AreaCoverage08 > 1750000 & feature.properties.AreaCoverage08 < 3500000){ 
    return{color: '#636363'}
  }
  if(feature.properties.AreaCoverage08 > 3500000){
    return {color: '#252525'}; 
    }
};

let FilterLoss = function(feature) {
  if (feature.properties.CLASS_NAME == "Loss" ) {
    return true;
  } else {
    return false
  }
};

let FilterGain = function(feature) {
  if (feature.properties.CLASS_NAME == "Gain" ) {
    return true;
  } else {
    return false
  }
};

let FilterSame = function(feature) {
  if (feature.properties.CLASS_NAME == "No Change" ) {
    return true;
  } else {
    return false
  }
};

$('input[id ="LossCheck"]').click(function () {
  if ($('input[id ="LossCheck"]').prop('checked')) { 
    ajaxfunc3(CanopyPoly, CanopyStyle, FilterLoss)
  }
  else{ 
    map.removeLayer(featureLoss) 
  }
});

$('input[id ="GainCheck"]').click(function () {
  if ($('input[id ="GainCheck"]').prop('checked')) { 
    ajaxfunc1(CanopyPoly, CanopyStyle, FilterGain)
  }
  else{ 
    map.removeLayer(featureGain) 
  }
});

$('input[id ="SameCheck"]').click(function () {
  if ($('input[id ="SameCheck"]').prop('checked')) { 
    ajaxfunc2(CanopyPoly, CanopyStyle, FilterSame)
  }
  else{ 
    map.removeLayer(featureSame) 
  }
});

$( "#cov08" ).click(function() {
  if ($('input[id ="LossCheck"]').prop('checked')) { 
    map.removeLayer(featureLoss) 
    ajaxfunc(Neighborhood, CoverageStyle)
    ajaxfunc3(CanopyPoly, CanopyStyle, FilterLoss)
  }
  else {
    ajaxfunc(Neighborhood, CoverageStyle)
  }
  if ($('input[id ="GainCheck"]').prop('checked')) { 
    map.removeLayer(featureGain) 
    ajaxfunc(Neighborhood, CoverageStyle)
    ajaxfunc1(CanopyPoly, CanopyStyle, FilterGain)
  }
  else {
    ajaxfunc(Neighborhood, CoverageStyle)
  }
  if ($('input[id ="SameCheck"]').prop('checked')) { 
    map.removeLayer(featureSame) 
    ajaxfunc(Neighborhood, CoverageStyle)
    ajaxfunc3(CanopyPoly, CanopyStyle, FilterSame)
  }
  else {
    ajaxfunc(Neighborhood, CoverageStyle)
  }
});


/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */





var showResults = function() {
  /* =====================
  This function uses some jQuery methods that may be new. $(element).hide()
  will add the CSS "display: none" to the element, effectively removing it
  from the page. $(element).show() removes "display: none" from an element,
  returning it to the page. You don't need to change this part.
  ===================== */
  // => <div id="intro" css="display: none">
  $('#intro').hide();
  // => <div id="results">
  $('#results').show();
};


ajaxfunc = function(dataset, myfilter){$.ajax(dataset).done(function(data) {
  var parsedData = JSON.parse(data);
  featureGroup = L.geoJson(parsedData, {
    style: myfilter,
    opacity: 1,
    color: "black", 
    fillOpacity: 0.4,
    weight: 0.7
    }).addTo(map);
});
} 




ajaxfunc3 = function(dataset, mystyle, myfilter){$.ajax(dataset).done(function(data) {
  var parsedData = JSON.parse(data);
  featureLoss = L.geoJson(parsedData, {
    style: mystyle,
    filter: myfilter, 
    opacity: 0.2,
    fillOpacity: 1, 
    onEachFeature: yourOnEachFeatureFunction, 
    }).addTo(map);
});
} 

ajaxfunc1 = function(dataset, mystyle, myfilter){$.ajax(dataset).done(function(data) {
  var parsedData = JSON.parse(data);
  featureGain = L.geoJson(parsedData, {
    style: mystyle,
    filter: myfilter, 
    opacity: 0.2,
    fillOpacity: 1, 
    onEachFeature: yourOnEachFeatureFunction, 
    }).addTo(map);
});
} 

ajaxfunc2 = function(dataset, mystyle, myfilter){$.ajax(dataset).done(function(data) {
  var parsedData = JSON.parse(data);
  featureSame = L.geoJson(parsedData, {
    style: mystyle,
    filter: myfilter,
    opacity: 0.2, 
    fillOpacity: 1, 
    onEachFeature: yourOnEachFeatureFunction, 
    }).addTo(map);
});
} 


function yourOnEachFeatureFunction(feature, layer){
  layer.bindPopup("Change Type:  " + feature.properties.CLASS_NAME + "<br>"  + 
          "Neighborhood:  " + feature.properties.NAME + "<br>" + 
          "Area (m^2):  " + feature.properties.Area+ "<br>" ) 
} 

