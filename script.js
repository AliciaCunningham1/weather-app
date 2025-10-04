// Get weather data from the API
async function fetchWeatherData(location) {
    const url = `https://wttr.in/${location}?format=j1`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;

    } catch (err) {
        console.error('Error fetching weather data:', err);
        throw err;
    }
}

// Show the weather info on the page
function displayWeatherData(data) {
    const output = document.getElementById('weatherOutput');

    const current = data.current_condition[0];
    const temp = current.temp_C;
    const feelsLike = current.FeelsLikeC;
    const description = current.weatherDesc[0].value;

    output.innerHTML = `
        <h3>Current Weather</h3>
        <p><strong>Temperature:</strong> ${temp}°C</p>
        <p><strong>Feels Like:</strong> ${feelsLike}°C</p>
        <p><strong>Description:</strong> ${description}</p>
    `;
}

// Main function to get and show weather
async function getWeather(locatio

