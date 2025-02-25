'use strict';

function onReady() {
    /**
     * ARTIST CAROUSEL
     * 
     * When the left chevron is clicked, the carousel scrolls to the left by the scrollAmount (4 items at a time).
     * If the carousel is already at the beginning, it doesn't scroll any further.
     * 
     * When the right chevron is clicked, the carousel scrolls to the right by the scrollAmount (4 items at a time).
     * If the carousel is already at the end, it doesn't scroll any further.
     * 
     * You can adjust the itemWidth and scrollAmount variables to change the width of each artist card and the number
     * of items to scroll at a time.
     */
    const carousel = document.querySelector('.artist-carousel');
    const leftChevron = document.querySelector('.artist-header .artist-controls .bi-chevron-left');
    const rightChevron = document.querySelector('.artist-header .artist-controls .bi-chevron-right');

    const itemWidth = 150; // width of each artist card
    const scrollAmount = itemWidth * 4; // scroll 4 items at a time

    leftChevron.addEventListener('click', () => {
        const currentScrollLeft = carousel.scrollLeft;
        const newScrollLeft = currentScrollLeft - scrollAmount;

        if (newScrollLeft >= 0) {
            carousel.scrollLeft = newScrollLeft;
        }
    });

    rightChevron.addEventListener('click', () => {
        const currentScrollLeft = carousel.scrollLeft;
        const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
        const newScrollLeft = currentScrollLeft + scrollAmount;

        if (newScrollLeft <= maxScrollLeft) {
            carousel.scrollLeft = newScrollLeft;
        }
    });
}

if (document.readyState !== 'loading') {
    onReady();
} else {
    document.addEventListener('DOMContentLoaded', onReady);
}
