document.addEventListener('DOMContentLoaded', async () => {
    const memberList = document.getElementById('member-list');
    const gridBtn = document.getElementById('grid-view');
    const listBtn = document.getElementById('list-view');

    // Fetch members data
    try {
        const response = await fetch('data/members.json');
        const members = await response.json();

        // Render members
        members.forEach(member => {
            const card = document.createElement('div');
            card.classList.add('member-card');
            card.innerHTML = `
                <img src="${member.image}" alt="${member.name} logo">
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <p><a href="${member.website}" target="_blank">${member.website}</a></p>
                <p>Membership: ${member.membership}</p>
            `;
            memberList.appendChild(card);
        });
    } catch (error) {
        console.error('Error fetching members:', error);
    }

    // Toggle views
    gridBtn.addEventListener('click', () => {
        memberList.classList.remove('list');
        memberList.classList.add('grid');
        gridBtn.classList.add('active');
        listBtn.classList.remove('active');
    });

    listBtn.addEventListener('click', () => {
        memberList.classList.remove('grid');
        memberList.classList.add('list');
        listBtn.classList.add('active');
        gridBtn.classList.remove('active');
    });
});