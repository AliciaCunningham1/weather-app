// Function: Fetch Weather Data
async function fetchWeatherData(location) {
    const url = `https://wttr.in/${location}?format=j1`;

    try {
        const response = await fetch(url); // get data from the API

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const weatherData = await response.json(); // parse it as JSON
        return weatherData;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error; // rethrow so we can handle it elsewhere
    }
}

// Function: Display Weather Data
function displayWeatherData(data) {
    // grab elements
    const weatherContainer = document.getElementById('weatherDisplay');

    // extract the current weather info
    const current = data.current_condition[0];
    const temp = current.temp_C;
    const desc = current.weatherDesc[0].value;
    const feelsLike = current.FeelsLikeC;

    // build HTML string
    weatherContainer.innerHTML = `
        <h2>Current Weather</h2>
        <p><strong>Temperature:</strong> ${temp}°C</p>
        <p><strong>Feels Like:</strong> ${feelsLike}°C</p>
        <p><strong>Description:</strong> ${desc}</p>
    `;
}

// Function: Get Weather
async function getWeather(location) {
    const weatherContainer = document.getElementById('weatherDisplay');

    try {
        const data = await fetchWeatherData(location); // get data
        displayWeatherData(data); // show it
    } catch (error) {
        // show error message in the UI
        weatherContainer.innerHTML = `<p style="color: red;">Failed to fetch weather data. Please try again.</p>`;
    }
}

// Event Listener for Form Submission
document.getElementById('weatherForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const location = document.getElementById('locationInput').value.trim();

    if (location === '') return;

    await getWeather(location);
});
