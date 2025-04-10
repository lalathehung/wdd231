document.addEventListener('DOMContentLoaded', async () => {
    const attractionList = document.getElementById('attraction-list');
    const gridBtn = document.getElementById('grid-view-btn');
    const listBtn = document.getElementById('list-view-btn');

    try {
        const response = await fetch('data/attractions.json');
        if (!response.ok) throw new Error(`Failed to fetch attractions.json: ${response.status}`);
        const attractions = await response.json();

        // Hide static attractions
        const staticAttractions = document.querySelector('.static-attractions');
        if (staticAttractions) {
            staticAttractions.style.display = 'none';
        }

        // Clear attraction list and add dynamic content
        attractionList.innerHTML = '';

        attractions.forEach(attraction => {
            const card = document.createElement('div');
            card.classList.add('card-box');
            card.innerHTML = `
                <img src="${attraction.image}" alt="${attraction.name}" loading="lazy">
                <h3>${attraction.name}</h3>
                <p>${attraction.location}</p>
                <p>${attraction.description}</p>
                <p>Rating: ${attraction.rating}/5</p>
                <p><a href="${attraction.website}" target="_blank" aria-label="Visit ${attraction.name} info">${attraction.website}</a></p>
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
        console.error('Error in pei-content.js:', error);
    }
});