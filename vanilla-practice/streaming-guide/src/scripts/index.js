'use strict';

import '../styles/main.scss';
import {
    API_URL,
    TILE_IMG_WIDTH,
    TILE_IMG_HEIGHT,
    TILE_IMG_FORMAT
} from './constants';

/**
 * When the DOM is ready
 */
function onReady() {
    // This holds the clean data we serve to the render
    let allComponents = [];

    // Fetch and set initial data
    fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
        if (data) {
            processData(data);
        }
    }).catch((error) => {
        console.error(error);
    });

    // Process data for the renders
    const processData = (data) => {
        renderHeading(data);

        // Filter components with and without items
        const components = [...data.components];
        const filteredComponents = components.filter((component) => component.items.length > 0);
        const missingCollections = components.filter((component) => component.items.length === 0);
        allComponents = [...filteredComponents];

        const processMissingCollection = async () => {
            // use promises to assure new collections have been added to the allComponents array before calling renderCollections
            const promises = missingCollections.map(async (collection) => {
                try {
                    const response = await fetch(collection.href);
                    const data = await response.json();
                    allComponents.push(data);
                } catch (error) {
                    console.error(error);
                }
            });
            
            await Promise.all(promises);
            renderCollections(allComponents);
        }

        processMissingCollection();
    }

    // Render heading data
    const renderHeading = (data) => {
        const guideContainer = document.getElementById('guide');
        guideContainer.insertAdjacentHTML(
            'afterbegin',
            `
            <div class="heading">
                <h1 class="screen-title">${data.name}</h1>
            </div>
        `
        );
    };

    // Render collection data (also includes modal functionality)
    const renderCollections = (collections) => {
        const modalContainer = document.getElementById('modal-container');
        const componentsContainer = document.getElementById('components');

        collections.forEach((component, index) => {
            componentsContainer.innerHTML +=
                `
                <div class="component">
                    <h2 class="component__title">${component.name}</h2>
                    <div class="shows-carousel">` +
                    component.items.map((item) => {
                        return `
                            <div class="show" data-id="${item.id}" tabindex="${index}">
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
                                    <div class="show-rating">${item.entity_metadata.rating.code ? item.entity_metadata.rating.code : '&nbsp;'}</div>
                                </div>
                            </div>
                        `;
                    }).join('');
                    +`</div>
                </div>`;
        });

        // Function to filter collections array and populate modal content
        const populateModalContent = (collections, id) => {
            const component = collections.find((component) => {
                return component.items.find((item) => item.id === id);
            });

            const headline = component.items.find((item) => item.id === id).visuals.headline;
            const subtitle = component.items.find((item) => item.id === id).visuals.subtitle;
            const description = component.items.find((item) => item.id === id).visuals.body;
            const imagePath = component.items.find((item) => item.id === id).visuals.artwork.horizontal_tile.image.path;

            const modalContent = document.getElementById('modal-content');
            modalContent.innerHTML = `
                <div class="container-50">
                    <div class="image">
                        <img src="${imagePath}&size=600x300&format=jpeg" />
                    </div>
                </div>
                <div class="container-50">
                    <div class="info">
                        <div class="close" id="close-modal"><i class="bi bi-x-circle"></i></div>
                        <h2>${headline ? headline : ''}</h2>
                        <p>${description ? description : ''}</p>
                        <p>${subtitle ? subtitle : ''}</p>
                    </div>
                </div>
            `;

            // if modal close button is clicked
            const modalClose = document.getElementById('close-modal');
            modalClose.addEventListener('click', () => {
                modalContainer.style.display = 'none';
            });
        };

        // Add event listener to .show elements, fire modal for id
        const showElements = document.querySelectorAll('.show');
        showElements.forEach((showElement) => {
            showElement.addEventListener('click', () => {
                const id = showElement.getAttribute('data-id');
                modalContainer.style.display = 'flex';

                // Call the function to populate modal content
                populateModalContent(collections, id);
            });

            showElement.addEventListener('keyup', (event) => {
                if (event.key === 'Enter') {
                    const id = showElement.getAttribute('data-id');
                    modalContainer.style.display = 'flex';

                    // Call the function to populate modal content
                    populateModalContent(collections, id);
                }

                if (event.key === 'Escape' && modalContainer.style.display !== 'none') {
                    modalContainer.style.display = 'none';
                }
            });
        });
    };
}

/**
 * Check if the DOM is Ready
 */
if (document.readyState !== 'loading') {
    onReady();
} else {
    document.addEventListener('DOMContentLoaded', onReady);
}
