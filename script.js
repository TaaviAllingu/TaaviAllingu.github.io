var data = [];

async function fetchWeatherData() {
    const response = await fetch("https://api.met.no/weatherapi/locationforecast/2.0//forecast?latitude=59&longitude=26");
    const weatherData = await response.json();
    data = weatherData.hourly; // Adjusted to match the actual structure of the API response
}

function getLocalTimeIndex() {
    const now = new Date();
    const localHour = now.getHours();
    const localMinute = now.getMinutes();
    const localTime = localHour * 60 + localMinute; // Time in minutes since midnight

    // Find the index of the first time slot after the current time
    for (let i = 0; i < data.time.length; i++) {
        const forecastTime = new Date(data.time[i]);
        const forecastHour = forecastTime.getHours();
        const forecastMinute = forecastTime.getMinutes();
        const forecastTimeInMinutes = forecastHour * 60 + forecastMinute;

        if (forecastTimeInMinutes >= localTime) {
            return i;
        }
    }
    return 0; // Default to first index if not found
}

async function populateTable() {
    await fetchWeatherData();
    var table = document.getElementById('myTable');
    
    // Get index of first forecast for today from local time
    const startIndex = getLocalTimeIndex();
    
    // Display next 24 hours of data starting from the current local time
    const endIndex = Math.min(startIndex + 24, data.time.length);

    for (let index = startIndex; index < endIndex; index++) {
        var row = table.insertRow();
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var forecastTime = new Date(data.time[index]);

        // Format time to HH:MM
        var formattedTime = forecastTime.getHours().toString().padStart(2, '0') + ':' + forecastTime.getMinutes().toString().padStart(2, '0');
        
        cell1.innerHTML = formattedTime;
        cell2.innerHTML = data.temperature_2m[index] + "°C"; // Assuming temperature data is available
    }
}

// Call populateTable to load data into the table
populateTable();
