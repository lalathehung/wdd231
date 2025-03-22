document.addEventListener('DOMContentLoaded', async () => {
    const directoryBox = document.getElementById('directory-box');
    const gridBtn = document.getElementById('grid-view-btn');
    const listBtn = document.getElementById('list-view-btn');

    try {
        const response = await fetch('data/members.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const members = await response.json();

        members.forEach(member => {
            const card = document.createElement('div');
            card.classList.add('card-box');
            card.innerHTML = `
                <img src="${member.logo}" alt="${member.Name} logo">
                <h3>${member.Name}</h3>
                <ul>
                    <li>${member["Physical Address"]}</li>
                    <li>${member.Phone}</li>
                    <li><a href="${member.Website}" target="_blank">${member.Website}</a></li>
                    <li>Membership: ${member.Membership}</li>
                </ul>
            `;
            directoryBox.appendChild(card);
        });

        // Default to list view (matching working site)
        directoryBox.classList.add('list-view');

        gridBtn.addEventListener('click', () => {
            directoryBox.classList.remove('list-view');
            directoryBox.classList.add('grid-view');
            gridBtn.classList.add('activebtn');
            listBtn.classList.remove('activebtn');
        });

        listBtn.addEventListener('click', () => {
            directoryBox.classList.remove('grid-view');
            directoryBox.classList.add('list-view');
            listBtn.classList.add('activebtn');
            gridBtn.classList.remove('activebtn');
        });
    } catch (error) {
        console.error('Error fetching members:', error);
    }
});