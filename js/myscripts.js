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