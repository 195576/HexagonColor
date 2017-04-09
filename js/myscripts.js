$(function() {

    $('#inputSubmitBtn').click(function (){
        $('#paletteFrame').slideToggle(300);
        getradio();
    });
});

//
// TODO Problem polega na tym, że strona po wywołaniu jakiejkolwiek funkcji zostaje przeładowana do pierwotnego stanu
//
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

        alert($('#aa').attr('fill'));

        // for (var i = 0; i < n; i++){
        //   TODO zapisać idiki do tablicy i wywoływać zmiany w pętli
        // }
        $('#aa').attr("fill", "rgb(" + colorR[0] + "," + colorG[0] + "," + colorB[0] + ")"); // TODO to działa na 100 %
        alert($('#aa').attr('fill'));

        var palette = $('#palette').innerHTML;

        palette += "<div class=\"paletteSelection\"><svg width=\"15\" height=\"75\">";

        for (i = 0; i < n; i++){
            // TODO sprawdzić czy to zdiała, jesli tak to kontynuować
            palette += '<rect fill="rgb(215,25,28)" width="15" height="15" y="' + i * 15 + '"></rect>'
        }
        palette += "</svg></div>";

    }
}
