// Constructor function for Town widget
function TownWidget(townData) {
    this.townData = townData;
  
    // Create town widget elements
    this.container = document.createElement('div');
    this.container.classList.add('town-widget');
  
    this.title = document.createElement('h2');
    this.title.textContent = this.townData.name;
  
    this.weatherBtn = document.createElement('button');
    this.weatherBtn.textContent = 'Show Weather Graph';
    this.weatherBtn.addEventListener('click', this.getWeatherData.bind(this));
  
    this.graphCanvas = document.createElement('canvas');
  
    // Append elements to container
    this.container.appendChild(this.title);
    this.container.appendChild(this.weatherBtn);
    this.container.appendChild(this.graphCanvas);
  
    // Append container to the document body
    document.body.appendChild(this.container);
  }
  
  // Method to retrieve weather data for the town
  TownWidget.prototype.getWeatherData = function() {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Accept-Encoding': 'gzip',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        location: this.townData.coordinates,
        fields: ['temperature'],
        units: 'metric',
        timesteps: ['1h'],
        startTime: 'now',
        endTime: 'nowPlus23h'
      })
    };
  
    fetch('https://api.tomorrow.io/v4/timelines?apikey=FmpAdn7MeHzKbGHvIGGUVsNhBn8ywtSB', options)
      .then(response => response.json())
      .then(response => this.renderWeatherGraph(response))
      .catch(err => console.error(err));
  };
  
  // Method to render weather graph using Chart.js
  TownWidget.prototype.renderWeatherGraph = function(weatherData) {
    const temperatures = weatherData.data.timelines[0].intervals.map(interval => interval.values.temperature);
  
    new Chart(this.graphCanvas.getContext('2d'), {
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
  