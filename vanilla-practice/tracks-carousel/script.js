'use strict';

function onReady() {
    /**
     * TRACKS CAROUSEL
     */
    const tracksCarousel = document.querySelector('.tracks-carousel');
    const tracksLeftChevron = document.querySelector('.tracks-controls .bi-chevron-left');
    const tracksRightChevron = document.querySelector('.tracks-controls .bi-chevron-right');

    const tracksItemsWidth = 300; // width of each track card
    const tracksScrollAmount = tracksItemsWidth * 1; // scroll 1 column of items at a time

    tracksLeftChevron.addEventListener('click', () => {
        const currentScrollLeft = tracksCarousel.scrollLeft;
        const newScrollLeft = currentScrollLeft - tracksScrollAmount;

        if (newScrollLeft < 0) {
            tracksCarousel.scrollLeft = 0;
        } else {
            tracksCarousel.scrollLeft = newScrollLeft;
        }
    });

    tracksRightChevron.addEventListener('click', () => {
        const currentScrollLeft = tracksCarousel.scrollLeft;
        const newScrollLeft = currentScrollLeft + tracksScrollAmount;
        const lastArtistCard = tracksCarousel.children[tracksCarousel.children.length - 1];
        const lastArtistCardRight = lastArtistCard.offsetLeft + lastArtistCard.offsetWidth;

        if (lastArtistCardRight > tracksCarousel.offsetLeft + tracksCarousel.offsetWidth + newScrollLeft) {
            tracksCarousel.scrollLeft = newScrollLeft;
        } else {
            tracksCarousel.scrollLeft = lastArtistCardRight - tracksCarousel.offsetWidth;
        }
    });
}

if (document.readyState !== 'loading') {
    onReady();
} else {
    document.addEventListener('DOMContentLoaded', onReady);
}
