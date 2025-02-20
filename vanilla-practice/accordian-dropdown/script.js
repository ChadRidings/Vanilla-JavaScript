function onReady() {
    // Query all of the accordion elements
    const accordions = document.querySelectorAll('.accordion');

    // Collapse all accordions except the first one on initial load
    accordions.forEach((accordion, index) => {
        if (index === 0) {
            const description = accordion.querySelector('.description');
            const expandIcon = accordion.querySelector('.expand-icon');
            const collapseIcon = accordion.querySelector('.collapse-icon');

            description.style.display = 'block';
            expandIcon.style.display = 'none';
            collapseIcon.style.display = 'block';
        }
    });

    // Function to toggle the visibility of the description and icons
    const toggleAccordion = (selectedAccordion) => {
        accordions.forEach((accordion) => {
            const description = accordion.querySelector('.description');
            const expandIcon = accordion.querySelector('.expand-icon');
            const collapseIcon = accordion.querySelector('.collapse-icon');

            if (accordion === selectedAccordion) {
                // Toggle the visibility of the description
                const isExpanded = description.style.display === 'block';
                description.style.display = isExpanded ? 'none' : 'block';
                expandIcon.style.display = isExpanded ? 'block' : 'none';
                collapseIcon.style.display = isExpanded ? 'none' : 'block';
            } else {
                // Collapse all other accordions
                description.style.display = 'none';
                expandIcon.style.display = 'block';
                collapseIcon.style.display = 'none';
            }
        });
    }

    // Add click event listener to each title section
    accordions.forEach((accordion, index) => {
        const titleSection = accordion.querySelector('.title-section');
        titleSection.addEventListener('click', () => toggleAccordion(accordion));
    });
}

if (document.readyState !== 'loading') {
    onReady();
} else {
    document.addEventListener('DOMContentLoaded', onReady);
}
