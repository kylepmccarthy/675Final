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

var electric = "https://raw.githubusercontent.com/kylepmccarthy/675Final/main/Data/electricRPRE2.geojson"
var alteration = "https://raw.githubusercontent.com/kylepmccarthy/675Final/main/Data/alterationRPRE2.geojson"
var plum = "https://raw.githubusercontent.com/kylepmccarthy/675Final/main/Data/PlumPre.geojson"
var newconst = "https://raw.githubusercontent.com/kylepmccarthy/675Final/main/Data/NC3.geojson"
var addition = "https://raw.githubusercontent.com/kylepmccarthy/675Final/main/Data/AddR4.geojson"
var demolition = "https://raw.githubusercontent.com/kylepmccarthy/675Final/main/Data/DemoR5.geojson"
var results = "https://raw.githubusercontent.com/kylepmccarthy/675Final/main/Data/scenarios.geojson"
var electric1 = "https://raw.githubusercontent.com/kylepmccarthy/675Final/main/Data/electricRPOST2.geojson"
var alteration1 = "https://raw.githubusercontent.com/kylepmccarthy/675Final/main/Data/alterationRPOST2.geojson"
var plum2 = "https://raw.githubusercontent.com/kylepmccarthy/675Final/main/Data/PlumPost2.geojson "
var Mechanical = "https://raw.githubusercontent.com/kylepmccarthy/675Final/main/Data/Mechanical.geojson"

var featureGroups; 
var featureEL;
var featureALT; 
var featureNC; 
var featureADD; 
var featureDEMO; 
var featureP; 
var featureM; 
var histogramChart; 

var histogramBins = [0, 0, 0, 0, 0] 


var ElectricStyle = function(feature) {
  switch (feature.properties.permitdescription) {
    case 'ELECTRICAL PERMIT' : return {color: '#beaed4'};
  }
};

var MechanicalcStyle = function(feature) {
  switch (feature.properties.permitdescription) {
    case 'MECHANICAL PERMIT' : return {color: '#f0027f'};
  }
};

