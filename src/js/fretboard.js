"use strict";

function renderFretboards(pageElement) {
    $(pageElement).find('fretboard').replaceWith(function(f) {
        return createFretboardImage(this);
    });
}

function createFretboardImage(fretboardElem) {
    function drawDot(fret, string, text, ctx){
        var dotX = fret * fretWidth;
        // subtract half of fret width to put it in the middle
        if (fret != 0) {
            dotX -= (fretWidth * 0.5);
        }

        var dotY = string * fretHeight;

        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(dotX, dotY, dotSize, 0, 2 * Math.PI, true);
        ctx.fill();

        // draw the marker text     
        ctx.fillStyle = 'white';
        ctx.font = '8px sans-serif';
        ctx.fillText(text, dotX - dotSize * 0.5, dotY + dotSize * 0.5);
    }

    // drawing constants
    var fretWidth = 50;
    var fretHeight = 10;
    var dotSize = 5;

    // rendering boilerplate
    var cvs = document.createElement('canvas');
    cvs.width = 4000;
    cvs.height = 1000;
    cvs.style.width  = '1000px';
    cvs.style.height  = '250px';
    var ctx = cvs.getContext('2d');
    ctx.fillStyle = 'black';

    // diagram data
    var startFret = $(fretboardElem).attr('start') || 0;
    var endFret = $(fretboardElem).attr('end') || 12;
    var fretCount = endFret - startFret;

    // Set up sizing and positioning
    ctx.translate(10, 0);
    ctx.scale(4, 4);

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

    // Draw markers
    $(fretboardElem).children('dot').each(function() {
        var fret = $(this).attr('fret');
        var string = $(this).attr('string');
        var text = $(this).text();
        drawDot(fret, string, text, ctx);
        console.log('dot at fret ' + fret + ' and string ' + string);
    });

    return cvs;
}