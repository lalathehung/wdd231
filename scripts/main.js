document.addEventListener("DOMContentLoaded", () => {
    const hamButton = document.querySelector("#menu");
    const navigation = document.querySelector("nav ul");

    hamButton.addEventListener("click", () => {
        navigation.classList.toggle("open");
        hamButton.classList.toggle("open");
    });

    // Set Active Class on Navigation Links
    document.querySelectorAll("nav a").forEach(link => {
        link.addEventListener("click", function() {
            document.querySelector("nav .active").classList.remove("active");
            this.classList.add("active");
        });
    });

    // footer
    document.getElementById("currentyear").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = `Last Updated: ${document.lastModified}`;
});
