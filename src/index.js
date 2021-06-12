'use strict';

const version = "v0.1.2";

function loadPage(url) {
    return fetch(url).then(response => response.text());
}

function addPage(pageText, i, pages) {
    var page = $(pageText);

    const n = pages.length;
    processPageData(page, i+1, n);

    $(document.body).append(page);
}

// TEMP TODO
function processPageData(pageElement, i, n) {
    renderFretboards(pageElement);
    renderIntervalBlocks(pageElement);
    addFooter(pageElement, "Chapter " + String(i) + "/" + String(n) + " " + version);
}

function go() {
    var pages = [
     'pages/intervals.html'
    ,'pages/chords.html'
    ,'pages/scales.html'
    ,'pages/scale_steps.html'
    ,'pages/modes.html'
    ,'songs/kitn.html'
    ].map(loadPage);

    Promise.all(pages).then(pages => pages.forEach(addPage));
}
