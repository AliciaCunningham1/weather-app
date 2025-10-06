async function fetchWeatherData(location) {
    const url = `https://wttr.in/${location}?format=j1`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Error fetching weather data:', error);
        // fallback data
        return {
            current_condition: [{ temp_C: "24", FeelsLikeC: "26", weatherDesc: [{ value: "Partly Cloudy (Demo Data)" }] }],
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

function displayWeatherData(data) {
    const container = document.getElementById('weatherData');
    if (!container) return;
    const current = data.current_condition[0];
    let html = `
        <h2>Current Weather</h2>
        <p><strong>Temperature:</strong> ${current.temp_C}°C</p>
        <p><strong>Feels Like:</strong> ${current.FeelsLikeC}°C</p>
        <p><strong>Description:</strong> ${current.weatherDesc[0].value}</p>
    `;
    if (data.weather && data.weather.length > 0) {
        html += `<h3>5-Day Forecast</h3><div class="forecast">`;
        for (let i = 0; i < 5 && i < data.weather.length; i++) {
            const day = data.weather[i];
            html += `
                <div class="day">
                    <p><strong>Day ${i + 1}</strong></p>
                    <p>Avg Temp: ${day.avgtempC}°C</p>
                    <p>${day.hourly[0].weatherDesc[0].value}</p>
                </div>
            `;
        }
        html += `</div>`;
    }
    container.innerHTML = html;
}

async function getWeather(location) {
    const container = document.getElementById('weatherData');
    try {
        const data = await fetchWeatherData(location);
        displayWeatherData(data);
    } catch {
        if (container) container.innerHTML = `<p style="color:red;">Failed to fetch weather data.</p>`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('weatherForm');
    const input = document.getElementById('locationInput');
    if (form && input) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            const location = input.value.trim();
            if (location) await getWeather(location);
            else alert('Please enter a location.');
        });
    }
});

