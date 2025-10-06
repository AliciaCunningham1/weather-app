document.addEventListener('DOMContentLoaded', () => {
  // Function: Fetch Weather Data
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

  // Function: Display Weather Data
  function displayWeatherData(data) {
    const weatherContainer = document.getElementById('weatherDisplay');
    if (!weatherContainer) {
      console.error('weatherDisplay container not found');
      return;
    }

    const current = data.current_condition[0];
    const temp = current.temp_C;
    const desc = current.weatherDesc[0].value;
    const feelsLike = current.FeelsLikeC;

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
    if (!weatherContainer) {
      console.error('weatherDisplay container not found');
      return;
    }

    try {
      const data = await fetchWeatherData(location);
      displayWeatherData(data);
    } catch (error) {
      weatherContainer.innerHTML = `<p style="color: red;">Failed to fetch weather data. Please try again.</p>`;
    }
  }

  // Event Listener for Form Submission
  const weatherForm = document.getElementById('weatherForm');
  if (weatherForm) {
    weatherForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const locationInput = document.getElementById('locationInput');
      if (!locationInput) {
        console.error('locationInput element not found');
        return;
      }

      const location = locationInput.value.trim();
      if (!location) return;

      await getWeather(location);
    });
  } else {
    console.error('weatherForm element not found');
  }
});
