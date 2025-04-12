document.addEventListener("DOMContentLoaded", () => {
    const timestampField = document.getElementById("timestamp");
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }

    const modals = {
        npModal: document.getElementById("npModal"),
        bronzeModal: document.getElementById("bronzeModal"),
        silverModal: document.getElementById("silverModal"),
        goldModal: document.getElementById("goldModal"),
    };

    const buttons = {
        npButton: document.getElementById("npButton"),
        bronzeButton: document.getElementById("bronzeButton"),
        silverButton: document.getElementById("silverButton"),
        goldButton: document.getElementById("goldButton"),
    };

    const modalContent = {
        npModal: {
            title: "Explorer Package Benefits",
            content: "Access to basic itineraries, event listings, and a welcome guide for first-time visitors to Prince Edward Island."
        },
        bronzeModal: {
            title: "Adventurer Package Benefits",
            content: "Includes Explorer benefits plus curated day trips, discounted attraction tickets, and access to seasonal events."
        },
        silverModal: {
            title: "Discoverer Package Benefits",
            content: "Includes Adventurer benefits plus personalized travel recommendations, priority booking for tours, and a PEI Explorer newsletter."
        },
        goldModal: {
            title: "Voyager Package Benefits",
            content: "Includes Discoverer benefits plus exclusive guided experiences, VIP event access, and a complimentary PEI Explorer travel kit."
        }
    };

    // localStorage: Load last selected package
    const lastPackage = localStorage.getItem('lastPackage');
    if (lastPackage && modals[lastPackage]) {
        displayModal(modals[lastPackage], modalContent[lastPackage]);
    }

    function displayModal(modal, { title, content }) {
        modal.innerHTML = `
            <div class="modal-content">
                <button class="close-button" aria-label="Close">×</button>
                <h3>${title}</h3>
                <p>${content}</p>
            </div>
        `;
        modal.showModal();

        modal.querySelector(".close-button").addEventListener("click", () => {
            modal.close();
        });
    }

    Object.keys(buttons).forEach((key) => {
        buttons[key].addEventListener("click", () => {
            const modalKey = key.replace("Button", "Modal");
            // localStorage: Save selected package
            localStorage.setItem('lastPackage', modalKey);
            displayModal(modals[modalKey], modalContent[modalKey]);
        });
    });

    // Hamburger Menu Toggle
    const menuButton = document.getElementById("menu");
    const nav = document.querySelector("nav");

    if (menuButton && nav) {
        menuButton.addEventListener("click", () => {
            nav.classList.toggle("open");
            menuButton.classList.toggle("open");
            console.log('Menu button classList:', menuButton.classList.toString());
        });
    } else {
        console.error('Menu button or nav not found on PEI Explorer plan page!');
    }
});