var data = [];

async function fetchWeatherData() {
    const response = await fetch("https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=60.10&lon=9.58");
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
        
        var time = data.properties.timeseries.time; 
        var temperature = timeseries.air_temperature; 
        
        cell1.innerHTML = time;
        cell2.innerHTML = temperature;
    });
}

populateTable();
