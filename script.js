async function fetchWeatherData(location) {
    const apiKey = "YOUR_API_KEY_HERE"; // Replace with your real WeatherAPI key
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`;

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
    const weatherContainer = document.getElementById('weatherData');
    if (!weatherContainer) return;

    const temp = data.current.temp_c;
    const feelsLike = data.current.feelslike_c;
    const desc = data.current.condition.text;
    const icon = data.current.condition.icon;
    const locationName = `${data.location.name}, ${data.location.region}`;

    weatherContainer.innerHTML = `
        <h2>Current Weather</h2>
        <p><strong>Location:</strong> ${locationName}</p>
        <img src="https:${icon}" alt="${desc}" style="width: 60px; height: 60px;">
        <p><strong>Temperature:</strong> ${temp}°C</p>
        <p><strong>Feels Like:</strong> ${feelsLike}°C</p>
        <p><strong>Description:</strong> ${desc}</p>
    `;
}

async function getWeather(location) {
    const weatherContainer = document.getElementById('weatherData');
    try {
        const data = await fetchWeatherData(location);
        displayWeatherData(data);
    } catch (error) {
        if (weatherContainer) {
            weatherContainer.innerHTML = `<p style="color: red;">Failed to fetch weather data. Please try again.</p>`;
        }
    }
}

const searchBtn = document.getElementById('searchBtn');
const locationInput = document.getElementById('lo
