// script.js

class TownWidget {
    constructor(townName) {
        // Check if widget for this town already exists
        if (document.querySelector(`.town-widget[data-town="${townName}"]`)) {
            alert(`Widget for ${townName} already exists. Remove the existing widget first.`);
            return;
        }

        this.townName = townName;
        this.element = document.createElement('div');
        this.element.classList.add('town-widget');
        this.element.setAttribute('data-town', townName); // Set data attribute to identify town
        this.element.innerHTML = `
            <h2>${townName}</h2>
            <button class="graph-btn">Show Graph</button>
            <button class="remove-btn">Remove</button>
        `;
        this.element.querySelector('.graph-btn').addEventListener('click', () => this.showGraph());
        this.element.querySelector('.remove-btn').addEventListener('click', () => this.remove());
        document.getElementById('dashboard').appendChild(this.element);
    }

    showGraph() {
        // Placeholder function to fetch weather data and display graph
        alert(`Fetching weather data and displaying graph for ${this.townName}`);
    }

    remove() {
        this.element.remove();
    }
}

// Function to fetch town data from the server
function fetchTownData() {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json'
        }
    };

    const apiUrl = 'https://api.tomorrow.io/v4/weather/forecast?location=new%20york&apikey=FmpAdn7MeHzKbGHvIGGUVsNhBn8ywtSB';


    // Fetch town data from API
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Check if the data received is in the expected format
            console.log(data); 
            if (!isValidDataFormat(data)) {
                throw new Error('Data received is not in the expected format');
            }
            console.log(data); // Log the data received from the API
            populateDropDown(data); // Call the function to populate dropdown with data
        })
        .catch(error => console.error('Error fetching town data:', error));
}

// Function to check if the data format is valid
function isValidDataFormat(data) {
    // Your logic to check if the data format is valid
    // For example, if data should be an array, you can check:
    return Array.isArray(data);
}

// Function to populate the drop-down list with towns
function populateDropDown(towns) {
    const dropdown = document.createElement('select');
    dropdown.id = 'town-select';

    // Check if the towns array is empty
    if (towns.length === 0) {
        console.error('No town data received');
        return;
    }

    // Assuming each town object has a 'name' property
    towns.forEach(town => {
        const option = document.createElement('option');
        option.value = town.name;
        option.textContent = town.name;
        dropdown.appendChild(option);
    });

    // Add event listener for dropdown change
    dropdown.addEventListener('change', (event) => {
        const selectedTown = event.target.value;
        const townWidget = new TownWidget(selectedTown);
    });

    // Append the dropdown to the dashboard
    document.getElementById('dashboard').appendChild(dropdown);
}

// Main function to initialize the application
document.addEventListener('DOMContentLoaded', () => {
    fetchTownData();
});
