document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded');

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
      console.error('Fetch error:', error);
      throw error;
    }
  }

  function displayWeatherData(data) {
    const weatherContainer = document.getElementById('weatherDisplay');
    if (!weatherContainer) {
      console.error('weatherDisplay container not found');
      return;
    }

    console.log('Displaying weather data:', data);

    const current = data.current_condition[0];
    weatherContainer.innerHTML = `
      <h2>Current Weather</h2>
      <p><strong>Temperature:</strong> ${current.temp_C}°C</p>
      <p><strong>Feels Like:</strong> ${current.FeelsLikeC}°C</p>
      <p><strong>Description:</strong> ${current.weatherDesc[0].value}</p>
    `;
  }

  async function getWeather(location) {
    const weatherContainer = document.getElementById('weatherDisplay');
    if (!weatherContainer) {
      console.error('weatherDisplay container not found');
      return;
    }

    try {
      const data = await fetchWeatherData(location);
      displayWeatherData(data);
    } catch {
      weatherContainer.innerHTML = `<p style="color: red;">Failed to fetch weather data. Please try again.</p>`;
    }
  }

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

      console.log('Fetching weather for:', location);
      await getWeather(location);
    });
  } else {
    console.error('weatherForm element not found');
  }
});

