const myKey = "90158c8799bb28ca5c3054efdcbe85fd";
const myLat = "46.2382"; // Charlottetown, PEI
const myLon = "-63.1311";

const time = new Date();
const day = time.getDay();
const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

// Hamburger Menu Toggle (Isolated to ensure it executes regardless of API errors)
document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.getElementById("menu");
    const nav = document.querySelector("nav");

    if (menuButton && nav) {
        menuButton.addEventListener("click", () => {
            nav.classList.toggle("open");
            menuButton.classList.toggle("open");
        });
    } else {
        console.error("Menu button or nav element not found on PEI Explorer!");
    }
});

// Tourism Banner
document.addEventListener("DOMContentLoaded", () => {
    const banner = document.getElementById("meeting-banner");
    const closeButton = document.getElementById("close-banner");

    if (banner && closeButton) {
        if (day === 1 || day === 2) {
            banner.style.display = "block";
        }

        closeButton.addEventListener("click", () => {
            banner.style.display = "none";
        });
    }
});

// Spotlights
document.addEventListener("DOMContentLoaded", () => {
    const spotlightsMainBox = document.querySelector(".spotlights-main-box");
    if (spotlightsMainBox) {
        spotlightsMainBox.innerHTML = "";

        const createSpotCard = (index) => {
            const spotCard = document.createElement("div");
            spotCard.className = `spot-card spot-card-0${index}`;

            spotCard.innerHTML = `
                <div class="title-spot">
                    <h4 id="attraction-name-0${index}"></h4>
                    <h3 id="tag0${index}"></h3>
                </div>
                <div class="spot-img">
                    <img src="" alt="" id="img-0${index}-spot" width="80px">
                </div>
                <div class="spot-data">
                    <p><span id="phone-0${index}"></span></p>
                    <p><a href="" id="url-0${index}"></a></p>
                    <p><span id="category-0${index}"></span></p>
                </div>
            `;

            return spotCard;
        };

        for (let i = 1; i <= 3; i++) {
            spotlightsMainBox.appendChild(createSpotCard(i));
        }
    }
});

