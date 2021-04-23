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
var Grid = "https://raw.githubusercontent.com/kylepmccarthy/675Final/main/Data/gridFinal2.geojson"

var electric = "https://raw.githubusercontent.com/kylepmccarthy/675Final/main/Data/electricR.geojson"
var alteration = "https://raw.githubusercontent.com/kylepmccarthy/675Final/main/Data/alterationR.geojson"
var newconst = "https://raw.githubusercontent.com/kylepmccarthy/675Final/main/Data/NewConstR.geojson"
var addition = "https://raw.githubusercontent.com/kylepmccarthy/675Final/main/Data/AddR.geojson"
var demolition = "https://raw.githubusercontent.com/kylepmccarthy/675Final/main/Data/DemoR.geojson"

var featureGroups; 
var featureEL;
var featureALT; 
var featureNC; 
var featureADD; 
var featureDEMO; 


var ElectricStyle = function(feature) {
  switch (feature.properties.permitdescription) {
    case 'ELECTRICAL PERMIT' : return {color: '#beaed4'};
  }
};

var DeomoStyle = function(feature) {
  switch (feature.properties.permitdescription) {
    case 'DEMOLITION PERMIT' : return {color: '#7fc97f'};
  }
};

var AltStyle = function(feature) {
  switch (feature.properties.permitdescription) {
    case 'ALTERATION PERMIT' : return {color: '#fdc086'};
  }
};

var AddStyle = function(feature) {
  switch (feature.properties.permitdescription) {
    case 'ADDITION PERMIT' : return {color: '#A38A00'};
  }
};


