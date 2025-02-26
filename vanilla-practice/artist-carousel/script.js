'use strict';

function onReady() {
    /**
     * ARTIST CAROUSEL
     */
    const artistCarousel = document.querySelector('.artist-carousel');
    const artistLeftChevron = document.querySelector('.artist-controls .bi-chevron-left');
    const artistRightChevron = document.querySelector('.artist-controls .bi-chevron-right');

    const artistItemWidth = 150; // width of each artist card
    const artistScrollAmount = artistItemWidth * 4; // scroll 4 items at a time

    artistLeftChevron.addEventListener('click', () => {
        const currentScrollLeft = artistCarousel.scrollLeft;
        const newScrollLeft = currentScrollLeft - artistScrollAmount;

        if (newScrollLeft < 0) {
            artistCarousel.scrollLeft = 0;
        } else {
            artistCarousel.scrollLeft = newScrollLeft;
        }
    });

    artistRightChevron.addEventListener('click', () => {
        const currentScrollLeft = artistCarousel.scrollLeft;
        const newScrollLeft = currentScrollLeft + artistScrollAmount;
        const lastArtistCard = artistCarousel.children[artistCarousel.children.length - 1];
        const lastArtistCardRight = lastArtistCard.offsetLeft + lastArtistCard.offsetWidth;

        if (lastArtistCardRight > artistCarousel.offsetLeft + artistCarousel.offsetWidth + newScrollLeft) {
            artistCarousel.scrollLeft = newScrollLeft;
        } else {
            artistCarousel.scrollLeft = lastArtistCardRight - artistCarousel.offsetWidth;
        }
    });
}

if (document.readyState !== 'loading') {
    onReady();
} else {
    document.addEventListener('DOMContentLoaded', onReady);
}
