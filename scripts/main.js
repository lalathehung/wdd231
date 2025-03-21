document.addEventListener("DOMContentLoaded", () => {
    const hamButton = document.querySelector("#menu");
    const navigation = document.querySelector("nav ul");

    hamButton.addEventListener("click", () => {
        navigation.classList.toggle("open");
        hamButton.classList.toggle("open");
    });

    // Wayfinding
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll("nav a");

    navLinks.forEach(link => {
        const linkPath = link.getAttribute("href");
        if (linkPath.startsWith("http")) {
            return;
        }
        const normalizedLinkPath = `./${linkPath}`.replace("././", "./");
        const normalizedCurrentPage = currentPage.replace("/wdd231/", "/");

        if (normalizedCurrentPage === normalizedLinkPath || 
            (normalizedCurrentPage === "/index.html" && normalizedLinkPath === "./index.html")) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });

    // Footer updates
    document.getElementById("currentyear").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = `Last Update: ${document.lastModified}`;
});