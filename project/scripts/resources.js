document.addEventListener("DOMContentLoaded", () => {
    const timestampField = document.getElementById("timestamp");
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    } else {
        console.error("Error: Element with ID 'timestamp' not found in the DOM.");
    }

    const form = document.querySelector("form");
    if (form) {
        form.addEventListener("submit", (e) => {
            const firstName = document.querySelector("input[name='firstName']").value.trim();
            const lastName = document.querySelector("input[name='lastName']").value.trim();
            const email = document.querySelector("input[name='email']").value.trim();
            const tip = document.querySelector("textarea[name='tip']").value.trim();

            if (firstName.length < 2 || lastName.length < 2) {
                e.preventDefault();
                alert("First and last names must be at least 2 characters long.");
            } else if (!email.includes("@")) {
                e.preventDefault();
                alert("Please enter a valid email address.");
            } else if (tip.length < 5) {
                e.preventDefault();
                alert("Please provide a tip or question with at least 5 characters.");
            }
        });
    }
});