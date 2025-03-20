'use strict';

import '../styles/main.scss';

/**
 * Constants
 */
const API_URL = 'https://d1q0vy0v52gyjr.cloudfront.net/hub.json';
const TILE_IMG_WIDTH = 300;
const TILE_IMG_HEIGHT = 150;
const TILE_IMG_FORMAT = 'jpeg';

/**
 * When the DOM is ready
 */
function onReady() {

    // Fetch and set initial data
    fetch(API_URL)
        .then((response) => response.json())
        .then((data) => {
            const guideData = data;
            const components = [...data.components];

            // Filter out components with no items
            const filteredComponents = components.filter((component) => component.items.length > 0);

            // Build the guide and components if data is available
            if (guideData && components) {
                const guideContainer = document.getElementById('guide');
                guideContainer.insertAdjacentHTML(
                    'afterbegin',
                    `
                    <div class="heading">
                        <h1 class="screen-title">${guideData.name}</h1>
                    </div>
                `
                );

                const componentsContainer = document.getElementById('components');
                filteredComponents.forEach((component) => {
                    componentsContainer.innerHTML +=
                        `
                        <div class="component">
                            <h2 class="component__title">${component.name}</h2>
                            <div class="shows-carousel">` +
                            component.items.map((item) => {
                                return `
                                    <div class="show">
                                        <div class="image">
                                            <img src="${item.visuals.artwork.horizontal_tile.image.path}&size=${TILE_IMG_WIDTH}x${TILE_IMG_HEIGHT}&format=${TILE_IMG_FORMAT}" />
                                            <div class="overlay">
                                                <a href="#" name="${item.visuals.headline}">
                                                <i class="bi bi-play-fill"></i>
                                                </a>
                                            </div>
                                        </div>
                                        <div class="show-info">
                                            <div class="show-name">${item.visuals.headline}</div>
                                            <div class="show-rating">${item.entity_metadata.rating.code}</div>
                                        </div>
                                    </div>
                                `;
                            }).join('');
                            +`</div>
                        </div>`;
                });
            }
        }).catch((error) => {
            console.error(error);
        });
}

/**
 * Check if the DOM is Ready
 */
if (document.readyState !== 'loading') {
    onReady();
} else {
    document.addEventListener('DOMContentLoaded', onReady);
}
