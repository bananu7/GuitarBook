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

        const dotY = string * fretHeight;

        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(dotX, dotY, dotSize, 0, 2 * Math.PI, true);
        ctx.fill();

        // draw the marker text     
        ctx.fillStyle = 'white';
        ctx.font = '32px sans-serif';
        ctx.fillText(text, dotX - dotSize * 0.5, dotY + dotSize * 0.5);
    }

    // diagram data
    const startFret = Number($(fretboardElem).attr('start') || 0);
    const endFret = Number($(fretboardElem).attr('end') || 12);
    const fretCount = endFret - startFret;

    // rendering boilerplate
    const boardPixelDensity = 100; // pixels / cm

    const fretWidthInCm = 1.5;
    const fretHeightInCm = 0.5;
    const boardWidth = fretWidthInCm * (fretCount + 2);
    const boardHeight = fretHeightInCm * (6 + 1);

    const cvs = document.createElement('canvas');
    cvs.width = boardWidth * boardPixelDensity;
    cvs.height = boardHeight * boardPixelDensity;
    cvs.style.width  = boardWidth + 'cm';
    cvs.style.height  = boardHeight + 'cm';

    const ctx = cvs.getContext('2d');
    ctx.fillStyle = 'black';

    // drawing constants
    const fretWidth = fretWidthInCm * boardPixelDensity;
    const fretHeight = fretHeightInCm * boardPixelDensity;
    const dotSize = fretHeight / 2;

    // Set up sizing and positioning
    ctx.translate(fretWidth / 2, 0);
    ctx.scale(1, 1);

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
    if (startFret == 0) {
        ctx.moveTo(fretWidth / 20, fretHeight);
        ctx.lineTo(fretWidth / 20, fretHeight * 6);
        ctx.stroke();
    }

    // Draw markers
    $(fretboardElem).children('dot').each(function() {
        var fret = Number($(this).attr('fret'));
        var string = Number($(this).attr('string'));
        var text = $(this).text();

        if (!text) text = getNoteAt(string, fret);

        drawDot(fret, string, text, ctx);
        // console.log('dot at fret ' + fret + ' and string ' + string + ', note ' + text + " " + getNoteAt(string, fret));
    });

    return cvs;
}
