// Fetch weather data from API
async function fetchWeatherData(location) {
    const url = `https://wttr.in/${location}?format=j1`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error fetching weather data:', error);

        // Fallback mock data so it still shows something on GitHub Pages
        return {
            current_condition: [
                {
                    temp_C: "24",
                    FeelsLikeC: "26",
                    weatherDesc: [{ value: "Partly Cloudy (Demo Data)" }]
                }
            ],
            weather: [
                { avgtempC: "22", hourly: [{ weatherDesc: [{ value: "Sunny" }] }] },
                { avgtempC: "25", hourly: [{ weatherDesc: [{ value: "Partly Cloudy" }] }] },
                { avgtempC: "23", hourly: [{ weatherDesc: [{ value: "Light Rain" }] }] },
                { avgtempC: "21", hourly: [{ weatherDesc: [{ value: "Overcast" }] }] },
                { avgtempC: "24", hourly: [{ weatherDesc: [{ value: "Sunny Intervals" }] }] }
            ]
        };
    }
}

// Display weather data and forecast
function displayWeatherData(data) {
    const container = document.getElementById('weatherData');
    if (!container) return;

    const current = data.current_condition[0];
    const temp = current.temp_C;
    const feelsLike = current.FeelsLikeC;
    const desc = current.weatherDesc[0].value;

    let html = `
        <h2>Current Weather</h2>
        <p><strong>Temperature:</strong> ${temp}°C</p>
        <p><strong>Feels Like:</strong> ${feelsLike}°C</p>
        <p><strong>Description:</strong> ${desc}</p>
    `;

    if (data.weather && data.weather.length > 0) {
        html += `<h3>5-Day Forecast</h3><div class="forecast">`;
        for (let i = 0; i < 5 && i < data.weather.length; i++) {
            const day = data.weather[i];
            const avgTemp = day.avgtempC;
            const dayDesc = day.hourly[0].weatherDesc[0].value;
            html += `
                <div class="day">
                    <p><strong>Day ${i + 1}</strong></p>
                    <p>Avg Temp: ${avgTemp}°C</p>
                    <p>${dayDesc}</p>
                </div>
            `;
        }
        html += `</div>`;
    }

    container.innerHTML = html;
}

// Get weather and handle errors
async function getWeather(location) {
    const container = document.getElementById('weatherData');
    try {
        const data = await fetchWeatherData(location);
        displayWeatherData(data);
    } catch (error) {
        if (container) {
            container.innerHTML = `<p style="color:red;">Failed to fetch weather data. Please try again.</p>`;
        }
    }
}

// Form submit event listener
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('weatherForm');
    const input = document.getElementById('locationInput');

    if (form && input) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            const location = input.value.trim();
            if (location) {
                await getWeather(location);
            } else {
                alert('Please enter a location.');
            }
        });
    }
});

