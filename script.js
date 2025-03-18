var data = [];

async function fetchWeatherData() {
    const response = await fetch("https://api.met.no/weatherapi/locationforecast/2.0/forecast?latitude=59&longitude=26");
    const weatherData = await response.json();
    data = weatherData.properties.timeseries; // Adjusting to match the actual structure of the API response
}

function getLocalTimeIndex() {
    const now = new Date(); // Get current time
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTimeInMinutes = currentHour * 60 + currentMinute;

    // Find the index of the first forecast for the next time (local time)
    for (let i = 0; i < data.length; i++) {
        const forecastTime = new Date(data[i].time); // The time is in ISO format
        const forecastHour = forecastTime.getHours();
        const forecastMinute = forecastTime.getMinutes();
        const forecastTimeInMinutes = forecastHour * 60 + forecastMinute;

        if (forecastTimeInMinutes >= currentTimeInMinutes) {
            return i;
        }
    }

    return 0; // If no time found, fallback to the first element
}

async function populateTable() {
    await fetchWeatherData();
    var table = document.getElementById('myTable');
    
    // Get the index to start displaying from local time
    const startIndex = getLocalTimeIndex();

    // Set a limit of displaying the next 24 hours of weather data
    const endIndex = Math.min(startIndex + 24, data.length);

    for (let i = startIndex; i < endIndex; i++) {
        var row = table.insertRow();
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        
        const forecastTime = new Date(data[i].time);
        
        // Format time to HH:MM (local time)
        var formattedTime = forecastTime.getHours().toString().padStart(2, '0') + ':' + forecastTime.getMinutes().toString().padStart(2, '0');
        
        // Get the temperature (assuming temperature is in `temperature_2m` or similar)
        var temperature = data[i].data.instant.details.air_temperature;

        cell1.innerHTML = formattedTime;
        cell2.innerHTML = `${temperature}°C`;
    }
}

// Call populateTable to load data into the table
populateTable();
