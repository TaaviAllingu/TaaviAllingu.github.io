<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Weather Table</title>
    <style>
    </style>
</head>
<body>
    <h1>Weather Forecast</h1>
    <div id="weather">
        <table id="myTable">
            <thead>
                <tr>
                    <th>Time</th>
                    <th>Temperature (°C)</th>
                </tr>
            </thead>
            <tbody>
                <!-- Table rows will be populated here -->
            </tbody>
        </table>
    </div>
    <script>
        let data = [];
        
        async function fetchWeatherData() {
            const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=59&longitude=26&hourly=temperature_2m&wind_speed_unit=ms&timezone=auto");
            const weatherData = await response.json();
            data = weatherData.hourly;
        }

        async function populateTable() {
            await fetchWeatherData();
            
            const table = document.getElementById('myTable').getElementsByTagName('tbody')[0];
            
            table.innerHTML = '';

            if (data && data.time && data.temperature_2m) {
                data.time.forEach(function(time, index) {
                    const row = table.insertRow();
                    
                    const cell1 = row.insertCell(0);
                    const cell2 = row.insertCell(1);
                    
                    const formattedTime = new Date(time).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
                    cell1.innerHTML = formattedTime;
                    cell2.innerHTML = data.temperature_2m[index].toFixed(1);
                });
            } else {
                const row = table.insertRow();
                const cell = row.insertCell(0);
                cell.colSpan = 2;
                cell.innerHTML = 'No weather data available at this time.';
            }
        }

        populateTable();
        
        setInterval(populateTable, 30 * 60 * 1000);  // Refresh every 30 minutes
    </script>
</body>
</html>
