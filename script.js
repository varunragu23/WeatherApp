var cnt = 0;

function getWeather() {
    const apiKey = 'dfb2958f3dc5cb86a7b1f16d941bb3d4';
    const city = document.getElementById('city').value;

    if (!city) {
        alert('Please enter a city');
        return;
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;


    const weatherCard = createWeatherCard();

    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            addWeatherData(weatherCard, data);
        })
        .catch(error => {
            console.error('Error fetching current weather data:', error);
            alert('Error fetching current weather data. Please try again. asdlkfja;');
        });

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            addForecastData(weatherCard, data.list);
        })
        .catch(error => {
            console.error('Error fetching hourly forecast data:', error);
            alert('Error fetching hourly forecast data. Please try again. hi hihihihiihii');
        });
    
    document.getElementById('weather-cards-container').appendChild(weatherCard);
    cnt++;
    if(cnt >= 1) {
        document.getElementById('weather-cards-container').style.display = 'flex';
    }
}

function createWeatherCard() {
    const weatherContainer = document.createElement('div');
    weatherContainer.className = 'weather-container';

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button';
    deleteButton.textContent = 'Delete City';
    deleteButton.onclick = () => {
        cnt--; 
        weatherContainer.remove();
        if(cnt == 0) {
            document.getElementById('weather-cards-container').style.display = 'none';
        }
    } // Ensure this removes the card

    const weatherIcon = document.createElement('img');
    weatherIcon.className = 'weather-icon';
    weatherIcon.alt = 'Weather Icon';
    // weatherIcon.src = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`;

    const tempDiv = document.createElement('div');
    tempDiv.className = 'temp-div';
    // tempDiv.innerHTML = `<p>${Math.round(weatherData.main.temp - 273.15)}°C</p>`;

    const weatherInfo = document.createElement('div');
    weatherInfo.className = 'weather-info';
    // weatherInfo.innerHTML = `
    //     <p>${city}</p>
    //     <p>${weatherData.weather[0].description}</p>
    // `;

    const hourlyForecast = document.createElement('div');
    hourlyForecast.className = 'hourly-forecast';

    // Append all elements to the weather container
    weatherContainer.appendChild(deleteButton);
    weatherContainer.appendChild(weatherIcon);
    weatherContainer.appendChild(tempDiv);
    weatherContainer.appendChild(weatherInfo);
    weatherContainer.appendChild(hourlyForecast);

    return weatherContainer; // Return the entire weather container
}

function deleteData() {

    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const hourlyForecastDiv = document.getElementById('hourly-forecast');
    const weatherContainer = document.getElementById('weather-container');

    // Clear previous content
    weatherInfoDiv.innerHTML = '';
    hourlyForecastDiv.innerHTML = '';
    tempDivInfo.innerHTML = '';
    weatherIcon.style.display = 'none';
    weatherContainer.style.display = 'none';
    document.getElementById('delete-button').style.display = 'none';

}

function addWeatherData(weatherCard, data) {
    const tempDivInfo = weatherCard.querySelector('.temp-div');
    const weatherInfoDiv = weatherCard.querySelector('.weather-info');
    const weatherIcon = weatherCard.querySelector('.weather-icon');
    const hourlyForecastDiv = weatherCard.querySelector('.hourly-forecast');
    const deleteButton =  weatherCard.querySelector('.delete-button');
    const weatherContainer = weatherCard.querySelector('.weather-container');
    
    
    deleteButton.style.display = 'block';

        // Clear previous content
        weatherInfoDiv.innerHTML = '';
        hourlyForecastDiv.innerHTML = '';
        tempDivInfo.innerHTML = '';
        weatherCard.style.display = 'flex';
    
    
        if (data.cod === '404') {
            weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
        } else {
            const cityName = data.name;
            const temperature = Math.round(data.main.temp - 273.15); // Convert to Celsius
            const description = data.weather[0].description;
            const iconCode = data.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
    
            const temperatureHTML = `
                <p>${temperature}°C</p>
            `;
    
            const weatherHtml = `
                <p>${cityName}</p>
                <p>${description}</p>
            `;
    
            tempDivInfo.innerHTML = temperatureHTML;
            weatherInfoDiv.innerHTML = weatherHtml;
            weatherIcon.src = iconUrl;
            weatherIcon.alt = description;
            showImage(weatherCard);
        }
}

function displayWeather(data) {
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const hourlyForecastDiv = document.getElementById('hourly-forecast');
    const weatherContainer = document.getElementById('weather-container');

    document.getElementById('delete-button').style.display = 'block';


    // Clear previous content
    weatherInfoDiv.innerHTML = '';
    hourlyForecastDiv.innerHTML = '';
    tempDivInfo.innerHTML = '';
    weatherContainer.style.display = 'flex';


    if (data.cod === '404') {
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
    } else {
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15); // Convert to Celsius
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        const temperatureHTML = `
            <p>${temperature}°C</p>
        `;

        const weatherHtml = `
            <p>${cityName}</p>
            <p>${description}</p>
        `;

        tempDivInfo.innerHTML = temperatureHTML;
        weatherInfoDiv.innerHTML = weatherHtml;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;

        showImage();
    }
}

function addForecastData(weatherCard, hourlyData) {
    const hourlyForecastDiv = weatherCard.querySelector('.hourly-forecast');
    const next24Hours = hourlyData.slice(0, 8); // Display the next 24 hours (3-hour intervals)

    next24Hours.forEach(item => {
        const dateTime = new Date(item.dt * 1000); // Convert timestamp to milliseconds
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp - 273.15); // Convert to Celsius
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const hourlyItemHtml = `
            <div class="hourly-item">
                <span>${hour}:00</span>
                <img src="${iconUrl}" alt="Hourly Weather Icon">
                <span>${temperature}°C</span>
            </div>
        `;

        console.log(hourlyItemHtml);

        hourlyForecastDiv.innerHTML += hourlyItemHtml;
    });

}

function displayHourlyForecast(hourlyData) {
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    const next24Hours = hourlyData.slice(0, 8); // Display the next 24 hours (3-hour intervals)

    next24Hours.forEach(item => {
        const dateTime = new Date(item.dt * 1000); // Convert timestamp to milliseconds
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp - 273.15); // Convert to Celsius
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const hourlyItemHtml = `
            <div class="hourly-item">
                <span>${hour}:00</span>
                <img src="${iconUrl}" alt="Hourly Weather Icon">
                <span>${temperature}°C</span>
            </div>
        `;

        hourlyForecastDiv.innerHTML += hourlyItemHtml;
    });
}

function showImage() {
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block'; // Make the image visible once it's loaded
}

function showImage(weatherCard) {
    const weatherIcon = weatherCard.querySelector('.weather-icon');
    weatherIcon.style.display = 'block';
}