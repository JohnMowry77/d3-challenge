// @TODO: YOUR CODE HERE!

//Define SVG area dimensions
var svgWidth= 960;
var svgHeight= 500;

//Define the chart's margins as an object
var margin= {
	top: 20,
	right: 20,
	bottom: 20,
	left: 20
};

//Define dimensions of the chart area
var chartWidth= svgWidth-margin.left-margin.right;
var chartHeight= svgHeight-margin.top-margin.bottom;

//select div, append SVG area to it, and set its dimensions
var svg= d3.select("scatter")
		   .append("svg")
		   .attr("width", svgWidth)
		   .attr("height", svgHeight)

// Append an SVG group, then set its margins
var chartGroup= svg.append("g")
				   .attr("transform", `translate(${margin.left}, ${margin.top})`);

//Configure a parseTime function which will return a new Date object from a string
var parseTime=d3.timeParse("%B");
console.log(parseTime);

//two variables chosen:
var inc_Xaxis= "income";
var obs_Yaxis= "obesity";

//load data from assets/data/data.csv
state_Data = d3.csv("assets/data/data.csv").then(function(state_Data) {
	//print(census_data)
	console.log(state_Data);

	//Format the data and cast as numbers
	state_Data.forEach(function(data) {
		// state_Data['income']=parseTime(state_Data['income']);
		// state_Data['obesity']=parseTime(state_Data['obesity']);
		state_Data['income']= +state_Data['income'];
		state_Data['obesity']= +state_Data['obesity'];
	});

	//Configure a time scale w/ a range between 0 and the chartWidth
	var xScale= d3.scaleLinear()
				  .range([0, chartWidth])
				  .domain([0, d3.max(state_Data, data => state_Data['income'])]);

	console.log(xScale);

	//Configure a linear scale w/ a range between the chartHeight and O
	//Set the domain for the yLinearScale function
	var yScale= d3.scaleLinear()
				  .range([chartHeight, 0])
				  .domain([0, d3.max(state_Data, data => state_Data['obesity'])]);
	
	console.log(yScale);
  	// Create two new functions passing the scales in as arguments
  	// These will be used to create the chart's axes
  	var bottomAxis=d3.axisBottom(xScale);
  	var leftAxis=d3.axisLeft(yScale);
  	


});
