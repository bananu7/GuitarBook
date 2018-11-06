'use strict';

function loadPage(url) {
    return fetch(url).then(response => response.text());
}

function addPage(pageText) {
    var page = $(pageText);
    processPageData(page);
    $(document.body).append(page);
}

// TEMP TODO
function processPageData(pageElement) {
    renderFretboards(pageElement);
    renderIntervalBlocks(pageElement);
}

function go() {
    var pages = ['pages/intervals.html'
    ,'pages/chords.html'
    ,'pages/scales.html'
    ,'pages/modes.html'
    ,'songs/pretender.html'
    ].map(loadPage);

    Promise.all(pages).then(pages => pages.forEach(addPage));
}
