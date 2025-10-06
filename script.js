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
    const weatherContainer = document.getElementById('weatherData');
    if (!weatherContainer) return;

    const current = data.current_condition[0];
    const temp = current.temp_C;
    const feelsLike = current.FeelsLikeC;
    const desc = current.weatherDesc[0].value;

    weatherContainer.innerHTML = `
        <h2>Current Weather</h2>
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
            weatherContainer.innerHTML = `<p style="color: red;">Failed to f


