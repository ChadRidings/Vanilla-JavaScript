'use strict';

function onReady() {
    // code goes here
}

if (document.readyState !== 'loading') {
    onReady();
} else {
    document.addEventListener('DOMContentLoaded', onReady);
}
