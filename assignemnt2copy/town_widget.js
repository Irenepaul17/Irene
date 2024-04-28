class TownWidget {
  constructor(townData, temperatureArr=[], temperature) {
    
      // Check if widget for this town already exists
      if (document.querySelector(`.town-widget[data-town="${townData.name}"]`)) {
          alert(`Widget for ${townData.name} already exists. Remove the existing widget first.`);
          return;
      }

      this.townData = townData;
      this.temperatureArr = temperatureArr;

      this.element = document.createElement('div');
      this.element.classList.add('town-widget');
      this.element.setAttribute('data-town', townData.name); // Set data attribute to identify town
      this.element.innerHTML = `
          <h2>${townData.name}</h2>
          <p>Coordinates: ${townData.coordinates}</p>
          <button class="graph-btn">Show Graph</button>
          <button class="remove-btn">Remove</button>
          <canvas id="weatherCanvas"></canvas> <!-- Add canvas for weather graph -->
      `;
      this.element.querySelector('.graph-btn').addEventListener('click', () => this.showGraph());
      this.element.querySelector('.remove-btn').addEventListener('click', () => this.remove());

      // Append the widget to the dashboard
      const dashboard = document.getElementById('dashboard');
      dashboard.appendChild(this.element);
  }

  showGraph() {
      // Placeholder function to fetch weather data and display graph
      alert(`Fetching weather data and displaying graph for ${this.townData.name}`);
      getWeatherData(this.townData, this.temperatureArr)
      // Fetch weather data for the town
      //this.getWeatherData();
  }

  remove() {
      // Remove the widget from the dashboard
      this.element.remove();
  }
}


  // Define your API key
  const apiKey = 'FmpAdn7MeHzKbGHvIGGUVsNhBn8ywtSB';


  // Method to retrieve weather data for the town

  //TownWidget.prototype.getWeatherData = function() {
  this.getWeatherData = function(data, arr) {
    console.log("Weather",data);
    
    
    const options ={ 
      method: "POST",
      headers: {
        accept: "application/json",
        "Accept-Encoding": "gzip",
        "content-type": "application/json",
      }, 
      body: JSON.stringify({
        location: data.lat + "," + data.lon,
        fields: ["temperature"],
        timesteps: ["1h"],
        startTime: "now",
        endTime: "nowPlus23h",
        units: "metric",
      }),
    }
    
    //const options = {method: 'GET', headers: {accept: 'application/json'}};
    fetch('https://api.tomorrow.io/v4/timelines?apikey='+apiKey, options)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        renderWeatherGraph(response, arr)
      })
      .catch(err => console.error(err));
  };
  
  // Method to render weather graph using Chart.js
  //TownWidget.prototype.renderWeatherGraph = function(weatherData) {
  this.renderWeatherGraph = function(weatherData, arr) {
    console.log(weatherData);
    //const temperatures = weatherData.timelines.daily.map(interval => interval.values.temperatureApparentAvg);
    const temperatures = weatherData.data.timelines[0].intervals.map(interval => interval.values.temperature);
    arr.push(temperatures)

  console.log("1", temperatures);
  console.log("2", arr);

  const chartContainer = this.weatherCanvas;
  let chartStatus = Chart.getChart("weatherCanvas"); // <canvas> id
if (chartStatus != undefined) {
  chartStatus.destroy();
        //(or)
 // chartStatus.clear();
}
  chartContainer.innerHTML = '';
    //new Chart(document.getElementById('weatherCanvas'), {
      new Chart(chartContainer, {
      type: 'line',
      data: {

        labels: Array.from({ length: 24 }, (_, i) => i), // Labels for 24 hours
        datasets: [{
          label: 'Temperature (°C)',
          data: temperatures,
          borderColor: 'rgb(75, 192, 192)',
          fill: false
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  };
  