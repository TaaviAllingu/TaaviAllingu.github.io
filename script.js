var data = [];

async function fetchWeatherData() {
    const response = await fetch("https://api.met.no/weatherapi/locationforecast/2.0/forecast?latitude=59&longitude=26");
    const weatherData = await response.json();
    data = weatherData.properties.timeseries; 
}

async function populateTable() {
    await fetchWeatherData();
    var table = document.getElementById('myTable');
    
    data.forEach(function(entry) {
        var row = table.insertRow();
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        
        var time = entry.time; 
        var temperature = entry.data.instant.details.air_temperature; 
        
        cell1.innerHTML = time;
        cell2.innerHTML = temperature;
    });
}

populateTable();
