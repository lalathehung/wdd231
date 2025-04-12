document.addEventListener("DOMContentLoaded", () => {
    const timestampField = document.getElementById("timestamp");
    timestampField.value = new Date().toISOString();

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
            title: "Non-Profit Membership Benefits",
            content: "Free access to community events, networking opportunities, and basic resources for non-profit organizations.",
        },
        bronzeModal: {
            title: "Bronze Membership Benefits",
            content: "Access to exclusive networking events, discounted training sessions, and basic advertising opportunities.",
        },
        silverModal: {
            title: "Silver Membership Benefits",
            content: "Includes Bronze benefits plus priority event registration, enhanced advertising (e.g., spotlight positions), and marketing support.",
        },
        goldModal: {
            title: "Gold Membership Benefits",
            content: "Includes Silver benefits plus full premium support, elite event invitations, significant event discounts, and top-tier advertising opportunities.",
        },
    };

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
            displayModal(modals[modalKey], modalContent[modalKey]);
        });
    });
});