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

//Create an SVG wrapper, select div, append SVG area to it, and set its dimensions
//and shift the latter by left and top margins
var svg= d3.select("#scatter")
		   .append("svg")
		   .attr("width", svgWidth)
		   .attr("height", svgHeight)

// Append an SVG group, then set its margins
var chartGroup= svg.append("g")
				   .attr("transform", `translate(${margin.left}, ${margin.top})`);

// // Initial Params (two variables chosen)
var chosenXAxis= "income";
var chosenYAxis= "obesity";
// //other variables:
// var healthcare= "healthcare";
// var age= "age";
// var poverty= "poverty";
// var smokes= "smokes";

//Configure a linear scale w/ a range between 0 and the chartWidth
//function
function xScale(state_Data, chosenXAxis) {
  var xScale= d3.scaleLinear()
        .domain([d3.min(state_Data, d=> d[chosenXAxis])*0.8, 
          d3.max(state_Data, d => d[chosenXAxis])*1.1
          ])
        .range([0, chartWidth])

  return xScale; //scaler is a function so we have to call xScale(and then a #/value)
}

//function used for updating xAxis var upon click on axis label
function renderAxes(newXScale, xAxis) {
  var bottomAxis= d3.axisBottom(newXscale);

  xAxis.transition()
       .duration(1000) //one second
       .call(bottomAxis);

  return xAxis;
}

//Configure a y scale function use linear scale w/ a range between the chartHeight and O
  //Set the domain for the yLinearScale function
function yScale(state_Data, chosenYAxis) {
  var yScale= d3.scaleLinear()
                .range([chartHeight, 0])
                .domain([d3.min(state_Data, d=> d[chosenYAxis])-1,
                  d3.max(state_Data, d=>d[chosenYAxis])+1
                  ])
                // .domain([15, d3.max(state_Data, d => d.obesity.)*1.2]);
  return yScale;
}

  function renderYAxes(newYScale, yAxis) {
    var leftAxis=d3.axisBottom(newYscale);

    yAxis.transition()
         .duration(1000)
         .call(leftAxis);

    return yAxis;
  }

//function used for updtaing circles group with a transition to new cirles
function renderXCircles(circlesGroup, newXscale, chosenXAxis) {
  circlesGroup.transition()
              .duration(1000)
              .attr("cx", d => newXscale(d[chosenXAxis])); //chg the center of this circle will be to the new location

  return circlesGroup;
}

