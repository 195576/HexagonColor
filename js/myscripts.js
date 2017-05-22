$(function() {

    $('#paletteFrame').hide();

    $('#inputSubmitBtn').click(function (evt){

        evt.preventDefault();
        $('#paletteFrame').slideDown(1000);
        getradio();
    });
});


function submitBtnOnClick () {
    switch ($('input[name=inlineRadioOptions]:checked', '#radioBtnsForm').val()){
        case 'option1':
            createSequentialPalette();
            break;
        case 'option2':
            createDivergingPalette();
            break;
        case 'option3':
            createQualitativePalette();
            break;
    }
}

function getradio(){

    var x = $('input[name=inlineRadioOptions]:checked', '#radioBtnsForm').val();
    if ( x.localeCompare('option3') === 0 ){

        var n = 5;
        var i;
        var colorR = [];
        var colorG = [];
        var colorB = [];
        for (i = 0; i < n; i++){
            colorR[i] = parseInt(Math.random() * 255);
            colorG[i] = parseInt(Math.random() * 255);
            colorB[i] = parseInt(Math.random() * 255);
        }

        var idArray = ["aa", "bb", "cc", "dd", "ee"];
        for (i = 0; i < n; i++) {
            $('#' + idArray[i]).attr("fill", "rgb(" + colorR[i] + "," + colorG[i] + "," + colorB[i] + ")");
        }

        var palette = "<div class=\"paletteSelection\"><svg width=\"15\" height=\"75\">";

        for (i = 0; i < n; i++){
            palette += '<rect fill="rgb(' + colorR[i] + ',' + colorG[i] + ',' + colorB[i] + ')" width="15" height="15" y="' + i * 15 + '"></rect>'
        }
        palette += "</svg></div>";
        var divElement  = document.createElement('div');
        divElement.innerHTML = palette;
        $('#palette')[0].appendChild(divElement);
    }
}

var selectedSchema;

function schemaSelection (index) {
    $("#schema" + selectedSchema).css("background-color", "");
    selectedSchema = index;
    $('#schema' + index).css("background-color", "#9c9c9c");
}

var points = [];

$('#InputFile').ready(function () {
    d3.json("geo.json", function (error, data) {
        nodes = data.features;

        var propertiesArray = [];

        var li, i, noFeatures,
        list = document.getElementById("list");
        noFeatures = data.features.length;

        var feature, property, numberOfProperties;
        numberOfProperties = 0;

        feature = data.features[0].properties;
        for (property in feature) {
            if (feature.hasOwnProperty(property)) {
                numberOfProperties++;
            }
        }

        for (i = 0; i < noFeatures; i++) {
            feature = data.features[i].properties;
            for (property in feature) {
                if (feature.hasOwnProperty(property)) {
                    // numberOfProperties++;
                    propertiesArray.push(feature[property]);
                    console.log(feature[property]);
                }
            }
        }

        document.getElementById('numberOfProperties').innerHTML = numberOfProperties;

        var liProperty, ul;
        for (i = 0; i< propertiesArray.length; i++) {
            li = document.createElement("li");
            li.innerHTML = i + 1;

            ul = document.createElement("ul");

            liProperty = document.createElement("li");
            liProperty.innerHTML = propertiesArray[i];

            ul.appendChild(liProperty);
            li.appendChild(ul);
            list.appendChild(li);
        }
        //document.body.appendChild(list);
        $("#list").innerHTML = list;
    });
});

function createSequentialPalette() {
    var numberOfColours = $('#nOdataClasses').val();
    var palette = "<div class=\"paletteSelection\"><svg width=\"15\" height=\"" + numberOfColours * 15 + "\">";
    var startColor = "white";
    var stopColor="red";

    switch (selectedSchema) {
        case 1:
            startColor = "white";
            stopColor = "rgb(179,0,0)";
            break;
        case 2:
            startColor = "white";
            stopColor = "green";
            break;
        case 3:
            startColor = "white";
            stopColor = "darkblue";
            break;
        case 4:
            startColor = 'rgb(255,255,178)';
            stopColor = "rgb(179,0,0)";
            break;
    };

    var color = d3.scaleLinear()
        .domain([0, 10 * numberOfColours])
        .range([startColor, stopColor]);

    var i;
    for (i = 0; i < numberOfColours; i++) {
        palette += '<rect fill="' + color(10*i) + '" width="15" height="15" y="' + i * 15 + '"></rect>';
    }
    palette += "</svg></div>";
    var divElement  = document.createElement('div');
    divElement.innerHTML = palette;
    $('#palette')[0].appendChild(divElement);

    $('#paletteFrame').slideDown(1000);
}

function createQualitativePalette() {
    var numberOfColours = $('#nOdataClasses').val();
    var palette = "<div class=\"paletteSelection\"><svg width=\"15\" height=\"" + numberOfColours * 15 + "\">";


    var color = d3.scaleOrdinal(d3.schemeAccent);

    var i;
    for (i = 0; i < numberOfColours; i++) {
        palette += '<rect fill="' + color(10*i) + '" width="15" height="15" y="' + i * 15 + '"></rect>';
    }
    palette += "</svg></div>";
    var divElement  = document.createElement('div');
    divElement.innerHTML = palette;
    $('#palette')[0].appendChild(divElement);

    $('#paletteFrame').slideDown(1000);
}

function createDivergingPalette() {
    var numberOfColours = $('#nOdataClasses').val();
    var palette = "<div class=\"paletteSelection\"><svg width=\"15\" height=\"" + numberOfColours * 15 + "\">";


    var color = d3.scaleSequential(d3.interpolatePiYG);

    var i;
    for (i = 0; i < numberOfColours; i++) {
        palette += '<rect fill="' + color(10*i) + '" width="15" height="15" y="' + i * 15 + '"></rect>';
    }
    palette += "</svg></div>";
    var divElement  = document.createElement('div');
    divElement.innerHTML = palette;
    $('#palette')[0].appendChild(divElement);

    $('#paletteFrame').slideDown(1000);
}