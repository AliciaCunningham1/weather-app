document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('weatherForm');
    const input = document.getElementById('locationInput');
    const output = document.getElementById('weatherData');

    async function fetchWeather(location) {
        try {
            const res = await fetch(`https://wttr.in/${location}?format=j1`);
            if (!res.ok) throw new Error('Network error');
            return await res.json();
        } catch {
            return {
                current_condition: [{ temp_C: "24", FeelsLikeC: "26", weatherDesc: [{ value: "Demo Weather" }] }],
                weather: [
                    { avgtempC: "22", hourly: [{ weatherDesc: [{ value: "Sunny" }] }] },
                    { avgtempC: "25", hourly: [{ weatherDesc: [{ value: "Cloudy" }] }] },
                    { avgtempC: "23", hourly: [{ weatherDesc: [{ value: "Rain" }] }] },
                    { avgtempC: "21", hourly: [{ weatherDesc: [{ value: "Overcast" }] }] },
                    { avgtempC: "24", hourly: [{ weatherDesc: [{ value: "Sunny Intervals" }] }] }
                ]
            };
        }
    }

    function showWeather(data) {
        if (!output) return;
        const cur = data.current_condition[0];
        let html = `<h2>Current Weather</h2>
                    <p>Temperature: ${cur.temp_C}°C</p>
                    <p>Feels Like: ${cur.FeelsLikeC}°C</p>
                    <p>Description: ${cur.weatherDesc[0].value}</p>`;
        if (data.weather) {
            html += `<h3>5-Day Forecast</h3><div class="forecast">`;
            data.weather.slice(0,5).forEach((day, i) => {
                html += `<div class="day">
                            <p>Day ${i+1}</p>
                            <p>Avg Temp:
