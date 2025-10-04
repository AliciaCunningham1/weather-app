// Function: Fetch Weather Data
async function fetchWeatherData(location) {
    const url = `https://wttr.in/${location}?format=j1`;
    try {
        const response = await fetch(url); // Fetch data from the API using async/await

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const weatherData = await response.json(); // Parse the response as JSON
        return weatherData;
    } catch (error) {
        console.error('Error fetching weather data:', error); // Log the error
        throw error; // Rethrow the error so it can be handled elsewhere
    }
}

// Function: Display Weather Data
function displayWeatherData(data) {
    // Extract current condition from API response
    const currentCondition = data.current_condition[0];
    const temperature = currentCondition.temp_C;
    const description = currentCondition.weatherDesc[0].value;

    // Select DOM elements and update with weather info
    const outputElement = document.getElementById('weatherOutput');
    outputElement.innerHTML = `
        <h3>Current Weather</h3>
        <p><strong>Temperature:</strong> ${temperature}°C</p>
        <p><strong>Condition:</strong> ${description}</p>
    `;
}

// Function: Get Weather
async function getWeather(location) {
    try {
        const data = await fetchWeatherData(location); // Fetch the weather data
        displayWeatherData(data); // Display it in the DOM
    } catch (error) {
        const outputElement = document.getElementById('weatherOutput');
        outputElement.innerHTML = `<p style="color:red;">Failed to fetch weather data. Please try again.</p>`;
    }
}

// Event Listener for Form Submission
document.getElementById('weatherForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const location = document.getElementById('locationInput').value.trim(); // Get user input

    if (location) {
        await getWeather(location); // Call getWeather with the input
    }
});
