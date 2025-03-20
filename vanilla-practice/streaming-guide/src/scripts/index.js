'use strict';

import '../styles/main.scss';

// Constants
const API_URL = 'https://d1q0vy0v52gyjr.cloudfront.net/hub.json';
const TILE_IMG_WIDTH = 300;
const TILE_IMG_HEIGHT = 150;
const TILE_IMG_FORMAT = 'jpeg';

// When the DOM is ready
function onReady() {
    let guideData = {};
    let components = [];

    /**
     * Fetch and set initial data
     */
    fetch(API_URL)
        .then((response) => response.json())
        .then((data) => {
            guideData = data;
            components = [...data.components];

            /**
             * Build the guide and components if data is available
             */
            if (guideData && components) {
                console.log('Guide Data: ', guideData);
                console.log('Guide Components Data: ', components);

                // render the guide
                const guideContainer = document.getElementById('guide');
                guideContainer.insertAdjacentHTML(
                    'afterbegin',
                    `
                    <div class="heading">
                        <h1 class="screen-title">${guideData.name}</h1>
                    </div>
                `
                );

                // render the components
                const componentsContainer = document.getElementById('components');
                components.forEach((component) => {
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
                                            <div class="description">${item.visuals.body}</div>
                                        </div>
                                    </div>
                                `;
                            }).join('');
                            +`</div>
                        </div>`;
                });
            }
        });
}

// Check if the DOM is Ready
if (document.readyState !== 'loading') {
    onReady();
} else {
    document.addEventListener('DOMContentLoaded', onReady);
}
