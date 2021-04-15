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
  if(feature.properties.AreaCoverage08 < 2080000){
    return { fillColor: '#f7f7f7', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.AreaCoverage08 > 2080000 & feature.properties.AreaCoverage08 < 4766600){ 
    return { fillColor: '#cccccc', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.AreaCoverage08 > 4766600& feature.properties.AreaCoverage08 < 8960000){ 
    return { fillColor: '#969696', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.AreaCoverage08 > 8960000 & feature.properties.AreaCoverage08 < 14183000){ 
    return { fillColor: '#636363', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.AreaCoverage08 > 14183000){
    return { fillColor: '#252525', weight: .5, opacity: 1, color: 'red'};
    }
};

var CoverageStyle18 = function(feature) {
  if(feature.properties.AreaCoverage08 < 2080000){
    return { fillColor: '#f7f7f7', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.AreaCoverage08 > 2080000 & feature.properties.AreaCoverage08 < 4766600){ 
    return { fillColor: '#cccccc', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.AreaCoverage08 > 4766600& feature.properties.AreaCoverage08 < 8960000){ 
    return { fillColor: '#969696', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.AreaCoverage08 > 8960000 & feature.properties.AreaCoverage08 < 14183000){ 
    return { fillColor: '#636363', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.AreaCoverage08 > 14183000){
    return { fillColor: '#252525', weight: .5, opacity: 1, color: 'red'};
    }
};

var pctCoverageStyle = function(feature) {
  if(feature.properties.pctCoverage08 < 7){
    return { fillColor: '#f7f7f7', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.pctCoverage08 > 7 & feature.properties.pctCoverage08 < 13){ 
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
  if(feature.properties.pctCoverage08 < 7){
    return { fillColor: '#f7f7f7', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.pctCoverage08 > 7 & feature.properties.pctCoverage08 < 13){ 
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

var AreaLossN = function(feature) {
  if(feature.properties.AreaLoss < 500000){
    return { fillColor: '#f7f7f7', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.AreaLoss > 500000 & feature.properties.AreaLoss < 1126500){ 
    return { fillColor: '#cccccc', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.AreaLoss> 1126500 & feature.properties.AreaLoss < 2100000){ 
    return { fillColor: '#969696', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.AreaLoss > 2100000 & feature.properties.AreaLoss < 3500000){ 
    return { fillColor: '#636363', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.AreaLoss > 3500000){
    return { fillColor: '#252525', weight: .5, opacity: 1, color: 'red'}; 
    }
};

var AreaGainN = function(feature) {
  if(feature.properties.AreaGain < 250000){
    return { fillColor: '#f7f7f7', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.AreaGain > 250000 & feature.properties.AreaGain < 560000){ 
    return { fillColor: '#cccccc', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.AreaGain> 560000 & feature.properties.AreaGain < 1030000){ 
    return { fillColor: '#969696', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.AAreaGain > 1030000 & feature.properties.AreaGain < 1635000){ 
    return { fillColor: '#636363', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.AreaGain > 1635000){
    return { fillColor: '#252525', weight: .5, opacity: 1, color: 'red'};
    }
};

var NetChangeN = function(feature) {
  if(feature.properties.GainMinusLoss < -2007700){
    return { fillColor: '#f7f7f7', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.GainMinusLoss > -2007700 & feature.properties.GainMinusLoss < -886000){ 
    return { fillColor: '#cccccc', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.GainMinusLoss> -886000 & feature.properties.GainMinusLoss< -283500){ 
    return { fillColor: '#969696', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.GainMinusLoss > -283500 & feature.properties.GainMinusLoss< 0){ 
    return { fillColor: '#636363', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.GainMinusLoss > 0){
    return { fillColor: '#252525', weight: .5, opacity: 1, color: 'red'};
    }
};

var pctLossN = function(feature) {
  if(feature.properties.pctLoss < 15){
    return { fillColor: '#f7f7f7', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.pctLoss > 15 & feature.properties.pctLoss < 21){ 
    return { fillColor: '#cccccc', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.pctLoss> 21 & feature.properties.pctLoss < 27){ 
    return { fillColor: '#969696', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.pctLoss > 27 & feature.properties.pctLoss < 36){ 
    return { fillColor: '#636363', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.pctLoss > 36){
    return { fillColor: '#252525', weight: .5, opacity: 1, color: 'red'};
    }
};

var pctGainN = function(feature) {
  if(feature.properties.pctGain < 10){
    return { fillColor: '#f7f7f7', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.pctGain > 10 & feature.properties.pctGain < 16){ 
    return { fillColor: '#cccccc', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.pctGain> 16 & feature.properties.pctGain < 22){ 
    return { fillColor: '#969696', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.pcGain > 22 & feature.properties.pctGain < 30){ 
    return { fillColor: '#636363', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.pctGain > 30){
    return { fillColor: '#252525', weight: .5, opacity: 1, color: 'red'};
    }
};

var pctChangeN = function(feature) {
  if(feature.properties.pctChange < -24){
    return { fillColor: '#f7f7f7', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.pctChange > -24 & feature.properties.pctChange < -11){ 
    return { fillColor: '#cccccc', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.pctChange> -11 & feature.properties.pctChange < 0){ 
    return { fillColor: '#969696', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.pctChange > 0 & feature.properties.pctChange < 8){ 
    return { fillColor: '#636363', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.pctChange > 8){
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

var NDropDown1 = function(string, style){ $( string ).click(function() {
  if ($('input[id ="LossCheck"]').prop('checked')) { 
    if(featureGroups != undefined){
    map.removeLayer(featureGroups) } 
    map.removeLayer(featureLoss)
    ajaxfunc(Neighborhood, style)
    ajaxfunc3(CanopyPoly, CanopyStyle, FilterLoss)
  }
  else { 
    if(featureGroups != undefined){
      map.removeLayer(featureGroups) } 
      ajaxfunc(Neighborhood, style)
  }
});
} 

var NDropDown2 = function(string, style){ $( string ).click(function() {
  if ($('input[id ="GainCheck"]').prop('checked')) { 
    if(featureGroups != undefined){
      map.removeLayer(featureGroups) } 
    map.removeLayer(featureGain)
    ajaxfunc(Neighborhood, style)
    ajaxfunc1(CanopyPoly, CanopyStyle, FilterGain)
  }
  else { 
    if(featureGroups != undefined){
      map.removeLayer(featureGroups) } 
      ajaxfunc(Neighborhood, style)
  }
});
} 


var NDropDown3 = function(string, style){ $( string ).click(function() {
  if (($('input[id ="SameCheck"]').prop('checked'))) { 
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


NDropDown1("#cov08", CoverageStyle)
NDropDown1("#cov18", CoverageStyle18)
NDropDown1("#pctCov08", pctCoverageStyle)
NDropDown1("#pctCove18", pctCoverageStyle18)
NDropDown1("#lostTrees", AreaLossN)
NDropDown1("#gainedTrees", AreaGainN)
NDropDown1("#NetChange", NetChangeN)
NDropDown1("#pctLoss", pctLossN)
NDropDown1("#pctGain", pctLossN)
NDropDown1("#pctChange", pctLossN)
NDropDown2("#cov08", CoverageStyle)
NDropDown2("#cov18", CoverageStyle18)
NDropDown2("#pctCov08", pctCoverageStyle)
NDropDown2("#pctCove18", pctCoverageStyle18)
NDropDown2("#lostTrees", AreaLossN)
NDropDown2("#gainedTrees", AreaGainN)
NDropDown2("#pctLoss", pctLossN)
NDropDown2("#pctGain", pctLossN)
NDropDown2("#pctChange", pctLossN)
NDropDown2("#NetChange", NetChangeN)
NDropDown3("#cov08", CoverageStyle)
NDropDown3("#cov18", CoverageStyle18)
NDropDown3("#pctCov08", pctCoverageStyle)
NDropDown3("#pctCove18", pctCoverageStyle18)
NDropDown3("#lostTrees", AreaLossN)
NDropDown3("#gainedTrees", AreaGainN)
NDropDown3("#NetChange", NetChangeN)
NDropDown3("#pctLoss", pctLossN)
NDropDown3("#pctGain", pctLossN)
NDropDown3("#pctChange", pctLossN)

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */


$('#clearMap').on('click', function(e) {
  map.removeLayer(featureGroups)
});


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
    onEachFeature: onEachFeatureStats
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

function onEachFeatureStats(feature, layer) { 
  layer.bindPopup("2008 Tree Canopy Coverage:  " + feature.properties.AreaCoverage08 + "<br>" + 
  "2018 Tree Canopy Coverage:  " + feature.properties.AreaCoverage18 + "<br>" + 
  "2008 Percent Tree Coverage:  " + feature.properties.pctCoverage08 + "<br>" + 
  "2018 Percent Tree Coverage:  " + feature.properties.pctCoverage18 + "<br>" + 
  "Area Lost:  " + feature.properties.AreaLoss + "<br>" + 
  "Area Gained:  "+ feature.properties.AreaGain + "<br>" + 
  "Net Change:  " + feature.properties.GainMinusLoss + "<br>" + 
  "Percent Loss:  " + feature.properties.pctLoss + "<br>" + 
  "Precent Gain:  " + feature.properties.pctGain + "<br>" + 
  "Percent Change: "+ feature.properties.pctChange)
}