document.addEventListener('DOMContentLoaded', async () => {
    const memberList = document.getElementById('member-list');
    const gridBtn = document.getElementById('grid-view-btn');
    const listBtn = document.getElementById('list-view-btn');

    // Use static data from screenshots to ensure it works
    const members = [
        {
            name: "Idaho Websites",
            address: "2115 S Vista Avenue Boise ID 83705",
            phone: "(208) 342-9386",
            website: "https://idahowebsites.com/",
            image: "https://lalathehung.github.io/wdd231/chamber/images/idweblogo.webp"
        },
        {
            name: "Surge Web Design",
            address: "4072 E Arch Drive Meridian ID 83646",
            phone: "(208) 631-0640",
            website: "https://www.surgewebdesign.com/",
            image: "https://lalathehung.github.io/wdd231/chamber/images/surge-logo.webp"
        },
        {
            name: "Graphic Zen",
            address: "1788 E Summerplace Court Meridian ID 83646",
            phone: "(208) 631-4984",
            website: "https://graphiczen.com/",
            image: "https://lalathehung.github.io/wdd231/chamber/images/graphiczen-logo.webp"
        },
        {
            name: "Peppershock Media",
            address: "1215 3rd Street Nampa ID 83651",
            phone: "(208) 461-5070",
            website: "https://www.peppershock.com/",
            image: "https://lalathehung.github.io/wdd231/chamber/images/peppershock-logo.webp"
        },
        {
            name: "Flash Tech Services",
            address: "Star Idaho 83669",
            phone: "(208) 488-5810",
            website: "https://flashtechnicalservices.com/",
            image: "https://lalathehung.github.io/wdd231/chamber/images/flashtech-logo.webp"
        },
        {
            name: "Metro Express Car Wash",
            address: "1725 E Overland Road Meridian ID 83642",
            phone: "(208) 888-4073",
            website: "https://www.metroexpresscarwash.com/",
            image: "https://lalathehung.github.io/wdd231/chamber/images/metroexpress-logo.webp"
        }
    ];

    // Render members
    members.forEach(member => {
        const card = document.createElement('div');
        card.classList.add('card-box');
        card.innerHTML = `
            <img src="${member.image}" alt="${member.name} logo">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <p><a href="${member.website}" target="_blank">${member.website}</a></p>
        `;
        memberList.appendChild(card);
    });

    // Default to list view (matching reference site)
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
});