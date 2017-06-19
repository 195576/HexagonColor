$(function () {
    $('#paletteFrame').hide();
    $('#pickColorFrame').hide();
    $('#afterSelection').hide();
    $('#schemaPickerForQualitative').hide();
});

function showSequentialSchemas() {
    $('#pickColorFrame').slideDown(1000);
}

function hideSequentialSchemas() {
    $('#pickColorFrame').slideUp(500);
}

function showQualitativeSchema() {
    $('#schemaPickerForQualitative').slideDown(1000);
}

function hideQualitativeSchema() {
    $('#schemaPickerForQualitative').slideUp(500);
}

function showDivergingSchema() {
    $('#schemaPickerForDiverging').slideDown(1000);
}

function hideDivergingSchema() {
    $('#schemaPickerForDiverging').slideUp(500);
}

function qualitativeOnChoose() {
    hideSequentialSchemas();
    hideDivergingSchema();
    showQualitativeSchema();
}

function sequentialOnChoose() {
    hideQualitativeSchema();
    hideDivergingSchema();
    showSequentialSchemas();
}

function divergingOnChoose() {
    hideQualitativeSchema();
    hideSequentialSchemas();
    showDivergingSchema();
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

var toJson = function () {
    return JSON.stringify({
        selectedRow: selectedRow,
        numberOfDataClasses: $('#nOdataClasses').val(),
        natureOfData: $('input[name=inlineRadioOptions]:checked', '#radioBtnsForm').val(),
        selectedSchema: this.selectedSchema
    });
};

var serialize = function () {
    $('#preId').html(toJson());
};

var selectedSchema;

function schemaSelection(index) {
    $('#paletteFrame').slideUp(500);
    $("#schema" + selectedSchema).css("background-color", "");
    selectedSchema = index;
    $('#schema' + index).css("background-color", "#9c9c9c");
}

var qualitativeSelectedSchema;

function qualitativeSchemaSelection (index) {
    $('#paletteFrame').slideUp(500);
    $("#qualitativeSchema" + qualitativeSelectedSchema).css("background-color", "");
    qualitativeSelectedSchema = index;
    $('#qualitativeSchema' + index).css("background-color", "#9c9c9c");
}

var divergingSelectedSchema;

function divergingSchemaSelection (index) {
    $('#paletteFrame').slideUp(500);
    $("#divergingSchema" + divergingSelectedSchema).css("background-color", "");
    divergingSelectedSchema = index;
    $('#divergingSchema' + index).css("background-color", "#9c9c9c");
}

var featuresCounter;

$('#InputFile').ready(function () {
    d3.json("geo.json", function (error, data) {
        nodes = data.features;
        featuresCounter = data.features.length;
        document.getElementById('numberOfFeatures').innerHTML = 'There are ' + data.features.length + ' features in this file.';
        loadDataFromFile(data);
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
            stopColor = "rgb(0,109,44)";
            break;
        case 3:
            startColor = "white";
            stopColor = "rgb(4,90,141)";
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
    var palette = "<div><svg height=\"25\" width=\"" + numberOfColours * 25 + "\">";

    var color1 = d3.schemeAccent; // 8
    var color2 = d3.schemeSet1; // 9, ale OK
    var color3 = d3.schemeDark2; // 8
    var color4 = d3.schemePaired; // 12
    var color5 = d3.schemeSet3; // 12

    var colorsArray = [color1, color2, color3, color4, color5];

    var chosenSchema = colorsArray[qualitativeSelectedSchema-1];

    if (chosenSchema .length === 8) {
        chosenSchema .push('rgb(214,12,12)');
    }

    var i;
    for (i = 0; i < numberOfColours; i++) {
        palette += '<rect fill="' + chosenSchema [i] + '" width="25" height="25" x="' + i * 25 + '"></rect>';
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

    var palette = "<div><svg height=\"25\" width=\"" + numberOfColours * 25 + "\">";

    var color1 = [];
    var color2 = [];
    var color3 = [];
    var color4 = [];

    var inverse = 1 / numberOfColours;
    for (i = 0; i < numberOfColours; i += inverse) {
        color1.push(d3.interpolateBrBG(i));
        color2.push(d3.interpolateRdYlGn(i));
        color3.push(d3.interpolateSpectral(i));
        color4.push(d3.interpolatePiYG(i));
    }

    var colorsArray = [color3, color4, color2, color1];

    var chosenSchema = colorsArray[divergingSelectedSchema - 1];
    // var randomlyChosenPalette = colorsArray[Math.floor(Math.random() * (3 + 1))];

    var i;
    for (i = 0; i < numberOfColours; i++) {
        palette += '<rect fill="' + chosenSchema[i] + '" width="25" height="25" x="' + i * 25 + '"></rect>';
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
        row.id = "row" + i;
        row.onclick = function () {
            onTableRowSelect(row, i);
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

var selectedRow;

var onTableRowSelect = function (row, index) {

    $("#row" + selectedRow).css("background-color", "");
    selectedRow = index;
    $('#row' + index).css("background-color", "#0098BA");

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

//