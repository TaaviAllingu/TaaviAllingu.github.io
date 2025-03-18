var data = [];
 
 async function fetchWeatherData() {
     const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=59&longitude=26&hourly=temperature_2m&wind_speed_unit=ms&timezone=auto");
     const weatherData = await response.json();
     data = weatherData.hourly; // Adjusted to match the actual structure of the API response
 }
 
 async function populateTable() {
     await fetchWeatherData();
     var table = document.getElementById('myTable');
     
     data.time.forEach(function(time, index) {
         var row = table.insertRow();
         var cell1 = row.insertCell(0);
         var cell2 = row.insertCell(1);
         cell1.innerHTML = time;
         cell2.innerHTML = data.temperature_2m[index];
     });
 }
 
 populateTable();
