document.getElementById('weather-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const city = document.getElementById('city').value;
    const searchUrl = `https://www.metaweather.com/api/location/search/?query=${city}`;

    fetch(searchUrl)
        .then(response => response.json())
        .then(data => {
            if (data.length === 0) {
                throw new Error('City not found');
            }
            const woeid = data[0].woeid;
            const weatherUrl = `https://www.metaweather.com/api/location/${woeid}/`;

            return fetch(weatherUrl);
        })
        .then(response => response.json())
        .then(data => {
            const weatherResult = document.getElementById('weather-result');
            const weather = data.consolidated_weather[0];
            weatherResult.innerHTML = `
                <h2>Weather in ${data.title}</h2>
                <p>Temperature: ${weather.the_temp.toFixed(1)}°C</p>
                <p>Weather: ${weather.weather_state_name}</p>
                <p>Humidity: ${weather.humidity}%</p>
                <p>Wind Speed: ${weather.wind_speed.toFixed(1)} mph</p>
            `;
        })
        .catch(error => {
            console.error('Error fetching the weather data:', error);
            alert(error.message);
        });
});