var PlumStyle = function(feature) {
  switch (feature.properties.permitdescription) {
    case 'PLUMBING PERMIT' : return {color: '#bf5b17'};
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

var ResultStyle = function(feature) {
  if(feature.properties.Risk_Cat == "Very Low"){
    return { fillColor: '#f7f7f7', weight: .3, opacity: 1, color: 'red'};
  }
  if(feature.properties.Risk_Cat == "Low"){ 
    return { fillColor: '#cccccc', weight: .3, opacity: 1, color: 'red'};
  }
  if(feature.properties.Risk_Cat == "Moderate"){ 
    return { fillColor: '#969696', weight: .3, opacity: 1, color: 'red'};
  }
  if(feature.properties.Risk_Cat == "High"){ 
    return { fillColor: '#636363', weight: .3, opacity: 1, color: 'red'};
  }
  if(feature.properties.Risk_Cat == "Severe"){
    return { fillColor: '#252525', weight: .3, opacity: 1, color: 'red'};
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
  if(feature.properties.AreaGain > 1030000 & feature.properties.AreaGain < 1635000){ 
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
  if(feature.properties.AreaGain > 89000 & feature.properties.AreaGain < 145800){ 
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
  if(feature.properties.netChange < -63400){
    return { fillColor: '#f7f7f7', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.netChange > -63400 & feature.properties.netChange< -31670){ 
    return { fillColor: '#cccccc', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.netChange> -31670 & feature.properties.netChange< -7280){ 
    return { fillColor: '#969696', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.netChange > -7280 & feature.properties.netChange< 0){ 
    return { fillColor: '#636363', weight: .5, opacity: 1, color: 'red'};
  }
  if(feature.properties.netChange > 0){
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

let FilterResults2 = function(feature) {
  if (feature.properties.Scenario == 'const_25less') {
    return true;
  } else {
    return false; 
  }
};

let FilterResults1 = function(feature) {
  if (feature.properties.Scenario == 'const_50less') {
    return true;
  } else {
    return false; 
  }
};

let FilterResults3 = function(feature) {
  if (feature.properties.Scenario == 'const_original') {
    return true;
  } else {
    return false; 
  }
};

let FilterResults4 = function(feature) {
  if (feature.properties.Scenario == 'const_25more') {
    return true;
  } else {
    return false; 
  }
};

let FilterResults5 = function(feature) {
  if (feature.properties.Scenario == 'const_50more') {
    return true;
  } else {
    return false; 
  }
};




let FilterYear = function(feature) {
  if (feature.properties.year <= 2018 ) {
    return true;
  } else {
    return false
  }
};

let FilterYear2 = function(feature) {
  if (feature.properties.year >= 2019 ) {
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

$('input[id ="ELCheck"]').click(function () {
  if ($('input[id ="ELCheck"]').prop('checked')) { 
    if(i == 0) {
       ajaxEL(electric, ElectricStyle)
    } 
    else{ 
      ajaxEL(electric1, ElectricStyle)
    }
  }
  else{ 
    map.removeLayer(featureEL)
  }
});

$('input[id ="NCCheck"]').click(function () {
  if ($('input[id ="NCCheck"]').prop('checked')) { 
    if (i == 0 ) { 
      ajaxNC(newconst, newStyle, FilterYear)
    } 
    else { 
      ajaxNC(newconst, newStyle, FilterYear2)
    }
  }
  else{ 
    map.removeLayer(featureNC)
  }
});

$('input[id ="DEMCheck"]').click(function () {
  if ($('input[id ="DEMCheck"]').prop('checked')) { 
    if (i == 0){ 
      ajaxDEMO(demolition, DeomoStyle, FilterYear)
    } 
    else { 
      ajaxDEMO(demolition, DeomoStyle, FilterYear2)
    }
  }
  else{ 
    map.removeLayer(featureDEMO)
  }
});

$('input[id ="ALTCheck"]').click(function () {
  if ($('input[id ="ALTCheck"]').prop('checked')) { 
    if(i == 0) { 
      ajaxALT(alteration, AltStyle)
    } 
    else{ 
      ajaxALT(alteration1, AltStyle)
    }
  }
  else{ 
    map.removeLayer(featureALT)
  }
});

$('input[id ="ADDCheck"]').click(function () {
  if ($('input[id ="ADDCheck"]').prop('checked')) { 
    if(i == 0) { 
    ajaxADD(addition, AddStyle, FilterYear)
    } 
    else { 
      ajaxADD(addition, AddStyle, FilterYear2)
    }
  }
  else{ 
    map.removeLayer(featureADD) 
  }
});

$('input[id ="PCheck"]').click(function () {
  if ($('input[id ="PCheck"]').prop('checked')) { 
    if(i == 0) { 
    ajaxP(plum, PlumStyle)
    } 
    else { 
      ajaxP(plum2, PlumStyle)
    }
  }
  else{ 
    map.removeLayer(featureP) 
  }
});

$('input[id ="MCheck"]').click(function () {
  if ($('input[id ="MCheck"]').prop('checked')) { 
    if(i == 0) { 
    ajaxM(Mechanical, MechanicalcStyle, FilterYear)
    } 
    else { 
      ajaxM(Mechanical, MechanicalcStyle, FilterYear2)
    }
  }
  else{ 
    map.removeLayer(featureM) 
  }
});


var NDropDown1 = function(string, style, dataset, Filter, pop){ $( string ).click(function() {
  if(featureGroups != undefined){
    map.removeLayer(featureGroups) }  
  ajaxfunc(dataset, style, Filter, pop); 
});
} 

var NDropDown2Bar = function(string, style, dataset, Filter, pop){ $( string ).click(function() {
  if(featureGroups != undefined){
    map.removeLayer(featureGroups) }  
    histogramBins = [0, 0, 0, 0, 0]; 
  ajaxfunc(dataset, style, Filter, pop).done(function (){ 
    if(histogramChart === undefined) { 
      BuildChart() 
    }
    else{ updateChart()} 
  }) 
});
} 

NDropDown1("#cov08", CoverageStyle, Neighborhood, FilterMain, onEachFeatureStats)
NDropDown1("#cov18", CoverageStyle18,  Neighborhood, FilterMain, onEachFeatureStats)
NDropDown1("#pctCov08", pctCoverageStyle, Neighborhood, FilterMain, onEachFeatureStats)
NDropDown1("#pctCove18", pctCoverageStyle18, Neighborhood, FilterMain, onEachFeatureStats)
NDropDown1("#lostTrees", AreaLossN, Neighborhood, FilterMain), onEachFeatureStats
NDropDown1("#gainedTrees", AreaGainN, Neighborhood, FilterMain, onEachFeatureStats)
NDropDown1("#NetChange", NetChangeN, Neighborhood, FilterMain, onEachFeatureStats)
NDropDown1("#pctLoss", pctLossN, Neighborhood, FilterMain, onEachFeatureStats)
NDropDown1("#pctGain", pctLossN, Neighborhood, FilterMain, onEachFeatureStats)
NDropDown1("#pctChange", pctLossN, Neighborhood, FilterMain, onEachFeatureStats)



NDropDown1("#cov08F", CoverageStyle08F, Grid, FilterMain, onEachFeatureStats1)
NDropDown1("#cov18F", CoverageStyle18F,  Grid, FilterMain, onEachFeatureStats1)
NDropDown1("#pctCov08F", pctCoverageStyle, Grid, FilterMain, onEachFeatureStats1)
NDropDown1("#pctCove18F", pctCoverageStyle18, Grid, FilterMain, onEachFeatureStats1)
NDropDown1("#lostTreesF", AreaLossF, Grid, FilterMain, onEachFeatureStats1)
NDropDown1("#gainedTreesF", AreaGainF, Grid, FilterMain, onEachFeatureStats1)
NDropDown1("#NetChangeF", NetChangeF, Grid, FilterMain, onEachFeatureStats1)
NDropDown1("#pctLossF", pctLossF, Grid, FilterMain, onEachFeatureStats1)
NDropDown1("#pctGainF", pctLossF, Grid, FilterMain, onEachFeatureStats1)
NDropDown1("#pctChangeF", pctLossF, Grid, FilterMain, onEachFeatureStats1)

NDropDown2Bar("#S1", ResultStyle, results, FilterResults1, onEachFeatureStats2)
NDropDown2Bar("#S2", ResultStyle, results, FilterResults2, onEachFeatureStats2)
NDropDown2Bar("#S3", ResultStyle, results, FilterResults3, onEachFeatureStats2)
NDropDown2Bar("#S4", ResultStyle, results, FilterResults4, onEachFeatureStats2)
NDropDown2Bar("#S5", ResultStyle, results, FilterResults5, onEachFeatureStats2)





/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */


$('#clearMap').on('click', function(e) {
  if (map.hasLayer(featureGroups)){ 
  map.removeLayer(featureGroups)
  } 
});

$('#MapOn').on('click', function(e) {
  if(featureGroups != undefined){ 
  if (map.hasLayer(featureGroups) == false){ 
  map.addLayer(featureGroups) 
  featureGroups.bringToBack(); 

  } } 
});



ajaxfunc = function(dataset, myStyle, myFilter, oneach){ 
  return $.ajax(dataset).done(function(data) {
  var parsedData = JSON.parse(data);
  featureGroups = L.geoJson(parsedData, {
    style: myStyle,
    color: "red", 
    fillOpacity: 1,
    weight: 3,
    filter: myFilter, 
    onEachFeature: oneach,
    }).addTo(map);
    featureGroups.bringToBack(); 
});
} 



ajaxEL = function(dataset, mystyle, variable){$.ajax(dataset).done(function(data) {
  var parsedData = JSON.parse(data);
  featureEL = L.geoJson(parsedData, {
    size : 0.8, 
    style: mystyle,
    filter: variable, 
    onEachFeature: onEachFeatureConst, 
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
    filter: variable, 
    onEachFeature: onEachFeatureConst, 
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
    filter: variable, 
    onEachFeature: onEachFeatureConst, 
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
    filter: variable, 
    onEachFeature: onEachFeatureConst, 
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, 
          {radius: 1})
    }
}).addTo(map) 
});
} 

ajaxNC = function(dataset, mystyle, variable){$.ajax(dataset).done(function(data) {
  var parsedData = JSON.parse(data);
  featureNC = L.geoJson(parsedData, {
    size : 0.8, 
    style: mystyle,
    filter: variable, 
    onEachFeature: onEachFeatureConst, 
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, 
          {radius: 1})
    }
}).addTo(map) 
});
} 

ajaxP = function(dataset, mystyle, variable){$.ajax(dataset).done(function(data) {
  var parsedData = JSON.parse(data);
  featureP = L.geoJson(parsedData, {
    size : 0.8, 
    style: mystyle,
    filter: variable, 
    onEachFeature: onEachFeatureConst, 
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, 
          {radius: 1})
    }
}).addTo(map) 
});
} 

ajaxM = function(dataset, mystyle, variable){$.ajax(dataset).done(function(data) {
  var parsedData = JSON.parse(data);
  featureM = L.geoJson(parsedData, {
    size : 0.8, 
    style: mystyle,
    filter: variable, 
    onEachFeature: onEachFeatureConst, 
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, 
          {radius: 1})
    }
}).addTo(map) 
});
} 

let i = 0; 

$('#CON0818').click(function(){
  $("button").removeClass("active");
  $(this).addClass("active");
  i = 0; 
  if(map.hasLayer(featureNC)){ 
    map.removeLayer(featureNC); 
    ajaxNC(newconst, newStyle, FilterYear)
  }
  if(map.hasLayer(featureDEMO)){ 
    map.removeLayer(featureDEMO); 
    ajaxDEMO(demolition, DeomoStyle, FilterYear)
  }
  if(map.hasLayer(featureADD)){ 
    map.removeLayer(featureADD); 
    ajaxADD(addition, AddStyle, FilterYear)
  }
  if(map.hasLayer(featureALT)){ 
    map.removeLayer(featureALT); 
    ajaxALT(alteration, AltStyle, FilterYear)
  }
  if(map.hasLayer(featureEL)){ 
    map.removeLayer(featureEL); 
    ajaxEL(electric, ElectricStyle, FilterYear)
  }
  if(map.hasLayer(featureP)){ 
    map.removeLayer(featureP); 
    ajaxP(plum, PlumStyle)
  }
  if(map.hasLayer(featureM)){ 
    map.removeLayer(featureM); 
    ajaxM(Mechanical, MechanicalcStyle, FilterYear)
  }
});

$('#CON19').click(function(){
  $("button").removeClass("active");
  $(this).addClass("active");
  i = 1; 
  if(map.hasLayer(featureNC)){ 
    map.removeLayer(featureNC); 
    ajaxNC(newconst, newStyle, FilterYear2)
  }
  if(map.hasLayer(featureDEMO)){ 
    map.removeLayer(featureDEMO); 
    ajaxDEMO(demolition, DeomoStyle, FilterYear2)
  }
  if(map.hasLayer(featureADD)){ 
    map.removeLayer(featureADD); 
    ajaxADD(addition, AddStyle, FilterYear2)
  }
  if(map.hasLayer(featureALT)){ 
    map.removeLayer(featureALT); 
    ajaxALT(alteration1, AltStyle, FilterYear2)
  }
  if(map.hasLayer(featureEL)){ 
    map.removeLayer(featureEL); 
    ajaxEL(electric1, ElectricStyle, FilterYear2)
  }
  if(map.hasLayer(featureP)){ 
    map.removeLayer(featureP); 
    ajaxP(plum2, PlumStyle)
  }
  if(map.hasLayer(featureM)){ 
    map.removeLayer(featureM); 
    ajaxM(Mechanical, MechanicalcStyle, FilterYear2)
  }
});


function yourOnEachFeatureFunction(feature, layer){
  layer.bindPopup("Change Type:  " + feature.properties.CLASS_NAME + "<br>"  + 
          "Neighborhood:  " + feature.properties.NAME + "<br>" + 
          "Area (m^2):  " + feature.properties.Area+ "<br>" ) 
} 

function onEachFeatureStats(feature, layer) { 
  layer.bindPopup("Neighborhood: " + feature.properties.LISTNAME +  "<br>" + 
    "2008 Tree Canopy Coverage:  " + feature.properties.AreaCoverage08.toFixed(2) + " Square Feet" +  "<br>" + 
  "2018 Tree Canopy Coverage:  " + feature.properties.AreaCoverage18.toFixed(2) +  " Square Feet" + "<br>" + 
  "2008 Percent Tree Coverage:  " + feature.properties.pctCoverage08.toFixed(2) + "%" + "<br>" + 
  "2018 Percent Tree Coverage:  " + feature.properties.pctCoverage18.toFixed(2) + "%" + "<br>" + 
  "Area Lost:  " + feature.properties.AreaLoss.toFixed(2) + " Square Feet" + "<br>" + 
  "Area Gained:  "+ feature.properties.AreaGain.toFixed(2) + " Square Feet" + "<br>" + 
  "Net Change:  " + feature.properties.GainMinusLoss.toFixed(2) + " Square Feet" + "<br>" + 
  "Percent Loss:  " + feature.properties.pctLoss.toFixed(2)+ "%"  + "<br>" + 
  "Precent Gain:  " + feature.properties.pctGain.toFixed(2)+ "%"  + "<br>" + 
  "Percent Change: "+ feature.properties.pctChange.toFixed(2)+ "%" )
}

function onEachFeatureStats1(feature, layer) { 
  layer.bindPopup(
    "2008 Tree Canopy Coverage:  " + feature.properties.AreaCoverage08.toFixed(2)+ " Square Feet" + "<br>" + 
  "2018 Tree Canopy Coverage:  " + feature.properties.AreaCoverage18.toFixed(2) + " Square Feet" + "<br>" + 
  "2008 Percent Tree Coverage:  " + feature.properties.pctCoverage08.toFixed(2) + "%" + "<br>" + 
  "2018 Percent Tree Coverage:  " + feature.properties.pctCoverage18.toFixed(2)+ "%"  + "<br>" + 
  "Area Lost:  " + feature.properties.AreaLoss.toFixed(2) + " Square Feet"+ "<br>" + 
  "Area Gained:  "+ feature.properties.AreaGain.toFixed(2)+ " Square Feet" + "<br>" + 
  "Net Change:  " + feature.properties.netChange.toFixed(2) + " Square Feet" + "<br>" + 
  "Percent Loss:  " + feature.properties.pctLoss.toFixed(2)+ "%"  + "<br>" + 
  "Precent Gain:  " + feature.properties.pctGain.toFixed(2) + "%"  + "<br>" + 
  "Percent Change: "+ feature.properties.pctChange.toFixed(2) + "%" )
}


function onEachFeatureConst(feature, layer) { 
  layer.bindPopup( 
    "ADDRESS: " + feature.properties.address + "<br>" + 
    "YEAR: "   + feature.properties.year + "<br>" + 
    "PERMIT TYPE: " + feature.properties.permitdescription + "<br>" 

  )
}

var countCat = function (feature) { 
  if(feature.properties.Risk_Cat === "Very Low"){ 
    histogramBins[0] = histogramBins[0] + 1
  }
  if(feature.properties.Risk_Cat === "Low"){ 
    histogramBins[1] = histogramBins[1] + 1
  }
  if(feature.properties.Risk_Cat === "Moderate"){ 
    histogramBins[2] = histogramBins[2] + 1
  }
  if(feature.properties.Risk_Cat === "High"){ 
    histogramBins[3] = histogramBins[3] + 1
  }
  if(feature.properties.Risk_Cat === "Severe"){ 
    histogramBins[4] = histogramBins[4] + 1
  }
}


function onEachFeatureStats2(feature, layer) { 
  layer.bindPopup("Probaility of Significant Tree Loss: " + feature.properties.Probs.toFixed(2) + "%" + "<br>" + 
  "Tree Loss Severity: " + feature.properties.Risk_Cat + "<br>") ; 
  countCat(feature)
}

function BuildChart( ){ 
  var ctx = document.getElementById('myChart').getContext('2d');

histogramChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Very Low', 'Low', 'Moderate', 'High', 'Very High'],
        datasets: [{
            label: '# of Grid Cells',
            data: histogramBins, 
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});


}


var histogramBins1 = [0, 0, 0, 0, 0] 

var updateChart= function(){ 
  histogramChart.data.datasets[0].data = histogramBins 
  histogramChart.update()
}

document.getElementById("myModal").click();

$( "#cov08" ).click(function() {
  $('#AreaCov').show();
  $('#pctLegend').hide();
  $('#AreaLoss').hide();
  $('#AreaGain').hide();
  $('#NetChangeL').hide();
  $('#pctLossL').hide();
  $('#pctGainL').hide();
  $('#pctChangeL').hide();
  $('#legends').show();
  $('#sce').hide();
});

$( "#cov18" ).click(function() {
  $('#AreaCov').show();
  $('#pctLegend').hide();
  $('#AreaLoss').hide();
  $('#AreaGain').hide();
  $('#NetChangeL').hide();
  $('#pctLossL').hide();
  $('#pctGainL').hide();
  $('#pctChangeL').hide();
  $('#legends').show();
  $('#sce').hide();
});

$( "#cov08F" ).click(function() {
  $('#AreaCov').show();
  $('#pctLegend').hide();
  $('#AreaLoss').hide();
  $('#AreaGain').hide();
  $('#NetChangeL').hide();
  $('#pctLossL').hide();
  $('#pctGainL').hide();
  $('#pctChangeL').hide();
  $('#legends').show();
  $('#sce').hide();
});

$( "#cov08F" ).click(function() {
  $('#AreaCov').show();
  $('#pctLegend').hide();
  $('#AreaLoss').hide();
  $('#AreaGain').hide();
  $('#NetChangeL').hide();
  $('#pctLossL').hide();
  $('#pctGainL').hide();
  $('#pctChangeL').hide();
  $('#legends').show();
  $('#sce').hide();
});

$( "#pctCov08" ).click(function() {
  $('#AreaCov').hide();
  $('#pctLegend').show();
  $('#AreaLoss').hide();
  $('#AreaGain').hide();
  $('#NetChangeL').hide();
  $('#pctLossL').hide();
  $('#pctGainL').hide();
  $('#pctChangeL').hide();
  $('#legends').show();
  $('#sce').hide();
});

$( "#pctCove18" ).click(function() {
  $('#AreaCov').hide();
  $('#pctLegend').show();
  $('#AreaLoss').hide();
  $('#AreaGain').hide();
  $('#NetChangeL').hide();
  $('#pctLossL').hide();
  $('#pctGainL').hide();
  $('#pctChangeL').hide();
  $('#legends').show();
  $('#sce').hide();
});

$( "#pctCov08F" ).click(function() {
  $('#AreaCov').hide();
  $('#pctLegend').show();
  $('#AreaLoss').hide();
  $('#AreaGain').hide();
  $('#NetChangeL').hide();
  $('#pctLossL').hide();
  $('#pctGainL').hide();
  $('#pctChangeL').hide();
  $('#legends').show();
  $('#sce').hide();
});

$( "#pctCove18F" ).click(function() {
  $('#AreaCov').hide();
  $('#pctLegend').show();
  $('#AreaLoss').hide();
  $('#AreaGain').hide();
  $('#NetChangeL').hide();
  $('#pctLossL').hide();
  $('#pctGainL').hide();
  $('#pctChangeL').hide();
  $('#legends').show();
  $('#sce').hide();
});

$( "#lostTrees" ).click(function() {
  $('#AreaCov').hide();
  $('#pctLegend').hide();
  $('#AreaLoss').show();
  $('#AreaGain').hide();
  $('#NetChangeL').hide();
  $('#pctLossL').hide();
  $('#pctGainL').hide();
  $('#pctChangeL').hide();
  $('#legends').show();
  $('#sce').hide();
});

$( "#lostTreesF" ).click(function() {
  $('#AreaCov').hide();
  $('#pctLegend').hide();
  $('#AreaLoss').show();
  $('#AreaGain').hide();
  $('#NetChangeL').hide();
  $('#pctLossL').hide();
  $('#pctGainL').hide();
  $('#pctChangeL').hide();
  $('#legends').show();
  $('#sce').hide();
});

$( "#gainedTrees" ).click(function() {
  $('#AreaCov').hide();
  $('#pctLegend').hide();
  $('#AreaLoss').hide();
  $('#AreaGain').show();
  $('#NetChangeL').hide();
  $('#pctLossL').hide();
  $('#pctGainL').hide();
  $('#pctChangeL').hide();
  $('#legends').show();
  $('#sce').hide();
});

$( "#gainedTreesF" ).click(function() {
  $('#AreaCov').hide();
  $('#pctLegend').hide();
  $('#AreaLoss').hide();
  $('#AreaGain').show();
  $('#NetChangeL').hide();
  $('#pctLossL').hide();
  $('#pctGainL').hide();
  $('#pctChangeL').hide();
  $('#legends').show();
  $('#sce').hide();
});

$( "#gainedTreesF" ).click(function() {
  $('#AreaCov').hide();
  $('#pctLegend').hide();
  $('#AreaLoss').hide();
  $('#AreaGain').show();
  $('#NetChangeL').hide();
  $('#pctLossL').hide();
  $('#pctGainL').hide();
  $('#pctChangeL').hide();
  $('#legends').show();
  $('#sce').hide();
});


$( "#NetChange" ).click(function() {
  $('#AreaCov').hide();
  $('#pctLegend').hide();
  $('#AreaLoss').hide();
  $('#AreaGain').hide();
  $('#NetChangeL').show();
  $('#pctLossL').hide();
  $('#pctGainL').hide();
  $('#pctChangeL').hide();
  $('#legends').show();
  $('#sce').hide();
});

$( "#NetChangeF" ).click(function() {
  $('#AreaCov').hide();
  $('#pctLegend').hide();
  $('#AreaLoss').hide();
  $('#AreaGain').hide();
  $('#NetChangeL').show();
  $('#pctLossL').hide();
  $('#pctGainL').hide();
  $('#pctChangeL').hide();
  $('#legends').show();
  $('#sce').hide();
});

$( "#pctLoss" ).click(function() {
  $('#AreaCov').hide();
  $('#pctLegend').hide();
  $('#AreaLoss').hide();
  $('#AreaGain').hide();
  $('#NetChangeL').hide();
  $('#pctLossL').show();
  $('#pctGainL').hide();
  $('#pctChangeL').hide();
  $('#legends').show();
  $('#sce').hide();
});

$( "#pctLossF" ).click(function() {
  $('#AreaCov').hide();
  $('#pctLegend').hide();
  $('#AreaLoss').hide();
  $('#AreaGain').hide();
  $('#NetChangeL').hide();
  $('#pctLossL').show();
  $('#pctGainL').hide();
  $('#pctChangeL').hide();
  $('#legends').show();
  $('#sce').hide();
});

$( "#pctGain" ).click(function() {
  $('#AreaCov').hide();
  $('#pctLegend').hide();
  $('#AreaLoss').hide();
  $('#AreaGain').hide();
  $('#NetChangeL').hide();
  $('#pctLossL').hide();
  $('#pctGainL').show();
  $('#pctChangeL').hide();
  $('#legends').show();
  $('#sce').hide();
});

$( "#pctGainF" ).click(function() {
  $('#AreaCov').hide();
  $('#pctLegend').hide();
  $('#AreaLoss').hide();
  $('#AreaGain').hide();
  $('#NetChangeL').hide();
  $('#pctLossL').hide();
  $('#pctGainL').show();
  $('#pctChangeL').hide();
  $('#legends').show();
  $('#sce').hide();
});

$( "#pctChange" ).click(function() {
  $('#AreaCov').hide();
  $('#pctLegend').hide();
  $('#AreaLoss').hide();
  $('#AreaGain').hide();
  $('#NetChangeL').hide();
  $('#pctLossL').hide();
  $('#pctGainL').hide();
  $('#pctChangeL').show();
  $('#legends').show();
  $('#sce').hide();
});

$( "#pctChangeF" ).click(function() {
  $('#AreaCov').hide();
  $('#pctLegend').hide();
  $('#AreaLoss').hide();
  $('#AreaGain').hide();
  $('#NetChangeL').hide();
  $('#pctLossL').hide();
  $('#pctGainL').hide();
  $('#pctChangeL').show();
  $('#legends').show();
  $('#sce').hide();
});

$( "#S1" ).click(function() {
  $('#AreaCov').hide();
  $('#pctLegend').hide();
  $('#AreaLoss').hide();
  $('#AreaGain').hide();
  $('#NetChangeL').hide();
  $('#pctLossL').hide();
  $('#pctGainL').hide();
  $('#pctChangeL').hide();
  $('#legends').show();
  $('#sce').show();
});

$( "#S2" ).click(function() {
  $('#AreaCov').hide();
  $('#pctLegend').hide();
  $('#AreaLoss').hide();
  $('#AreaGain').hide();
  $('#NetChangeL').hide();
  $('#pctLossL').hide();
  $('#pctGainL').hide();
  $('#pctChangeL').hide();
  $('#legends').show();
  $('#sce').show();
});

$( "#S3" ).click(function() {
  $('#AreaCov').hide();
  $('#pctLegend').hide();
  $('#AreaLoss').hide();
  $('#AreaGain').hide();
  $('#NetChangeL').hide();
  $('#pctLossL').hide();
  $('#pctGainL').hide();
  $('#pctChangeL').hide();
  $('#legends').show();
  $('#sce').show();
});


$( "#S4" ).click(function() {
  $('#AreaCov').hide();
  $('#pctLegend').hide();
  $('#AreaLoss').hide();
  $('#AreaGain').hide();
  $('#NetChangeL').hide();
  $('#pctLossL').hide();
  $('#pctGainL').hide();
  $('#pctChangeL').hide();
  $('#legends').show();
  $('#sce').show();
});

$( "#S5" ).click(function() {
  $('#AreaCov').hide();
  $('#pctLegend').hide();
  $('#AreaLoss').hide();
  $('#AreaGain').hide();
  $('#NetChangeL').hide();
  $('#pctLossL').hide();
  $('#pctGainL').hide();
  $('#pctChangeL').hide();
  $('#legends').show();
  $('#sce').show();
});

window.onload=function(){
  document.getElementById("myModal").click();
};