document.addEventListener("DOMContentLoaded", async () => {
    const nameAttraction01 = document.querySelector("#attraction-name-01");
    const nameAttraction02 = document.querySelector("#attraction-name-02");
    const nameAttraction03 = document.querySelector("#attraction-name-03");

    const industry01 = document.querySelector("#tag01");
    const industry02 = document.querySelector("#tag02");
    const industry03 = document.querySelector("#tag03");

    const phone01 = document.querySelector("#phone-01");
    const phone02 = document.querySelector("#phone-02");
    const phone03 = document.querySelector("#phone-03");

    const url01 = document.querySelector("#url-01");
    const url02 = document.querySelector("#url-02");
    const url03 = document.querySelector("#url-03");

    const category01 = document.querySelector("#category-01");
    const category02 = document.querySelector("#category-02");
    const category03 = document.querySelector("#category-03");

    const img01 = document.querySelector("#img-01-spot");
    const img02 = document.querySelector("#img-02-spot");
    const img03 = document.querySelector("#img-03-spot");

    try {
        const response = await fetch("data/attractions.json");
        if (!response.ok) {
            throw new Error(`Failed to fetch attractions.json: ${response.statusText}`);
        }
        const data = await response.json();

        const shuffledData = data.sort(() => 0.5 - Math.random()).filter(attraction => attraction.category === 2 || attraction.category === 3);

        const attractionNames = [nameAttraction01, nameAttraction02, nameAttraction03];
        const industries = [industry01, industry02, industry03];
        const phones = [phone01, phone02, phone03];
        const urls = [url01, url02, url03];
        const categories = [category01, category02, category03];
        const imgs = [img01, img02, img03];

        attractionNames.forEach((nameElement, index) => {
            if (nameElement && shuffledData[index]) {
                nameElement.innerHTML = `${shuffledData[index].name}`;
            }
        });

        industries.forEach((industry, index) => {
            if (industry && shuffledData[index]) {
                industry.innerHTML = `${shuffledData[index].industry}`;
            }
        });

        phones.forEach((phone, index) => {
            if (phone && shuffledData[index]) {
                phone.innerHTML = `Phone: ${shuffledData[index].phone}`;
            }
        });

        urls.forEach((url, index) => {
            if (url && shuffledData[index]) {
                url.href = `${shuffledData[index].website}`;
                url.innerHTML = `Visit the website`;
            }
        });

        categories.forEach((category, index) => {
            if (category && shuffledData[index]) {
                category.innerHTML = `Category: ${shuffledData[index].category === 3 ? "Premium" : "Featured"}`;
            }
        });

        imgs.forEach((img, index) => {
            if (img && shuffledData[index]) {
                img.src = `${shuffledData[index].image}`;
                img.alt = `${shuffledData[index].name} image`;
            }
        });
    } catch (error) {
        console.error("Error fetching attractions data:", error);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const urlWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLon}&appid=${myKey}&units=metric`;

    async function apiFetch() {
        try {
            const response = await fetch(urlWeather);
            if (response.ok) {
                const data = await response.json();
                displayResults(data);
            } else {
                throw new Error(`Weather API request failed: ${await response.text()}`);
            }
        } catch (error) {
            console.error("Error fetching weather data for PEI Explorer:", error);
            const eventMainBox = document.querySelector("#weather-main");
            if (eventMainBox) {
                eventMainBox.innerHTML = "<p>Unable to load weather data. Please try again later.</p>";
            }
        }
    }

    const displayResults = (data) => {
        const eventMainBox = document.querySelector("#weather-main");
        if (eventMainBox) {
            eventMainBox.innerHTML = "";

            const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            let desc = data.weather[0].description;

            eventMainBox.innerHTML = `
                <div class="current-weather">
                    <h2>The current Weather in: <span id="city-name">${data.name}</span></h2>
                    <h4>${weekdays[day]}</h4>
                    <div class="weather-content"></div>
                    <p>Temperature <span id="current-temp">${parseFloat(data.main.temp).toFixed(0)}°C</span></p>
                    <figure>
                        <img id="weather-icon" src="${iconsrc}" alt="${desc}">
                        <figcaption>${desc}</figcaption>
                    </figure>
                </div>
            `;
        }
    };

    apiFetch();
});

document.addEventListener("DOMContentLoaded", () => {
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${myLat}&lon=${myLon}&appid=${myKey}&units=metric`;

    async function apiForecastFetch() {
        try {
            const response = await fetch(forecastUrl);
            if (response.ok) {
                const forecastData = await response.json();
                displayResultsForecast(forecastData);
            } else {
                throw new Error(`Forecast API request failed: ${await response.text()}`);
            }
        } catch (error) {
            console.error("Error fetching forecast data for PEI Explorer:", error);
            const weatherForecast = document.querySelector("#weather-forecast");
            if (weatherForecast) {
                weatherForecast.innerHTML = "<p>Unable to load forecast data. Please try again later.</p>";
            }
        }
    }

    const displayResultsForecast = (forecastData) => {
        const weatherForecast = document.querySelector("#weather-forecast");
        if (weatherForecast) {
            weatherForecast.innerHTML = "";

            const forecast = document.createElement("article");
            forecast.className = "forecast";
            forecast.innerHTML = `
                <h3>3-Days Weather Forecast</h3>
                <div class="main-day-box">
                    <div class="day-box">
                        <h4 id="day-01">${weekdays[(day + 1) % 7]}</h4>
                        <figure>
                            <img id="weather-icon-1" src="" alt="">
                            <figcaption id="figcaption-1"></figcaption>
                        </figure>
                        <p>Temperature: <span id="temp-1"></span></p>
                    </div>
                    <div class="day-box">
                        <h4 id="day-02">${weekdays[(day + 2) % 7]}</h4>
                        <figure>
                            <img id="weather-icon-2" src="" alt="">
                            <figcaption id="figcaption-2"></figcaption>
                        </figure>
                        <p>Temperature: <span id="temp-2"></span></p>
                    </div>
                    <div class="day-box">
                        <h4 id="day-03">${weekdays[(day + 3) % 7]}</h4>
                        <figure>
                            <img id="weather-icon-3" src="" alt="">
                            <figcaption id="figcaption-3"></figcaption>
                        </figure>
                        <p>Temperature: <span id="temp-3"></span></p>
                    </div>
                </div>
            `;
            weatherForecast.appendChild(forecast);

            const dailyForecasts = forecastData.list.slice(0, 3);
            dailyForecasts.forEach((dailyData, index) => {
                document.getElementById(
                    `weather-icon-${index + 1}`
                ).src = `https://openweathermap.org/img/wn/${dailyData.weather[0].icon}@2x.png`;
                document.getElementById(`figcaption-${index + 1}`).textContent =
                    dailyData.weather[0].description;

                document.getElementById(
                    `temp-${index + 1}`
                ).textContent = `${parseFloat(dailyData.main.temp).toFixed(0)}°C`;
            });
        }
    };

    apiForecastFetch();
});

async function getEvents() {
    try {
        const response = await fetch("data/events.json");
        if (!response.ok) {
            throw new Error(`Failed to fetch events.json: ${response.statusText}`);
        }
        const data = await response.json();
        return data.events;
    } catch (error) {
        console.error("Error fetching events for PEI Explorer:", error);
        return [];
    }
}

async function displayEvents() {
    const events = await getEvents();
    const eventsContainer = document.getElementById("events-list");

    if (eventsContainer) {
        eventsContainer.innerHTML = "";

        if (events.length === 0) {
            eventsContainer.innerHTML = "<p>No upcoming events at this time.</p>";
            return;
        }

        events.sort((a, b) => new Date(a.date) - new Date(b.date));

        const nextEvents = events.slice(0, 3);

        nextEvents.forEach((event) => {
            const eventElement = document.createElement("div");
            eventElement.classList.add("event");

            eventElement.innerHTML = `
                <h3>${event.name}</h3>
                <p>Date: ${new Date(event.date).toDateString()}</p>
            `;

            eventsContainer.appendChild(eventElement);
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    displayEvents();
});