// Fetch town data from the server
fetch('get_town_data.php')
  .then(response => response.json())
  .then(townData => {
    // Populate dropdown list with town options
    const townSelect = document.getElementById('townSelect');
    townData.forEach(town => {
      const option = document.createElement('option');
      option.value = town.id;
      option.textContent = town.name;
      townSelect.appendChild(option);
    });

    // Event listener for dropdown change
    townSelect.addEventListener('change', function() {
      const selectedTownId = this.value;
      const selectedTown = townData.find(town => town.id == selectedTownId);
      if (selectedTown) {
        // Create a new town widget for the selected town
        new TownWidget(selectedTown);
      }
    });
  })
  .catch(error => console.error('Error fetching town data:', error));