function renderXCircles(circlesGroup, newYScale, chosenYAxis) {
  circlesGroup.transition()
              .duration(1000)
              .attr("cy", d=> newYScale(d[chosenYAxis]);
  return circlesGroup;            
}

// function used for updating circles group with new tooltip
function updateToolTip(chosenXAxis, circlesGroup) {
  
  var label; 

  if (chosenXAxis=='income') {
    label= "Income ($)";
  }
  else {
    label = "Income ($$$$$$)";
  }

  var toolTip =d3.tip()
                 .attr("class", "d3-tip")
                 .offset([80, -60])
                 .html(function(d) {
                  return(`${d.state}<br>${label} ${d[chosenXAxis]}`);
                 });
  circlesGroup.call(toolTip);
  
  circlesGroup.on("mouseover", function(data) {
    toolTip.show(data);
  })
  //on mouse out event
    .on("mouseout", function(data, index) {
      toolTip.hide(data);
    });
  
  return circlesGroup;
}

//load data from assets/data/data.csv
d3.csv("assets/data/data.csv").then(function(state_Data, err) {
  if (err) throw err; //when promise fulfilled call it state_Data or return err
	
  //Format the data and type_cast as numbers (csv is string values)
	state_Data.forEach(function(data) {
    // console.log(data)
		// state_Data['income']=parseTime(state_Data['income']);
		// state_Data['obesity']=parseTime(state_Data['obesity']);
		data['poverty']= +data['poverty'];
		data['age']= +data['age'];
		data['income']= +data['income'];
		data['healthcare']= +data['healthcare'];
		data['obesity']= +data['obesity'];
		data['smokes']= +data['smokes'];
	});


  // xScale function above csv import
  var xLinearScale= xScale(state_Data, chosenXAxis);
  // the xScale user defined function calls the d3.linearScale() 
  // returns a scaler function


	//Configure a y scale function use linear scale w/ a range between the chartHeight and O
	// Set the domain for the yLinearScale function
	// var yLinearScale= d3.scaleLinear()
	// 			              .domain([15, d3.max(state_Data, d => d.obesity)])
 //                      .range([chartHeight, 0]);
	
  var yLinearScale= yScale(state_Data, chosenYAxis);
  	// Create two new functions passing the scales in as arguments
  	// These will be used to create the chart's axes
  var bottomAxis=d3.axisBottom(xLinearScale); //this is your xAxis
  var leftAxis=d3.axisLeft(yLinearScale); //this is your yAxis


  //append x axis
  //Append an SVG group element to the SVG area, create the bottom axis inside of it
  //Tranlsate the bottom axis to the bottom of the page 
  var xAxis=chartGroup.append("g")
                      .classed("x-axis", true)
                      .attr("transform", `translate(0, ${chartHeight})`)
                      .call(bottomAxis);

  //append y axis
  //Append an SVG group element to the SVG area, create the left axis inside of it
  chartGroup.append("g")
  			// .classed("axis", true)
  			    .call(leftAxis);

	//Create scatterplot and append initial ciricles
	var circlesGroup=chartGroup.selectAll("circle")
								  .data(state_Data) //bind to each circle //does the below x number times sequentially
								  .enter() //create a placeholder
								  .append("circle") //append a circle in the placeholder
			   				  .attr("cx", d=> xLinearScale(d[chosenXAxis])) //will never be a string
			   				  .attr("cy", d=> yLinearScale(d[chosenYAxis]))
			   				  .attr("r", 20)
			   				  .classed("stateCircle", true)
			   				  .attr("stroke-width", "1")
			   				  .attr("stroke", "black");

    chartGroup.selectAll("stateText")//stateText doesn't exist right now, it will in the next few lines
                          .data(state_Data)
                          .enter()
                          .append("text")
                          .classed("stateText", true)
                          .attr("dx", function(d) {return -20})
                          .text(function(d) {return d.label})

  //Create group for two x-axis labels
  var labelsGroup=chartGroup.append("g")
  .attr("transform", `translate(${chartWidth/2}, ${chartHeight})`);

  //Create x axis title
  var xAxisLabel=labelsGroup.append("text")
                            .attr("x", 400)
                            // attr("x", chartWidth/2)
                            // attr("y", margin.top+chartHeight+10)
                            .attr("y", 0)

                            .attr("value", "income")
                            .classed("active", true)
                            .text("Income");

  var income_one = labelsGroup.append("text")
                               .attr("x", 0)
                               .attr("y", 250)
                               .attr("value", "incomeMoe") // value to grab for event listener
                               .classed("inactive", true)
                               .text("IncomeMoe");

  //create y axis
  chartGroup.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", -10 -margin.left) //move this back to 0. NEED TO ADJUST SVG ABOVE
            .attr("x", 0-(chartHeight/2))
            .attr("dy", "1em")
            .classed("axis-text", true)
            .text("Obesity");

  //updateTollTip funciton above csv import
  var circlesGroup= updateToolTip(chosenXAxis, circlesGroup);
  	// //Step 1: Append tooltip div
  	// var toolTip=d3.select("body")
  	// 			  .append("div", "#scatter")
  	// 			  .attr("class", "d3-tip");		  

  //x axis lables event listener
  labelsGroup.selectAll("text")
             .on("click", function() {
                var value =d3.select(this).attr("value");
                if (value!== chosenXAxis) {
                  //replaces chosenXAxis
                  chosenXAxis =value;
                  // console.log(chosenXAxis)
              
                  // functions here found above csv import
                  // updates x scale for new data
                  xLinearScale = xScale(state_Data, chosenXAxis);

                  // updates x axis with transition 
                  xAxis = renderAxes(xLinearScale, xAxis);
                  // updates y axis with transition 
                  yAxis = renderyAxes(YLinearScale, yAxis);
                  // updates circles with new x values
                  circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis);

                  // updates tooltips with new info
                  circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

                  //changes classes to changes bold text
                  if (chosenAxis === "obesity") {
                    income_one
                    .classed("active", true)
                    .classed("inactive", false);
                    xAxisLabel
                    .classed("active", false)
                    .classed("inactive", true);
                  }
                  else {
                    income_one
                    .classed("active", false)
                    .classed("inactive", true);
                  }
                }

            });

}).catch(function(error) {
  console.log(error);
});

