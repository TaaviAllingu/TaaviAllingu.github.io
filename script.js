var data = [];
 
 async function fetchWeatherData() {
     const response = await fetch("https://api.met.no/weatherapi/locationforecast/2.0//forecast?latitude=59&longitude=26");
     const weatherData = await response.json();
     data = weatherData.hourly;
 
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
 
 populateTable();         make it show 1 day and starding from local pc time
