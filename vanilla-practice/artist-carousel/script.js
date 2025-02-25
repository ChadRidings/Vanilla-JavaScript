'use strict';

function onReady() {
    /**
     * ARTIST CAROUSEL
     */
    const carousel = document.querySelector('.artist-carousel');
    const leftChevron = document.querySelector('.bi-chevron-left');
    const rightChevron = document.querySelector('.bi-chevron-right');

    const itemWidth = 150; // width of each artist card
    const scrollAmount = itemWidth * 4; // scroll 4 items at a time

    leftChevron.addEventListener('click', () => {
        const currentScrollLeft = carousel.scrollLeft;
        const newScrollLeft = currentScrollLeft - scrollAmount;

        if (newScrollLeft < 0) {
            carousel.scrollLeft = 0;
        } else {
            carousel.scrollLeft = newScrollLeft;
        }
    });

    rightChevron.addEventListener('click', () => {
        const currentScrollLeft = carousel.scrollLeft;
        const newScrollLeft = currentScrollLeft + scrollAmount;
        const lastArtistCard = carousel.children[carousel.children.length - 1];
        const lastArtistCardRight = lastArtistCard.offsetLeft + lastArtistCard.offsetWidth;

        if (lastArtistCardRight > carousel.offsetLeft + carousel.offsetWidth + newScrollLeft) {
            carousel.scrollLeft = newScrollLeft;
        } else {
            carousel.scrollLeft = lastArtistCardRight - carousel.offsetWidth;
        }
    });
}

if (document.readyState !== 'loading') {
    onReady();
} else {
    document.addEventListener('DOMContentLoaded', onReady);
}
