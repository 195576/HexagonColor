$(function () {

    $('#paletteFrame').hide();
    $('#pickColorFrame').hide();
    $('#afterSelection').hide();
    // $('#inputSubmitBtn').click(function (evt){
    //
    //     evt.preventDefault();
    //     $('#paletteFrame').slideDown(1000);
    // });
});

function showSchemas() {
    $('#pickColorFrame').slideDown(1000);
}

function hideSchemas() {
    $('#pickColorFrame').slideUp(500);
}

var resultPaletteDescription = [];

function submitBtnOnClick() {
    switch ($('input[name=inlineRadioOptions]:checked', '#radioBtnsForm').val()) {
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

var selectedSchema;

function schemaSelection(index) {
    $("#schema" + selectedSchema).css("background-color", "");
    selectedSchema = index;
    $('#schema' + index).css("background-color", "#9c9c9c");
}

var points = [];
var featuresCounter;

$('#InputFile').ready(function () {
    d3.json("geo.json", function (error, data) {
        nodes = data.features;

        // Stare ładowanie plików json

        // var propertiesArray = [];
        //
        // var li, i, noFeatures,
        // list = document.getElementById("list");
        // noFeatures = data.features.length;
        //
        // var feature, property, numberOfProperties;
        // numberOfProperties = 0;
        //
        // feature = data.features[0].properties;
        // for (property in feature) {
        //     if (feature.hasOwnProperty(property)) {
        //         numberOfProperties++;
        //     }
        // }
        //
        // for (i = 0; i < noFeatures; i++) {
        //     feature = data.features[i].properties;
        //     for (property in feature) {
        //         if (feature.hasOwnProperty(property)) {
        //             // numberOfProperties++;
        //             propertiesArray.push(feature[property]);
        //             console.log(feature[property]);
        //         }
        //     }
        // }
        featuresCounter = data.features.length;
        document.getElementById('numberOfFeatures').innerHTML = 'There are ' + data.features.length + ' features in this file.';

        loadDataFromFile(data);


        // var liProperty, ul;
        // for (i = 0; i< propertiesArray.length; i++) {
        //     li = document.createElement("li");
        //     li.innerHTML = i + 1;
        //
        //     ul = document.createElement("ul");
        //
        //     liProperty = document.createElement("li");
        //     liProperty.innerHTML = propertiesArray[i];
        //
        //     ul.appendChild(liProperty);
        //     li.appendChild(ul);
        //     list.appendChild(li);
        // }
        //document.body.appendChild(list);
        // $("#list").innerHTML = list;
    });
});

function createSequentialPalette() {
    $('#palette').html("");
    var numberOfColours = $('#nOdataClasses').val();
    var palette = "<div><svg height=\"25\" width=\"" + numberOfColours * 25 + "\">";
    var startColor = "white";
    var stopColor = "red";

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
    }

    var color = d3.scaleLinear()
        .domain([0, 10 * numberOfColours])
        .range([startColor, stopColor]);

    var i;
    for (i = 0; i < numberOfColours; i++) {
        resultPaletteDescription[i] = color(10 * i);
        palette += '<rect fill="' + resultPaletteDescription[i] + '" width="25" height="25" x="' + i * 25 + '"></rect>';
    }
    palette += "</svg></div>";
    var divElement = document.createElement('div');
    divElement.innerHTML = palette;
    $('#palette')[0].appendChild(divElement);

    // for (i = 0; i < numberOfColours; ++i) {
    //     document.getElementById("description").innerHTML += resultPaletteDescription[i] + ', ' + '<br>';
    // }

    $('#paletteFrame').slideDown(1000);
}

function createQualitativePalette() {
    $('#palette').html("");
    var numberOfColours = $('#nOdataClasses').val();
    var palette = "<div class=\"paletteSelection\"><svg width=\"15\" height=\"" + numberOfColours * 15 + "\">";


    var color = d3.scaleOrdinal(d3.schemeAccent);

    var i;
    for (i = 0; i < numberOfColours; i++) {
        palette += '<rect fill="' + color(10 * i) + '" width="15" height="15" y="' + i * 15 + '"></rect>';
    }
    palette += "</svg></div>";
    var divElement = document.createElement('div');
    divElement.innerHTML = palette;
    $('#palette')[0].appendChild(divElement);

    $('#paletteFrame').slideDown(1000);
}

function createDivergingPalette() {
    $('#palette').html("");
    var numberOfColours = $('#nOdataClasses').val();
    var palette = "<div class=\"paletteSelection\"><svg width=\"15\" height=\"" + numberOfColours * 15 + "\">";


    var color = d3.scaleSequential(d3.interpolatePiYG);

    var i;
    for (i = 0; i < numberOfColours; i++) {
        palette += '<rect fill="' + color(10 * i) + '" width="15" height="15" y="' + i * 15 + '"></rect>';
    }
    palette += "</svg></div>";
    var divElement = document.createElement('div');
    divElement.innerHTML = palette;
    $('#palette')[0].appendChild(divElement);

    $('#paletteFrame').slideDown(1000);
}

function loadDataFromFile(data) {

    var propertyKeys = Object.keys(data.features[0].properties);
    var ret = propertyKeys.map(function (key) {
        return data.features.map(function (feature) {
            return feature.properties[key]
        });
    });
    var tb = document.querySelector("#summary");
    var tbody = tb.querySelector("tbody");
    tbody.innerHTML = "";
    ret.forEach(function (v, i) {
        var row = document.createElement("tr");
        var uniq = _.uniq(v).length === v.length;
        var type = _.uniq(v.map(function (x) {
            return typeof x
        }));
        var first3 = _.uniq(v).slice(0, 3);
        var min, max, avg, tot, count;
        if (type.length === 1 && type[0] === "number") {
            min = _.min(v);
            max = _.max(v);
            tot = _.sum(v).toFixed(4);
            count = v.length;
            avg = (tot / count).toFixed(4);
        }
        row.onclick = function () {
            onTableRowSelect(row);
        };
        var results = [propertyKeys[i], first3.join(", "), uniq, type.join(", "), min, avg, max, count];
        var classes = ["property", "first3", "unique", "types", "min", "avg", "max", "count"];
        results.forEach(function (r, j) {
            var cell = document.createElement("td");
            cell.classList.add(classes[j]);
            cell.innerHTML = r === undefined ? "-" : r.toString();
            row.appendChild(cell);
        });
        if (uniq && type.length === 1) {
            if (type[0] === "number")
                row.classList.add("highlight1");
            else
                row.classList.add("highlight2");
        }
        tbody.appendChild(row);
    });
}

var onTableRowSelect = function (row) {
    $('#inlineRadio1').attr('checked', false);
    $('#inlineRadio2').attr('checked', false);
    $('#inlineRadio3').attr('checked', false);
    if (row.childNodes[3].innerHTML !== 'number') {
        if (row.childNodes[3].innerHTML === 'string') {
            $('#inlineRadio3').click();
        }
    } else {
        if (row.childNodes[2].innerHTML === 'true') {
            $('#inlineRadio2').click();
        } else {
            $('#inlineRadio1').click();
        }
    }
    if (featuresCounter <= 10) {
        $('#nOdataClasses').val(featuresCounter);
    }
    else {
        var i = 10;
        for (i; i >= 2; --i) {
            if (featuresCounter % i === 0) {
                $('#nOdataClasses').val(i);
                break;
            }
        }
        if (i < 2) {
            // console.log("pierwsza");
        }
    }
    $('#afterSelection').slideDown(500);
};