document.addEventListener('DOMContentLoaded', async () => {
    const memberList = document.getElementById('member-list');
    const gridBtn = document.getElementById('grid-view-btn');
    const listBtn = document.getElementById('list-view-btn');

    try {
        const response = await fetch('data/members.json');
        if (!response.ok) throw new Error(`Failed to fetch members.json: ${response.status}`);
        const members = await response.json();

        const membershipLabels = {
            1: "Bronze",
            2: "Silver",
            3: "Gold"
        };

        members.forEach(member => {
            const card = document.createElement('div');
            card.classList.add('card-box');
            card.innerHTML = `
                <img src="${member.image}" alt="${member.name} logo">
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <p><a href="${member.website}" target="_blank" aria-label="Visit ${member.name} website">${member.website}</a></p>
                <p>Membership: ${membershipLabels[member.membership]}</p>
            `;
            memberList.appendChild(card);
        });

        memberList.classList.add('list');
        listBtn.classList.add('activebtn');

        gridBtn.addEventListener('click', () => {
            memberList.classList.remove('list');
            memberList.classList.add('grid');
            gridBtn.classList.add('activebtn');
            listBtn.classList.remove('activebtn');
        });

        listBtn.addEventListener('click', () => {
            memberList.classList.remove('grid');
            memberList.classList.add('list');
            listBtn.classList.add('activebtn');
            gridBtn.classList.remove('activebtn');
        });
    } catch (error) {
        console.error('Error in directory.js:', error);
    }
});