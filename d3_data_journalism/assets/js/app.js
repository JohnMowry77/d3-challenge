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
var chosenXAxis= "income";  //x
var chosenYAxis= "obesity"; //y
// //other variables:
// var age= "age"; //x
// var healthcare= "healthcare"; //y

// var poverty= "poverty"; //x
// var smokes= "smokes"; //y

//load data from assets/data/data.csv
d3.csv("assets/data/data.csv").then(function(state_Data, err) {
  if (err) throw err; //when promise fulfilled call it state_Data or return err
	
  //Format the data and type_cast as numbers (csv is string values)
	state_Data.forEach(function(data) {
    // console.log(data)
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
  var yAxis=chartGroup.append("g")
  			// .classed("axis", true)
  			    .call(leftAxis);

  //select the new g and circle, append to g
  var circlesGroup = chartGroup.selectAll("g circle")
    .data(state_Data)
    .enter()
    .append("g");
  
  // append circle x & y use stateCircle classed for formatting
  var circlesX_Y= circlesGroup.append("circle")
                              .attr("cx", d=> xLinearScale(d[chosenXAxis])) //will never be a string
                              .attr("cy", d=> yLinearScale(d[chosenYAxis]))
                              .attr("r", 20)
                              .classed("stateCircle", true)
                              .attr("stroke-width", "1")
                              .attr("stroke", "black");

  //append abbr to circles
  var circlesText = circlesGroup.append("text")//text doesn't exist right now, it will in the next few lines
                          .text(d => d.abbr) //function (d) {return d.abbr;})
                          .classed("stateText", true)
                          .attr("dx", d => xLinearScale(d[chosenXAxis])) //{return -20})
                          .attr("dy", d => yLinearScale(d[chosenYAxis])+1);

  //Create group for the three x-axis labels
  var xLabelsGroup=chartGroup.append("g")
  .attr("transform", `translate(${chartWidth/2}, ${chartHeight})`);
    // .attr("transform", "translate(" +(chartWidth/2) + " ," +(chartHeight +margin.top+20) +")")
    // .style("text-anchor", "middle")

  //Create x axis title, 3 variables
  var incomeLabel=xLabelsGroup.append("text")
                            .attr("x", 30)
                            // attr("x", chartWidth/2)
                            // attr("y", margin.top+chartHeight+10)
                            .attr("y", 0)
                            .attr("value", "income")
                            .attr("dx", "1em")
                            .classed("active", true)
                            .text("Income");

  var ageLabel= xLabelsGroup.append("text")
                               .attr("x", 30)
                               .attr("y", 10)
                               .attr("value", "age") // value to grab for event listener
                               .classed("inactive", true)
                               .text("Age");

  var povertyLabel= xLabelsGroup.append("text")
                             .attr("x", 30)
                             .attr("y", 20)
                             .attr("value", "poverty") // value to grab for event listener
                             .classed("inactive", true)
                             .text("poverty");

  //create y axis for 3 variables
  var yLabelsGroup= chartGroup.append("g");

  var yObesity = yLabelsGroup.append("text")
                             .attr("transform", "rotate(-90)")
                             .attr("y", 0-margin.left) //move this back to 0. NEED TO ADJUST SVG ABOVE
                             .attr("x", 0-(chartHeight/2))
                             .attr("value", "obesity")
                             .attr("dy", "1em")
                             .classed("axis-text", true)
                             .text("Obesity %");


  var yHealthcare = yLabelsGroup.append("text")
                                .attr("transform", "rotate(-90)")
                                .attr("y", 80) //move this back to 0. NEED TO ADJUST SVG ABOVE
                                .attr("x", 0-(chartHeight/2))
                                .attr("value", "healthcare")
                                .attr("dy", "1em")
                                .classed("axis-text", true)
                                .text("Lacks Healthcare (%)");

  var ySmoke = yLabelsGroup.append("text")
                           .attr("transform", "rotate(-90)")
                           .attr("y", 40 -margin.left) //move this back to 0. NEED TO ADJUST SVG ABOVE
                           .attr("x", 0-(chartHeight/2))
                           .attr("value", "smokes")
                           .attr("dy", "1em")
                           .classed("axis-text", true)
                           .text("% Smoking");
  //updateTollTip function above csv import
 circlesGroup= updateToolTip(circlesGroup, chosenXAxis, chosenYAxis);
  	// //Step 1: Append tooltip div
  	// var toolTip=d3.select("body")
  	// 			  .append("div", "#scatter")
  	// 			  .attr("class", "d3-tip");		  

  //x axis lables event listener
  xLabelsGroup.selectAll("text")
             .on("click", function() {
                var value =d3.select(this).attr("value");
                if (value!== chosenXAxis) {
                  //replaces chosenXAxis with value
                  chosenXAxis =value;
                  // console.log(chosenXAxis)
              
                  // functions here found above csv import
                  // updates x scale for new data
                  xLinearScale = xScale(state_Data, chosenXAxis);

                  // updates x axis with transition 
                  xAxis = renderAxes(xLinearScale, xAxis);

                  // updates circles with new x values
                  circlesX_Y = renderXCircles(circlesX_Y, xLinearScale, chosenXAxis);

                  // update circles text with new x values
                  circlesText= renderXText(circlesText, xLinearScale, chosenXAxis);

                  // updates tooltips with new info
                  circlesGroup = updateToolTip(circlesGroup, chosenXAxis, chosenYAxis);;

                  //changes classes to changes bold text
                  if (chosenXAxis === "income") { //returns boolean ===
                    incomeLabel
                    .classed("active", true)
                    .classed("inactive", false);
                    ageLabel
                    .classed("active", true)
                    .classed("inactive", false);
                    povertyLabel
                    .classed("active", false)
                    .classed("inactive", true);
                  }
                    else if (chosenXAxis ==="age") {
                      incomeLabel
                      .classed("active", false)
                      .classed("inactive", true);
                      ageLabel
                      .classed("active", false)
                      .classed("inactive", true);
                      povertyLabel
                      .classed("active", true)
                      .classed("inactive", false);
                    }
                    else {
                      incomeLabel
                      .classed("active", false)
                      .classed("inactive", true);
                      ageLabel
                      .classed("active", true)
                      .classed("inactive", false);
                      povertyLabel
                      .classed("active", true)
                      .classed("inactive", false);

                    }

                  // if (chosenYAxis === "obesity") {
                  //   incomeLabel
                  //   .classed("active", true)
                  //   .classed("inactive", false);
                  //   ageLabel
                  //   .classed("active", false)
                  //   .classed("inactive", true);
                  // }
                    // else {
                    //   povertLabel
                    //   .classed("active", false)
                    //   .classed("inactive", true);
                    // }
                  }
            });

  //y axis lables event listener
  yLabelsGroup.selectAll("text")
             .on("click", function() {
                var value =d3.select(this).attr("value");
                if (value!== chosenYAxis) {
                  //replaces chosenXAxis with value
                  chosenYAxis =value;
                  // console.log(chosenXAxis)
              
                  // functions here found above csv import
                  // updates y scale for new data
                  yLinearScale = yScale(state_Data, chosenYAxis);

                  // updates x axis with transition 
                  yAxis = renderYAxes(yLinearScale, yAxis);

                  // updates circles with new x values
                  circlesX_Y = renderYCircles(circlesX_Y, yLinearScale, chosenYAxis);

                  // update circles text with new x values
                  circlesText= renderYText(circlesText, yLinearScale, chosenYAxis);

                  // updates tooltips with new info
                  circlesGroup = updateToolTip(circlesGroup, chosenXAxis, chosenYAxis);;
                  //changes classes to changes bold text
                  if (chosenYAxis === "obesity") { //returns boolean ===
                    yObesity
                    .classed("active", true)
                    .classed("inactive", false);
                    yHealthcare
                    .classed("active", false)
                    .classed("inactive", true);
                    ySmoke
                    .classed("active", false)
                    .classed("inactive", true);
                  }
                    else if (chosenYAxis ==="healthcare") {
                      yObesity
                      .classed("active", false)
                      .classed("inactive", true);
                      yHealthcare
                      .classed("active", true)
                      .classed("inactive", false);
                      ySmoke
                      .classed("active", true)
                      .classed("inactive", false);
                    }
                    else {
                      yObesity
                      .classed("active", false)
                      .classed("inactive", true);
                      yHealthcare
                      .classed("active", true)
                      .classed("inactive", false);
                      ySmoke
                      .classed("active", true)
                      .classed("inactive", false);
                    }
                    
                  }
            });                  
// .catch(function(error) {
//   console.log(error);

});