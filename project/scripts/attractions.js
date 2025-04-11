document.addEventListener('DOMContentLoaded', async () => {
    const attractionList = document.getElementById('attraction-list');
    const gridBtn = document.getElementById('grid-view-btn');
    const listBtn = document.getElementById('list-view-btn');
    const modal = document.getElementById('attraction-modal');

    try {
        const response = await fetch('data/attractions.json');
        if (!response.ok) throw new Error(`Failed to fetch attractions: ${response.status}`);
        const attractions = await response.json();

        attractionList.innerHTML = '';

        attractions.forEach(attraction => {
            const card = document.createElement('div');
            card.classList.add('card-box');
            card.innerHTML = `
                <img src="${attraction.image}" alt="${attraction.name}" loading="lazy">
                <h3>${attraction.name}</h3>
                <p>${attraction.location}</p>
                <button class="details-btn" data-id="${attraction.id}">View Details</button>
                <button class="favorite-btn" data-id="${attraction.id}">
                    <i class="fas fa-heart"></i> Favorite
                </button>
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

        attractionList.addEventListener('click', async (e) => {
            if (e.target.classList.contains('details-btn')) {
                const id = e.target.dataset.id;
                const attraction = attractions.find(a => a.id === id);
                modal.innerHTML = `
                    <button class="close-button" aria-label="Close">×</button>
                    <h3>${attraction.name}</h3>
                    <img src="${attraction.image}" alt="${attraction.name}" loading="lazy">
                    <p><strong>Location:</strong> ${attraction.location}</p>
                    <p><strong>Description:</strong> ${attraction.description}</p>
                    <p><strong>Rating:</strong> ${attraction.rating}/5</p>
                    <p><strong>Seasonal Tip:</strong> ${attraction.seasonalTip}</p>
                `;
                modal.showModal();
            }

            if (e.target.classList.contains('favorite-btn') || e.target.closest('.favorite-btn')) {
                const btn = e.target.closest('.favorite-btn');
                const id = btn.dataset.id;
                let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
                if (favorites.includes(id)) {
                    favorites = favorites.filter(fav => fav !== id);
                    btn.innerHTML = '<i class="fas fa-heart"></i> Favorite';
                } else {
                    favorites.push(id);
                    btn.innerHTML = '<i class="fas fa-heart" style="color: red;"></i> Unfavorite';
                }
                localStorage.setItem('favorites', JSON.stringify(favorites));
            }
        });

        modal.addEventListener('click', (e) => {
            if (e.target.classList.contains('close-button')) {
                modal.close();
            }
        });

        // Load favorites
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        document.querySelectorAll('.favorite-btn').forEach(btn => {
            if (favorites.includes(btn.dataset.id)) {
                btn.innerHTML = '<i class="fas fa-heart" style="color: red;"></i> Unfavorite';
            }
        });
    } catch (error) {
        console.error('Error:', error);
        attractionList.innerHTML = '<p>Unable to load attractions.</p>';
    }
});