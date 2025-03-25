var data = [];

async function fetchWeatherData() {
    const response = await fetch("https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=60.10&lon=9.58");
    const weatherData = await response.json();
    data = weatherData; 
}

async function populateTable() {
    await fetchWeatherData();
    var table = document.getElementById('myTable');
    
    data.forEach(function(entry) {
        var row = table.insertRow();
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        
        var time = properties.timeseries[0].data.next_6_hours.details.precipitation_amount; 
        var temperature = properties.timeseries[0].data.instant.details.air_temperature; 
        
        cell1.innerHTML = time;
        cell2.innerHTML = temperature;
    });
}

populateTable();
