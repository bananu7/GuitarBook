'use strict';

function go() {
    $.get('pages/intervals.html', function (data) {
        $(document.body).append($(data));
    });
}