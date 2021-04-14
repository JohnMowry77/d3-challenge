//functions for commands on app.js

//Configure a linear scale w/ a range between 0 and the chartWidth
//function
function xScale(state_Data, chosenXAxis) {
  var xScale= d3.scaleLinear()
        .domain([d3.min(state_Data, d=> d[chosenXAxis]) * 0.90, 
        // .domain([3000,
          d3.max(state_Data, d => d[chosenXAxis])*1.1
          ])
        .range([0, chartWidth])

  return xScale; //scaler is a function so we have to call xScale(and then a #/value)
}

//function used for updating xAxis var upon click on axis label
function renderAxes(newXScale, xAxis) {
  var bottomAxis= d3.axisBottom(newXScale);

  xAxis.transition()
       .duration(800) //one second
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
    var leftAxis=d3.axisLeft(newYScale);

    yAxis.transition()
         .duration(1000)
         .call(leftAxis);

    return yAxis;
  }

  //function used for updtaing circles group with a transition to new cirles
function renderXCircles(circlesGroup, newXScale, chosenXAxis) {
  circlesGroup.transition()
              .duration(1000)
              .attr("cx", d => newXScale(d[chosenXAxis])); //chg the center of this circle will be to the new location

  return circlesGroup;
}
//function used for updating cirlces text with a transition to new circles
function renderYCircles(circlesGroup, newYScale, chosenYAxis) {
  circlesGroup.transition()
              .duration(1000)
              .attr("cy", d=> newYScale(d[chosenYAxis]));
  return circlesGroup;            
}

//function used for updating circles text, both X & Y
function renderXText(circlesGroup, newXScale, chosenXAxis) {
  circlesGroup.transition()
              .duration(1000)
              .attr("dx", d=> newXScale(d[chosenXAxis]));
  return circlesGroup;
}

function renderYText (circlesGroup, newYScale, chosenYAxis) {
  circlesGroup.transition()
              .duration (1000)
              .attr("dy", d=> newYScale(d[chosenYAxis]));
  return circlesGroup;
}

// function used for updating circles group with new tooltip
function updateToolTip(circlesGroup, chosenXAxis, chosenYAxis) {
  
  var xLabel=""

  if (chosenXAxis==="income") { // strict equal if two operands are equal returns boolean
    xLabel= "Income";
  }
    else if (chosenXAxis ==="age") {
      xLabel = "Age";
    }
    else {
    	xlabel="Poverty %"
    }

  var yLabel;

  if (chosenYAxis==="obesity") {
    yLabel = "Obesity %"
  }
    else if (chosenYAxis ==="healthcare"){
      yLabel= "Healthcare";
    }
    else {
    	ylabel= "smokes";
    }

  var toolTip =d3.tip()
                 .attr("class", "d3-tip")
                 .offset([80, -60])
                 .html(function(d) {
                  return(`${d.state}<br>${xLabel}</br>: ${d[chosenXAxis]}`);
                 });
  circlesGroup.call(toolTip);
  
  circlesGroup.on("mouseover", toolTip.show)

  // circlesGroup.on("mouseover", function(data) {
  //   toolTip.show(data, this);
  // })
  //on mouse out event
              .on("mouseout", toolTip.hide);

  
  return circlesGroup;
}