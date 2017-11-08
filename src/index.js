'use strict';

function addPage(url) {
    $.get(url, function (data) {
        var page = $(data);
        processPageData(page);
        $(document.body).append(page);
    });
}

// TEMP TODO
function processPageData(pageElement) {
    renderFretboards(pageElement);
    renderIntervalBlocks(pageElement);
}

function go() {
    ['pages/intervals.html'
    ,'pages/fretboard.html'
    ,'pages/chords.html'
    ,'pages/scales.html'
    ,'pages/songs.html'
    ].forEach(addPage);
}