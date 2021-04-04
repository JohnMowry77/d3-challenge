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
var x_Axis= "income";
var y_Axis= "obesity";

//load data from assets/data/data.csv
census_data = d3.csv("assets/data/data.csv").then(function(census_data) {
	//print(census_data)
	console.log(census_data);


});
