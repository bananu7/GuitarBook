"use strict";

function renderFretboards(pageElement) {
    $(pageElement).find('fretboard').replaceWith(function(f) {
        return createFretboardImage(this);
    });
}

function createFretboardImage(fretboardElem) {
    function drawDot(fret, string, ctx){
        var dotX = fret * fretWidth;
        // subtract half of fret width to put it in the middle
        if (fret != 0) {
            dotX -= (fretWidth * 0.5);
        }

        var dotY = string * fretHeight;

        ctx.beginPath();
        ctx.arc(dotX, dotY, dotSize, 0, 2 * Math.PI, true);
        ctx.fill();
    }

    // drawing constants
    var fretWidth = 50;
    var fretHeight = 10;
    var dotSize = 5;

    // rendering boilerplate
    var cvs = document.createElement('canvas');
    cvs.width = 2000;
    var ctx = cvs.getContext('2d');

    // diagram data
    var startFret = $(fretboardElem).attr('start') || 0;
    var endFret = $(fretboardElem).attr('end') || 12;
    var fretCount = endFret - startFret;

    // Draw strings
    for (var string = 0; string < 6; string++) {
        var stringY = fretHeight * (string + 1);
        ctx.moveTo(0, stringY);
        ctx.lineTo(fretCount * fretWidth, stringY);
        ctx.stroke();
    }

    // Draw frets
    for (var fret = startFret; fret <= endFret; fret++) {
        var fretX = fretWidth * fret;
        ctx.moveTo(fretX, fretHeight);
        ctx.lineTo(fretX, fretHeight * 6);
        ctx.stroke();
    }

    // Draw dots
    $(fretboardElem).children('dot').each(function() {
        var fret = $(this).attr('fret');
        var string = $(this).attr('string');
        drawDot(fret, string, ctx);
        console.log('dot at fret ' + fret + ' and string ' + string);
    });

    return cvs;
}