var newStyle = function(feature) {
  switch (feature.properties.permitdescription) {
    case 'NEW CONSTRUCTION PERMIT' : return {color: '#386cb0'};
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

var CoverageStyle08F = function(feature) {
  if(feature.properties.AreaCoverage08 < 141000){
    return { fillColor: '#f7f7f7', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.AreaCoverage08 > 141000 & feature.properties.AreaCoverage08 < 318000){ 
    return { fillColor: '#cccccc', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.AreaCoverage08 > 318000 & feature.properties.AreaCoverage08 < 553000){ 
    return { fillColor: '#969696', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.AreaCoverage08 > 553000 & feature.properties.AreaCoverage08 < 935800){ 
    return { fillColor: '#636363', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.AreaCoverage08 > 553000){
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

var CoverageStyle18F = function(feature) {
  if(feature.properties.AreaCoverage18 < 141000){
    return { fillColor: '#f7f7f7', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.AreaCoverage18 > 141000 & feature.properties.AreaCoverage18 < 318000){ 
    return { fillColor: '#cccccc', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.AreaCoverage18 > 318000 & feature.properties.AreaCoverage18 < 553000){ 
    return { fillColor: '#969696', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.AreaCoverage18 > 553000 & feature.properties.AreaCoverage18 < 935800){ 
    return { fillColor: '#636363', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.AreaCoverage18 > 553000){
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

var AreaLossF = function(feature) {
  if(feature.properties.AreaLoss < 43200){
    return { fillColor: '#f7f7f7', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.AreaLoss > 43200 & feature.properties.AreaLoss < 98000){ 
    return { fillColor: '#cccccc', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.AreaLoss> 98000 & feature.properties.AreaLoss < 164900){ 
    return { fillColor: '#969696', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.AreaLoss > 164900 & feature.properties.AreaLoss < 362900){ 
    return { fillColor: '#636363', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.AreaLoss > 362900){
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

var AreaGainF = function(feature) {
  if(feature.properties.AreaGain < 24300){
    return { fillColor: '#f7f7f7', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.AreaGain > 24300 & feature.properties.AreaGain < 52850){ 
    return { fillColor: '#cccccc', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.AreaGain> 52850 & feature.properties.AreaGain < 89000){ 
    return { fillColor: '#969696', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.AAreaGain > 89000 & feature.properties.AreaGain < 145800){ 
    return { fillColor: '#636363', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.AreaGain > 145800){
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

var NetChangeF = function(feature) {
  if(feature.properties.GainMinusLoss < -63400){
    return { fillColor: '#f7f7f7', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.GainMinusLoss > -63400 & feature.properties.GainMinusLoss < -31670){ 
    return { fillColor: '#cccccc', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.GainMinusLoss> -31670 & feature.properties.GainMinusLoss< -7280){ 
    return { fillColor: '#969696', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.GainMinusLoss > -7280 & feature.properties.GainMinusLoss< 0){ 
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

var pctLossF = function(feature) {
  if(feature.properties.pctLoss < 10){
    return { fillColor: '#f7f7f7', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.pctLoss > 10 & feature.properties.pctLoss < 22){ 
    return { fillColor: '#cccccc', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.pctLoss> 22 & feature.properties.pctLoss < 34){ 
    return { fillColor: '#969696', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.pctLoss > 34 & feature.properties.pctLoss < 52){ 
    return { fillColor: '#636363', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.pctLoss > 52){
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

var pctGainF = function(feature) {
  if(feature.properties.pctGain < 8){
    return { fillColor: '#f7f7f7', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.pctGain > 8 & feature.properties.pctGain < 18){ 
    return { fillColor: '#cccccc', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.pctGain> 18 & feature.properties.pctGain < 31){ 
    return { fillColor: '#969696', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.pcGain > 31 & feature.properties.pctGain < 52){ 
    return { fillColor: '#636363', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.pctGain > 52){
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

var pctChangeF = function(feature) {
  if(feature.properties.pctChange < -17){
    return { fillColor: '#f7f7f7', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.pctChange > -17 & feature.properties.pctChange < -10){ 
    return { fillColor: '#cccccc', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.pctChange> -11 & feature.properties.pctChange < -4){ 
    return { fillColor: '#969696', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.pctChange > -4 & feature.properties.pctChange < 0){ 
    return { fillColor: '#636363', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.pctChange > 0){
    return { fillColor: '#252525', weight: .5, opacity: 1, color: 'red'};
    }
};

let FilterMain = function(feature) {
  if (feature.properties.pctCoverage08 == 0 | feature.properties.pctLoss == 0 | feature.properties.pctGain == 0) {
    return false;
  } else {
    return true; 
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

$('input[id ="ELCheck"]').click(function () {
  if ($('input[id ="ELCheck"]').prop('checked')) { 
    ajaxEL(electric, ElectricStyle)
  }
  else{ 
    map.removeLayer(featureEL)
  }
});

$('input[id ="NCCheck"]').click(function () {
  if ($('input[id ="NCCheck"]').prop('checked')) { 
    ajaxNC(newconst, newStyle)
  }
  else{ 
    map.removeLayer(featureNC)
  }
});

$('input[id ="DEMCheck"]').click(function () {
  if ($('input[id ="DEMCheck"]').prop('checked')) { 
    ajaxDEMO(demolition, DeomoStyle)
  }
  else{ 
    map.removeLayer(featureDEMO)
  }
});

$('input[id ="ALTCheck"]').click(function () {
  if ($('input[id ="ALTCheck"]').prop('checked')) { 
    ajaxALT(alteration, AltStyle)
  }
  else{ 
    map.removeLayer(featureALT)
  }
});

$('input[id ="ADDCheck"]').click(function () {
  if ($('input[id ="ADDCheck"]').prop('checked')) { 
    ajaxADD(addition, AddStyle)
  }
  else{ 
    map.removeLayer(featureADD) 
  }
});


var NDropDown1 = function(string, style, dataset, layer){ $( string ).click(function() {
  if(featureGroups != undefined){
    map.removeLayer(featureGroups) }  
  ajaxfunc(dataset, style)
});
} 

NDropDown1("#cov08", CoverageStyle, Neighborhood)
NDropDown1("#cov18", CoverageStyle18,  Neighborhood)
NDropDown1("#pctCov08", pctCoverageStyle, Neighborhood)
NDropDown1("#pctCove18", pctCoverageStyle18, Neighborhood)
NDropDown1("#lostTrees", AreaLossN, Neighborhood)
NDropDown1("#gainedTrees", AreaGainN, Neighborhood)
NDropDown1("#NetChange", NetChangeN, Neighborhood)
NDropDown1("#pctLoss", pctLossN, Neighborhood)
NDropDown1("#pctGain", pctLossN, Neighborhood)
NDropDown1("#pctChange", pctLossN, Neighborhood)



NDropDown1("#cov08F", CoverageStyle08F, Grid)
NDropDown1("#cov18F", CoverageStyle18F,  Grid)
NDropDown1("#pctCov08F", pctCoverageStyle, Grid)
NDropDown1("#pctCove18F", pctCoverageStyle18, Grid)
NDropDown1("#lostTreesF", AreaLossF, Grid)
NDropDown1("#gainedTreesF", AreaGainF, Grid)
NDropDown1("#NetChangeF", NetChangeF, Grid)
NDropDown1("#pctLossF", pctLossF, Grid)
NDropDown1("#pctGainF", pctLossF, Grid)
NDropDown1("#pctChangeF", pctLossF, Grid)





/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */


$('#clearMap').on('click', function(e) {
  if (featureGroups != undefined){ 
  map.removeLayer(featureGroups)
  } 
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
    filter: FilterMain, 
    onEachFeature: onEachFeatureStats
    }).addTo(map);
    featureGroups.bringToBack(); 
});
} 

ajaxEL = function(dataset, mystyle, variable){$.ajax(dataset).done(function(data) {
  var parsedData = JSON.parse(data);
  featureEL = L.geoJson(parsedData, {
    size : 0.8, 
    style: mystyle,
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, 
          {radius: 1})
    }
}).addTo(map) 
});
} 

ajaxALT = function(dataset, mystyle, variable){$.ajax(dataset).done(function(data) {
  var parsedData = JSON.parse(data);
  featureALT = L.geoJson(parsedData, {
    size : 0.8, 
    style: mystyle,
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, 
          {radius: 1})
    }
}).addTo(map) 
});
} 

ajaxADD = function(dataset, mystyle, variable){$.ajax(dataset).done(function(data) {
  var parsedData = JSON.parse(data);
  featureADD = L.geoJson(parsedData, {
    size : 0.8, 
    style: mystyle,
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, 
          {radius: 1})
    }
}).addTo(map) 
});
} 

ajaxDEMO = function(dataset, mystyle, variable){$.ajax(dataset).done(function(data) {
  var parsedData = JSON.parse(data);
  featureDEMO = L.geoJson(parsedData, {
    size : 0.8, 
    style: mystyle,
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, 
          {radius: 1})
    }
}).addTo(map) 
});
} 

ajaxNC = function(dataset, mystyle){$.ajax(dataset).done(function(data) {
  var parsedData = JSON.parse(data);
  featureNC = L.geoJson(parsedData, {
    size : 0.8, 
    style: mystyle,
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, 
          {radius: 1})
    }
}).addTo(map) 
});
} 


var age = document.getElementById("year").value;

$('#Filter').on('click', function(e) {
  var x = document.getElementById("year").value;
  let FilterYear= function(feature) {
    if (feature.properties.Year == 0) {
      return false;
    } else {
      return true; 
    }
  };
});


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