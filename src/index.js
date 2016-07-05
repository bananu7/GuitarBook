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
    $(pageElement).find('fretboard').replaceWith(function(f) {
        return $('<span>fretboard diagram</span>');
    });
}

function go() {
    ['pages/intervals.html'
    ,'pages/fretboard.html'].forEach(addPage);
}