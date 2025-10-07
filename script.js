async function fetchWeatherData(location) {
    const url = `https://wttr.in/${location}?format=j1`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const weatherData = await response.json();
        return weatherData;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
}

function displayWeatherData(data) {
    const weatherDiv = document.getElementById('weatherData');
    const area = data.nearest_area[0].areaName[0].value;
    const region = data.nearest_area[0].region[0].value;
    const country = data.nearest_area[0].country[0].value;
    const temperature = data.current_condition[0].temp_F;
    const condition = data.current_condition[0].weatherDesc[0].value;

    weatherDiv.innerHTML = `
        <div class="card p-3 shadow-sm">
            <h2>${area}, ${region}, ${country}</h2>
            <p><strong>Temperature:</strong> ${temperature}°F</p>
            <p><strong>Condition:</strong> ${condition}</p>
        </div>
    `;
}

async function getWeather(location) {
    const weatherDiv = document.getElementById('weatherData');
    try {
        const data = await fetchWeatherData(location);
        displayWeatherData(data);
    } catch (error) {
        weatherDiv.innerHTML = `
            <div class="alert alert-danger" role="alert">
                Unable to fetch weather data. Please check the location and try again.
            </div>
        `;
    }
}

document.getElementById('weatherForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const location = document.getElementById('locationInput').value.trim();
    if (location === '') {
        document.getElementById('weatherData').innerHTML = `
            <div class="alert alert-warning" role="alert">
                Please enter a location before submitting.
            </div>
        `;
        return;
    }
    await getWeather(location);
});

