var years = [];
var yrtotals = [];
var yrpass = [];

var myChart;
const dataURL = "https://opendata-nzta.opendata.arcgis.com/api/download/v1/items/d22181027a6d45549a1f284218911038/geojson?layers=0";


let getTotData = function(){
    
    fetch(dataURL)
         .then(response=> response.json())
         .then(setMultiData);
}

let getData = function() {
		
    fetch(dataURL)
         .then(response=> response.json())
         .then(setData);
}


//iterates through results set and for each year sends the data to function 
//which totals annual numbers and adds to data array
let setData = function(fullData){
    years = [];
    yrpass = [];
    
    features = fullData.features; //get the array of feature data
    
    for(i = 2012; i < 2023; i++){
        totYearsPass(features, i, 0);
    }

    showChart();
}

//iterates through results set and for each year sends the data to function 
//which totals annual numbers and adds to data array
let setMultiData = function(fullData){
    years = [];
    yrtotals = [];
    
    features = fullData.features; //get the array of feature data

    for(i = 2012; i < 2023; i++){
        totTests(features, i, 0);
    }
    
    showMultiChart();
}

//Function to sum the annual totals for tests passed and add total to array and push year to array
function totYearsPass(dataset,year, yeartotal){

    dataset.forEach(item => {
        dataYr = item.properties.testYear;

        if(dataYr == year){
            yeartotal += item.properties.passCount;
			
        }

    });
    years.push(year);
    yrpass.push(yeartotal);  
	
}

//Function to sum the annual totals for tests taken and add total to array and push year to array
function totTests(dataset,year,yeartotal){
    
    dataset.forEach(item => {
        
        dataYr = item.properties.testYear;

        if(dataYr == year){
            yeartotal += item.properties.testCount;

        }

    });
    years.push(year);
    yrtotals.push(yeartotal);   
	
}

//Creates a chart for a single line of data
function showChart(){

    if(myChart){
       myChart.destroy();
   }

    const chartData = {
      labels: years,
        datasets: [{
        label: "Driving Test Pass Numbers Annually",
        data: yrpass,
        borderColor: "rgb(255, 99, 132)",
        borderWidth: 2,
        fill: false
      }]
 };


const config = {
  type: "line",
  data: chartData,
};


myChart = new Chart(
  document.getElementById('myChart'),
  config
);
}

//creates a chart for two lines of data
function showMultiChart(){
    if(myChart){
       myChart.destroy();
   }
    
    const chartData = {
      labels: years,
        datasets: [{
        label: "Driving Test Pass Numbers Annually",
        data: yrpass,
        borderColor: "rgb(255, 99, 132)",
        borderWidth: 2,
        fill: false
      },
    {
        label: "Driving Tests Taken Annually",
        data: yrtotals,
        borderColor: "rgb(0, 99, 132)",
        borderWidth: 2,
        fill: false
      }          
    ]
 };
                   


    const config = {
        type: "line",
        data: chartData,
    };

  myChart = new Chart(
  document.getElementById('myChart'),
  config
  );
}