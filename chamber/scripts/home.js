const myKey = "90158c8799bb28ca5c3054efdcbe85fd";
const myLat = "22.3193"; // Hong Kong
const myLon = "114.1694";

const time = new Date();
const day = time.getDay();
const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// Meeting Banner
document.addEventListener("DOMContentLoaded", () => {
    const banner = document.getElementById("meeting-banner");
    const closeButton = document.getElementById("close-banner");

    // Show banner on Monday (1) and Tuesday (2)
    if (day === 1 || day === 2) {
        banner.style.display = "block";
    }

    closeButton.addEventListener("click", () => {
        banner.style.display = "none";
    });
});

// Spotlights
document.addEventListener("DOMContentLoaded", () => {
    const spotlightsMainBox = document.querySelector(".spotlights-main-box");
    spotlightsMainBox.innerHTML = "";

    const createSpotCard = (index) => {
        const spotCard = document.createElement("div");
        spotCard.className = `spot-card spot-card-0${index}`;
        spotCard.innerHTML = `
            <div class="title-spot">
                <h4 id="business-name-0${index}"></h4>
                <h3 id="tag-0${index}"></h3>
            </div>
            <div class="spot-img">
                <img src="" alt="" id="img-0${index}-spot">
            </div>
            <div class="spot-data">
                <p>Phone: <span id="phone-0${index}"></span></p>
                <p><a href="" id="url-0${index}"></a></p>
                <p>Membership Level: <span id="member-since-0${index}"></span></p>
            </div>
        `;
        return spotCard;
    };

    for (let i = 1; i <= 3; i++) {
        spotlightsMainBox.appendChild(createSpotCard(i));
    }
});

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch("data/members.json");
        const data = await response.json();

        // Filter for Silver and Gold members (membership levels 2 and 3)
        const eligibleMembers = data.filter(member => 
            member.membership === 2 || member.membership === 3
        );

        // Shuffle and select 3 members
        const shuffledData = eligibleMembers.sort(() => 0.5 - Math.random()).slice(0, 3);

        for (let i = 1; i <= 3; i++) {
            const member = shuffledData[i - 1];
            if (member) {
                document.querySelector(`#business-name-0${i}`).textContent = member.name;
                document.querySelector(`#tag-0${i}`).textContent = "Business Tag Line"; // Placeholder
                document.querySelector(`#phone-0${i}`).textContent = member.phone;
                document.querySelector(`#url-0${i}`).textContent = "Visit the website";
                document.querySelector(`#url-0${i}`).href = member.website;
                document.querySelector(`#member-since-0${i}`).textContent = member.membership === 3 ? "Gold" : "Silver";
                const img = document.querySelector(`#img-0${i}-spot`);
                img.src = member.image;
                img.alt = `${member.name} logo`;
            }
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
});

// Weather: Current
document.addEventListener("DOMContentLoaded", () => {
    const urlWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLon}&appid=${myKey}&units=imperial`;

    async function apiFetch() {
        try {
            const response = await fetch(urlWeather);
            if (response.ok) {
                const data = await response.json();
                displayResults(data);
            } else {
                throw new Error(await response.text());
            }
        } catch (error) {
            console.error(error);
        }
    }

    const displayResults = (data) => {
        const eventMainBox = document.querySelector("#weather-main");
        eventMainBox.innerHTML = "";

        const descriptions = data.weather.map(event => {
            return event.description
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
        }).join(', ');

        eventMainBox.innerHTML = `
            <div class="current-weather">
                <h2>The Current Weather in: <span id="city-name">${data.name}</span></h2>
                <h4>${weekdays[day]}</h4>
                <p>Temperature: <span id="current-temp">${parseFloat(data.main.temp).toFixed(0)}°F</span></p>
                <figure>
                    <img id="weather-icon" src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${descriptions}">
                    <figcaption>${descriptions}</figcaption>
                </figure>
                <p>High: ${parseFloat(data.main.temp_max).toFixed(0)}°F</p>
                <p>Low: ${parseFloat(data.main.temp_min).toFixed(0)}°F</p>
                <p>Humidity: ${data.main.humidity}%</p>
            </div>
        `;
    };

    apiFetch();
});

// Weather: Forecast
document.addEventListener("DOMContentLoaded", () => {
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${myLat}&lon=${myLon}&appid=${myKey}&units=imperial`;

    async function apiForecastFetch() {
        try {
            const response = await fetch(forecastUrl);
            if (response.ok) {
                const forecastData = await response.json();
                displayResultsForecast(forecastData);
            } else {
                throw new Error(await response.text());
            }
        } catch (error) {
            console.log(error);
        }
    }

    const displayResultsForecast = (forecastData) => {
        const weatherForecast = document.querySelector("#weather-forecast");
        weatherForecast.innerHTML = "";

        const dailyForecasts = forecastData.list.filter((_, index) => index % 8 === 0).slice(0, 3);

        weatherForecast.innerHTML = `
            <h3>3-Day Weather Forecast</h3>
            <div class="main-day-box">
                <div class="day-box">
                    <h4 id="day-01">${weekdays[(day + 1) % 7]}</h4>
                    <figure>
                        <img id="weather-icon-1" src="https://openweathermap.org/img/wn/${dailyForecasts[0].weather[0].icon}@2x.png" alt="${dailyForecasts[0].weather[0].description}">
                        <figcaption id="figcaption-1">${dailyForecasts[0].weather[0].description}</figcaption>
                    </figure>
                    <p>Temperature: <span id="temp-1">${parseFloat(dailyForecasts[0].main.temp).toFixed(0)}°F</span></p>
                </div>
                <div class="day-box">
                    <h4 id="day-02">${weekdays[(day + 2) % 7]}</h4>
                    <figure>
                        <img id="weather-icon-2" src="https://openweathermap.org/img/wn/${dailyForecasts[1].weather[0].icon}@2x.png" alt="${dailyForecasts[1].weather[0].description}">
                        <figcaption id="figcaption-2">${dailyForecasts[1].weather[0].description}</figcaption>
                    </figure>
                    <p>Temperature: <span id="temp-2">${parseFloat(dailyForecasts[1].main.temp).toFixed(0)}°F</span></p>
                </div>
                <div class="day-box">
                    <h4 id="day-03">${weekdays[(day + 3) % 7]}</h4>
                    <figure>
                        <img id="weather-icon-3" src="https://openweathermap.org/img/wn/${dailyForecasts[2].weather[0].icon}@2x.png" alt="${dailyForecasts[2].weather[0].description}">
                        <figcaption id="figcaption-3">${dailyForecasts[2].weather[0].description}</figcaption>
                    </figure>
                    <p>Temperature: <span id="temp-3">${parseFloat(dailyForecasts[2].main.temp).toFixed(0)}°F</span></p>
                </div>
            </div>
        `;
    };

    apiForecastFetch();
});

// Events
async function getEvents() {
    try {
        const response = await fetch("data/events.json");
        const data = await response.json();
        return data.events || [];
    } catch (error) {
        console.error("Error fetching events:", error);
        return [];
    }
}

async function displayEvents() {
    const events = await getEvents();
    const eventsContainer = document.getElementById("events-list");

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

document.addEventListener("DOMContentLoaded", () => {
    displayEvents();
});