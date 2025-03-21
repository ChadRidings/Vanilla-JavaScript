'use strict';

import '../styles/main.scss';
import {
    API_URL,
    SMALL_TILE_JPG,
    LARGE_TILE_JPG,
    SMALL_WATERMARK,
    LARGE_WATERMARK,
    HERO_SIZE
} from './constants';
import logoPath from '../assets/images/hulu.png';

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
        const headerContainer = document.getElementById('header');
        headerContainer.innerHTML +=
            `
            <div class="banner" style="background-image: url(${data.artwork['detail.horizontal.hero'].path}${HERO_SIZE})">
                <div class="overlay">
                    <img src="${logoPath}" alt="hulu logo" class="logo" />
                    <h1>${data.name}</h1>
                </div>
            </div>
        `;
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
                                    <img class="tile-graphic" src="${item.visuals.artwork.horizontal_tile.image.path}${SMALL_TILE_JPG}" />
                                    <div class="overlay">
                                        <i class="bi bi-plus-circle"></i>
                                    </div>
                                    ${item.visuals.primary_branding?.artwork['brand.watermark.bottom.right'].path ? `
                                        <div class="watermark">
                                            <img src="${item.visuals.primary_branding.artwork['brand.watermark.bottom.right'].path}${SMALL_WATERMARK}" />
                                        </div>
                                    ` : ''}
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

            const modalItem = component.items.find((item) => item.id === id);
            const headline = modalItem.visuals.headline;
            const subtitle = modalItem.visuals.subtitle;
            const description = modalItem.visuals.body;
            const actionText = modalItem.visuals.action_text;
            const imagePath = modalItem.visuals.artwork.horizontal_tile.image.path;
            const watermarkPath = modalItem.visuals.primary_branding?.artwork['brand.watermark.bottom.right'].path;

            const modalContent = document.getElementById('modal-content');
            modalContent.innerHTML = `
                <div class="container-50">
                    <div class="image">
                        <img src="${imagePath}${LARGE_TILE_JPG}" class="tile-graphic" />
                        ${watermarkPath ? `
                            <div class="watermark">
                                <img src="${watermarkPath}${LARGE_WATERMARK}" />
                            </div>
                        ` : ''}
                    </div>
                </div>
                <div class="container-50">
                    <div class="info">
                        <div class="close" id="close-modal"><i class="bi bi-x-circle"></i></div>
                        <h2 class="heading">${headline ? headline : ''}</h2>
                        <p>${description ? description : ''}</p>
                        <p>${subtitle ? subtitle : ''}</p>
                        <button>${actionText} <i class="bi bi-play-fill"></i></button>
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
