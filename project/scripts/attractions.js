document.addEventListener('DOMContentLoaded', async () => {
    // Hamburger Menu Toggle
    const menuButton = document.getElementById('menu');
    const nav = document.querySelector('nav');

    if (menuButton && nav) {
        // Initialize button with hamburger icon
        menuButton.innerHTML = '<i class="fas fa-bars"></i>';
        menuButton.addEventListener('click', () => {
            nav.classList.toggle('open');
            const isOpen = menuButton.classList.toggle('open');
            // Update button content to show X or hamburger
            menuButton.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
            console.log('Menu button classList:', menuButton.classList.toString()); // Debug
        });
    } else {
        console.error('Menu button or nav element not found on PEI Explorer attractions page!');
    }

    // Attractions Logic
    const attractionList = document.getElementById('member-list');
    const gridBtn = document.getElementById('grid-view-btn');
    const listBtn = document.getElementById('list-view-btn');

    try {
        const response = await fetch('data/attractions.json');
        if (!response.ok) throw new Error(`Failed to fetch PEI Explorer attractions.json: ${response.status}`);
        const attractions = await response.json();

        const categoryLabels = {
            1: 'Basic',
            2: 'Featured',
            3: 'Premium'
        };

        // Hide the static attractions
        const staticAttractions = document.querySelector('.static-members');
        if (staticAttractions) {
            staticAttractions.style.display = 'none';
        }

        // Clear the attraction list and add dynamic content
        attractionList.innerHTML = '';

        attractions.forEach(attraction => {
            const card = document.createElement('div');
            card.classList.add('card-box');
            card.innerHTML = `
                <img src="${attraction.image}" alt="${attraction.name} image">
                <h3>${attraction.name}</h3>
                <p>${attraction.address}</p>
                <p>${attraction.phone}</p>
                <p><a href="${attraction.website}" target="_blank" aria-label="Visit ${attraction.name} website">${attraction.website}</a></p>
                <p>Category: ${categoryLabels[attraction.category]}</p>
            `;
            attractionList.appendChild(card);
        });

        attractionList.classList.add('list');
        listBtn.classList.add('activebtn');

        gridBtn.addEventListener('click', () => {
            attractionList.classList.remove('list');
            attractionList.classList.add('grid');
            gridBtn.classList.add('activebtn');
            listBtn.classList.remove('activebtn');
        });

        listBtn.addEventListener('click', () => {
            attractionList.classList.remove('grid');
            attractionList.classList.add('list');
            listBtn.classList.add('activebtn');
            gridBtn.classList.remove('activebtn');
        });
    } catch (error) {
        console.error('Error in PEI Explorer attractions.js:', error);
    }
});