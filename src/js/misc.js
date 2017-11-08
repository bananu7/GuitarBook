"use strict";

function renderIntervalBlocks(pageElement) {
    $(pageElement).find('intervals').replaceWith(function(f) {
        return createIntervalBlocks(this);
    });
}

function createIntervalBlocks(elem) {
    console.log('c i b');
    const list = document.createElement('div');
    list.className += 'interval-list';

    $(elem).text().split('').forEach(interval => {
        console.log(interval);
        const block = document.createElement('span');
        block.className += interval;
        list.append(block);
    });

    console.log(list);
    return list;
}