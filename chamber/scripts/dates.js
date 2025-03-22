document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('currentyear').textContent = new Date().getFullYear();
    document.getElementById('lastModified').textContent = `Last Modified: ${document.lastModified}`;

    const menuButton = document.getElementById('menu');
    const navList = document.querySelector('nav ul');

    menuButton.addEventListener('click', () => {
        navList.classList.toggle('show');
        menuButton.classList.toggle('open');
    });
});