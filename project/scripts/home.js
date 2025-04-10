const myKey = "90158c8799bb28ca5c3054efdcbe85fd";
const myLat = "46.2359"; // Charlottetown, PEI
const myLon = "-63.1256";

const time = new Date();
const day = time.getDay();
const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// Hamburger Menu Toggle
document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.getElementById("menu");
    const nav = document.querySelector("nav");

    if (menuButton && nav) {
        menuButton.addEventListener("click", () => {
            nav.classList.toggle("open");
            menuButton.classList.toggle("open");
        });
    } else {
        console.error("Menu button or nav element not found!");
    }
});

// Banner
document.addEventListener("DOMContentLoaded", () => {
    const banner = document.getElementById("meeting-banner");
    const closeButton = document.getElementById("close-banner");

    if (banner && closeButton) {
        banner.style.display = "block"; // Always show on home page
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
                    <h3 id="location-0${index}"></h3>
                </div>
                <div class="spot-img">
                    <img src="" alt="" id="img-0${index}-spot" width="80px" loading="lazy">
                </div>
                <div class="spot-data">
                    <p><span id="description-0${index}"></span></p>
                    <p><a href="" id="url-0${index}"></a></p>
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

    const location01 = document.querySelector("#location-01");
    const location02 = document.querySelector("#location-02");
    const location03 = document.querySelector("#location-03");

    const description01 = document.querySelector("#description-01");
    const description02 = document.querySelector("#description-02");
    const description03 = document.querySelector("#description-03");

    const url01 = document.querySelector("#url-01");
    const url02 = document.querySelector("#url-02");
    const url03 = document.querySelector("#url-03");

    const img01 = document.querySelector("#img-01-spot");
    const img02 = document.querySelector("#img-02-spot");
    const img03 = document.querySelector("#img-03-spot");

    try {
        const response = await fetch("data/attractions.json");
        if (!response.ok) throw new Error(`Failed to fetch attractions.json: ${response.statusText}`);
        const data = await response.json();

        const shuffledData = data.sort(() => 0.5 - Math.random()).slice(0, 3);

        const attractionNames = [nameAttraction01, nameAttraction02, nameAttraction03];
        const locations = [location01, location02, location03];
        const descriptions = [description01, description02, description03];
        const urls = [url01, url02, url03];
        const imgs = [img01, img02, img03];

        attractionNames.forEach((nameElement, index) => {
            if (nameElement && shuffledData[index]) nameElement.textContent = shuffledData[index].name;
        });

        locations.forEach((location, index) => {
            if (location && shuffledData[index]) location.textContent = shuffledData[index].location;
        });

        descriptions.forEach((description, index) => {
            if (description && shuffledData[index]) description.textContent = shuffledData[index].description;
        });

        urls.forEach((url, index) => {
            if (url && shuffledData[index]) {
                url.href = shuffledData[index].website;
                url.textContent = "Learn More";
            }
        });

        imgs.forEach((img, index) => {
            if (img && shuffledData[index]) {
                img.src = shuffledData[index].image;
                img.alt = `${shuffledData[index].name} image`;
            }
        });
    } catch (error) {
        console.error("Error fetching attractions data:", error);
    }
});

// Weather
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
            console.error("Error fetching weather data:", error);
            document.querySelector("#weather-main").innerHTML = "<p>Unable to load weather data.</p>";
        }
    }

    const displayResults = (data) => {
        const eventMainBox = document.querySelector("#weather-main");
        if (eventMainBox) {
            eventMainBox.innerHTML = `
                <div class="current-weather">
                    <h2>Weather in: <span id="city-name">${data.name}</span></h2>
                    <h4>${weekdays[day]}</h4>
                    <p>Temperature: <span id="current-temp">${parseFloat(data.main.temp).toFixed(0)}°C</span></p>
                    <figure>
                        <img id="weather-icon" src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}">
                        <figcaption>${data.weather[0].description}</figcaption>
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
            console.error("Error fetching forecast data:", error);
            document.querySelector("#weather-forecast").innerHTML = "<p>Unable to load forecast data.</p>";
        }
    }

    const displayResultsForecast = (forecastData) => {
        const weatherForecast = document.querySelector("#weather-forecast");
        if (weatherForecast) {
            weatherForecast.innerHTML = `
                <article class="forecast">
                    <h3>3-Day Weather Forecast</h3>
                    <div class="main-day-box">
                        <div class="day-box">
                            <h4>${weekdays[(day + 1) % 7]}</h4>
                            <figure>
                                <img id="weather-icon-1" src="" alt="">
                                <figcaption id="figcaption-1"></figcaption>
                            </figure>
                            <p>Temperature: <span id="temp-1"></span></p>
                        </div>
                        <div class="day-box">
                            <h4>${weekdays[(day + 2) % 7]}</h4>
                            <figure>
                                <img id="weather-icon-2" src="" alt="">
                                <figcaption id="figcaption-2"></figcaption>
                            </figure>
                            <p>Temperature: <span id="temp-2"></span></p>
                        </div>
                        <div class="day-box">
                            <h4>${weekdays[(day + 3) % 7]}</h4>
                            <figure>
                                <img id="weather-icon-3" src="" alt="">
                                <figcaption id="figcaption-3"></figcaption>
                            </figure>
                            <p>Temperature: <span id="temp-3"></span></p>
                        </div>
                    </div>
                </article>
            `;

            const dailyForecasts = forecastData.list.filter((item, index) => index % 8 === 0).slice(0, 3);
            dailyForecasts.forEach((dailyData, index) => {
                document.getElementById(`weather-icon-${index + 1}`).src = `https://openweathermap.org/img/wn/${dailyData.weather[0].icon}@2x.png`;
                document.getElementById(`figcaption-${index + 1}`).textContent = dailyData.weather[0].description;
                document.getElementById(`temp-${index + 1}`).textContent = `${parseFloat(dailyData.main.temp).toFixed(0)}°C`;
            });
        }
    };

    apiForecastFetch();
});

// Featured Attraction
document.addEventListener("DOMContentLoaded", async () => {
    const featuredContainer = document.getElementById("featured-attraction");

    if (featuredContainer) {
        try {
            const response = await fetch("data/attractions.json");
            if (!response.ok) throw new Error(`Failed to fetch attractions.json: ${response.statusText}`);
            const data = await response.json();

            const currentMonth = time.getMonth();
            const featuredAttraction = data[currentMonth % data.length]; // Rotate monthly

            featuredContainer.innerHTML = `
                <div class="attraction">
                    <h3>${featuredAttraction.name}</h3>
                    <p>${featuredAttraction.description}</p>
                    <p><a href="${featuredAttraction.website}" target="_blank">Learn More</a></p>
                </div>
            `;
        } catch (error) {
            console.error("Error fetching featured attraction:", error);
            featuredContainer.innerHTML = "<p>Unable to load featured attraction.</p>";
        }
    }
});