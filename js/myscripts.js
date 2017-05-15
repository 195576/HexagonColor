$(function() {

    $('#paletteFrame').hide();

    $('#inputSubmitBtn').click(function (evt){

        evt.preventDefault();
        $('#paletteFrame').slideDown(1000);
        getradio();
    });
});


function getradio(){

    var x = $('input[name=inlineRadioOptions]:checked', '#radioBtnsForm').val();
    if ( x.localeCompare('option3') == 0 ){

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