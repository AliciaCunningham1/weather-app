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
        // fallback data so it still works if wttr.in blocks the request
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

function displayWeatherData(data) {
    const weatherContainer = document.getElementById('weatherData');
    if (!weatherContainer) return;

    const current = data.current_condition[0];
    const temp = current.temp_C;
    const feelsLike = current.FeelsLikeC;
    const desc = current.weatherDesc[0].value;

    let forecastHTML = `<h2>Current Weather</h2>
        <p><strong>Temperature:</strong> ${temp}°C</p>
        <p><strong>Feels Like:</strong> ${feelsLike}°C</p>
        <p><strong>Description:</strong> ${desc}</p>`;

    if (data.weather && data.weather.length > 0) {
        forecastHTML += `<h3>5-Day Forecast</h3><div class="forecast">`;
        for (let i = 0; i < 5 && i < data.weather.length; i++) {
            const day = data.weather[i];
            const avgTemp = day.avgtempC;
            const dayDesc = day.hourly[0].weatherDesc[0].value;
            forecastHTML += `
                <div class="day">
                    <p><strong>Day ${i + 1}</strong></p>
                    <p>Avg Temp: ${avgTemp}°C</p>
                    <p>${dayDesc}</p>
                </div>
            `;
        }
        forecastHTML += `</div>`;
    }

    weatherContainer.innerHTML = forecastHTML;
}

async function getWeather(location) {
    const weatherContainer = document.getElementById('weatherData');
    try {
        const data = await fetchWeatherData(location);
        displayWeatherData(data);
    } catch (error) {
        if (weatherContainer) {
            weatherContainer.innerHTML = `<p style="color: red;

