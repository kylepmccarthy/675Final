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
var featureGroups;
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
    return { fillColor: '#f7f7f7', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.AreaCoverage08 > 150000 & feature.properties.AreaCoverage08 < 800000){ 
    return { fillColor: '#cccccc', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.AreaCoverage08 > 800000 & feature.properties.AreaCoverage08 < 1750000){ 
    return { fillColor: '#969696', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.AreaCoverage08 > 1750000 & feature.properties.AreaCoverage08 < 3500000){ 
    return { fillColor: '#636363', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.AreaCoverage08 > 3500000){
    return { fillColor: '#252525', weight: .5, opacity: 1, color: 'red'};
    }
};

var CoverageStyle18 = function(feature) {
  if(feature.properties.AreaCoverage18 < 150000){
    return { fillColor: '#f7f7f7', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.AreaCoverage18 > 150000 & feature.properties.AreaCoverage18 < 800000){ 
    return { fillColor: '#cccccc', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.AreaCoverage18 > 800000 & feature.properties.AreaCoverage18 < 1750000){ 
    return { fillColor: '#969696', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.AreaCoverage18 > 1750000 & feature.properties.AreaCoverage18 < 3500000){ 
    return { fillColor: '#636363', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.AreaCoverage18 > 3500000){
    return { fillColor: '#252525', weight: .5, opacity: 1, color: 'red'};
    }
};

var pctCoverageStyle = function(feature) {
  if(feature.properties.pctCoverage08 < 5){
    return { fillColor: '#f7f7f7', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.pctCoverage08 > 5 & feature.properties.pctCoverage08 < 13){ 
    return { fillColor: '#cccccc', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.pctCoverage08 > 13 & feature.properties.pctCoverage08 < 21){ 
    return { fillColor: '#969696', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.pctCoverage08 > 21 & feature.properties.pctCoverage08 < 30){ 
    return { fillColor: '#636363', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.pctCoverage08 > 30){
    return { fillColor: '#252525', weight: .5, opacity: 1, color: 'red'};
    }
};

var pctCoverageStyle18 = function(feature) {
  if(feature.properties.pctCoverage18 < 5){
    return { fillColor: '#f7f7f7', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.pctCoverage18 > 5 & feature.properties.pctCoverage18 < 13){ 
    return { fillColor: '#cccccc', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.pctCoverage18 > 13 & feature.properties.pctCoverage18 < 21){ 
    return { fillColor: '#969696', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.pctCoverage18 > 21 & feature.properties.pctCoverage18 < 30){ 
    return { fillColor: '#636363', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.pctCoverage18 > 30){
    return { fillColor: '#252525', weight: .5, opacity: 1, color: 'red'};
    }
};

var AreaLossN = function(feature) {
  if(feature.properties.AreaLoss < 75000){
    return { fillColor: '#f7f7f7', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.AreaLoss > 75000 & feature.properties.AreaLoss < 200000){ 
    return { fillColor: '#cccccc', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.AreaLoss> 200000 & feature.properties.AreaLoss < 600000){ 
    return { fillColor: '#969696', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.AreaLoss > 600000 & feature.properties.AreaLoss < 1000000){ 
    return { fillColor: '#636363', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.AreaLoss > 1000000){
    return { fillColor: '#252525', weight: .5, opacity: 1, color: 'red'}; 
    }
};

var AreaGainN = function(feature) {
  if(feature.properties.AreaLoss < 75000){
    return { fillColor: '#f7f7f7', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.AreaLoss > 75000 & feature.properties.AreaLoss < 200000){ 
    return { fillColor: '#cccccc', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.AreaLoss> 200000 & feature.properties.AreaLoss < 600000){ 
    return { fillColor: '#969696', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.AreaLoss > 600000 & feature.properties.AreaLoss < 900000){ 
    return { fillColor: '#636363', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.AreaLoss > 900000){
    return { fillColor: '#252525', weight: .5, opacity: 1, color: 'red'};
    }
};

var AreaGainN = function(feature) {
  if(feature.properties.AreaLoss < 75000){
    return { fillColor: '#f7f7f7', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.AreaLoss > 75000 & feature.properties.AreaLoss < 200000){ 
    return { fillColor: '#cccccc', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.AreaLoss> 200000 & feature.properties.AreaLoss < 600000){ 
    return { fillColor: '#969696', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.AreaLoss > 600000 & feature.properties.AreaLoss < 900000){ 
    return { fillColor: '#636363', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.AreaLoss > 900000){
    return { fillColor: '#252525', weight: .5, opacity: 1, color: 'red'};
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

var NDropDown = function(string, style){ $( string ).click(function() {
  if ($('input[id ="LossCheck"]').prop('checked')) { 
    if(featureGroups != undefined){
    map.removeLayer(featureGroups) } 
    map.removeLayer(featureLoss)
    ajaxfunc(Neighborhood, style)
    ajaxfunc3(CanopyPoly, CanopyStyle, FilterLoss)
  }
  else if ($('input[id ="GainCheck"]').prop('checked')) { 
    if(featureGroups != undefined){
      map.removeLayer(featureGroups) } 
    map.removeLayer(featureGain)
    ajaxfunc(Neighborhood, style)
    ajaxfunc1(CanopyPoly, CanopyStyle, FilterGain)
  }

  else if ($('input[id ="SameCheck"]').prop('checked')) { 
    if(featureGroups != undefined){
      map.removeLayer(featureGroups) } 
    map.removeLayer(featureSame)
    ajaxfunc(Neighborhood, style)
    ajaxfunc2(CanopyPoly, CanopyStyle, FilterSame)
  }
  else { 
    if(featureGroups != undefined){
      map.removeLayer(featureGroups) } 
      ajaxfunc(Neighborhood, style)
  }
});
} 

NDropDown("#cov08", CoverageStyle)
NDropDown("#cov18", CoverageStyle18)
NDropDown("#pctCov08", pctCoverageStyle)
NDropDown("#pctCove18", pctCoverageStyle18)
NDropDown("#lostTrees", AreaLossN)
NDropDown("#gainedTrees", AreaGainN)


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


ajaxfunc = function(dataset, myStyle){$.ajax(dataset).done(function(data) {
  var parsedData = JSON.parse(data);
  featureGroups = L.geoJson(parsedData, {
    style: myStyle,
    color: "red", 
    fillOpacity: 1,
    weight: 3,
    }).addTo(map);
});
} 




ajaxfunc3 = function(dataset, mystyle, myfilter){$.ajax(dataset).done(function(data) {
  var parsedData = JSON.parse(data);
  featureLoss = L.geoJson(parsedData, {
    style: mystyle,
    filter: myfilter, 
    opacity: 1,
    color: "red", 
    fillOpacity: 1.5, 
    onEachFeature: yourOnEachFeatureFunction, 
    }).addTo(map);
});
} 

ajaxfunc1 = function(dataset, mystyle, myfilter){$.ajax(dataset).done(function(data) {
  var parsedData = JSON.parse(data);
  featureGain = L.geoJson(parsedData, {
    style: mystyle,
    filter: myfilter, 
    opacity: 1,
    fillOpacity: 1.5, 
    onEachFeature: yourOnEachFeatureFunction, 
    }).addTo(map);
});
} 

ajaxfunc2 = function(dataset, mystyle, myfilter){$.ajax(dataset).done(function(data) {
  var parsedData = JSON.parse(data);
  featureSame = L.geoJson(parsedData, {
    style: mystyle,
    filter: myfilter,
    opacity: 1, 
    fillOpacity: 1.5, 
    onEachFeature: yourOnEachFeatureFunction, 
    }).addTo(map);
});
} 


function yourOnEachFeatureFunction(feature, layer){
  layer.bindPopup("Change Type:  " + feature.properties.CLASS_NAME + "<br>"  + 
          "Neighborhood:  " + feature.properties.NAME + "<br>" + 
          "Area (m^2):  " + feature.properties.Area+ "<br>" ) 
} 

