// Calendar Functionality
var actual = new Date();

function mostrarCalendario(year, month) {
    var now = new Date(year, month - 1, 1);
    var last = new Date(year, month, 0);
    var primerDiaSemana = now.getDay();
    var ultimoDiaMes = last.getDate();
    var dia = 0;
    var resultado = "<tr>";
    var diaActual = 0;
    var last_cell = primerDiaSemana + ultimoDiaMes;

    for (var i = 1; i <= 42; i++) {
        if (i == primerDiaSemana + 1) {
            dia = 1;
        }
        if (i <= primerDiaSemana || i >= last_cell) {
            resultado += "<td> </td>";
        } else {
            if (
                dia == actual.getDate() &&
                month == actual.getMonth() + 1 &&
                year == actual.getFullYear()
            )
                resultado += "<td class='hoy'>" + dia + "</td>";
            else
                resultado += "<td>" + dia + "</td>";
            dia++;
        }
        if (i % 7 == 0) {
            if (dia > ultimoDiaMes) break;
            resultado += "</tr><tr>\n";
        }
    }
    resultado += "</tr>";

    var meses = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    var nextMonth = month + 1;
    var nextYear = year;
    if (month + 1 > 12) {
        nextMonth = 1;
        nextYear = year + 1;
    }

    var prevMonth = month - 1;
    var prevYear = year;
    if (month - 1 < 1) {
        prevMonth = 12;
        prevYear = year - 1;
    }

    document
        .getElementById("calendar")
        .getElementsByTagName("caption")[0].innerHTML =
        "<div>" +
        meses[month - 1] +
        " / " +
        year +
        "</div>" +
        "<div><a href='javascript:void(0)' onclick='mostrarCalendario(" +
        prevYear +
        "," +
        prevMonth +
        ")'><</a> " +
        "<a href='javascript:void(0)' onclick='mostrarCalendario(" +
        nextYear +
        "," +
        nextMonth +
        ")'>></a></div>";

    document
        .getElementById("calendar")
        .getElementsByTagName("tbody")[0].innerHTML = resultado;
}

mostrarCalendario(actual.getFullYear(), actual.getMonth() + 1);

// Lazy Loading for Images
document.addEventListener("DOMContentLoaded", function () {
    const lazyImages = document.querySelectorAll(".lazy-image");

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute("data-src");
                img.classList.remove("lazy-image");
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach((image) => {
        imageObserver.observe(image);
    });
});

// Dynamic Images/Events Section
document.addEventListener("DOMContentLoaded", function () {
    let currentImageIndex = 0;
    const article = document.querySelector("#article-02");

    if (!article) {
        console.error("Article container not found in the DOM.");
        return;
    }

    const imageContainer = document.createElement("img");
    const descriptionContainer = document.createElement("h3");

    article.appendChild(imageContainer);
    article.appendChild(descriptionContainer);

    fetch("data/discover.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((events) => {
            if (!events || events.length === 0) {
                console.error("No events found in the JSON file.");
                return;
            }

            function updateImage() {
                const event = events[currentImageIndex];
                imageContainer.src = `images/${event.image}`;
                imageContainer.alt = event.description;
                imageContainer.loading = "lazy";
                descriptionContainer.textContent = event.description;

                currentImageIndex = (currentImageIndex + 1) % events.length;
            }

            updateImage();

            setInterval(() => {
                imageContainer.classList.remove("fade-in");
                void imageContainer.offsetWidth;
                imageContainer.classList.add("fade-in");
                updateImage();
            }, 10000);
        })
        .catch((error) => {
            console.error("Error fetching the JSON file:", error);
        });
});

// Visit Counter
document.addEventListener("DOMContentLoaded", function () {
    const visitCounter = document.createElement("article");
    visitCounter.className = "article-04";
    visitCounter.innerHTML = `
        <header>
            <h3>Visit Counter</h3>
        </header>
        <p>You have visited this page <span id="visit-count">0</span> times.</p>
        <p>Last Visit: <span id="last-visit">Never</span></p>
    `;
    document.querySelector(".side-bar").appendChild(visitCounter);

    // Get visit count and last visit from localStorage
    let visitCount = localStorage.getItem("visitCount") || 0;
    let lastVisit = localStorage.getItem("lastVisit") || "Never";

    // Update visit count
    visitCount = parseInt(visitCount) + 1;
    localStorage.setItem("visitCount", visitCount);

    // Update last visit
    const currentDate = new Date().toLocaleString();
    localStorage.setItem("lastVisit", currentDate);

    // Display visit count and last visit
    document.getElementById("visit-count").textContent = visitCount;
    document.getElementById("last-visit").textContent = lastVisit;
});