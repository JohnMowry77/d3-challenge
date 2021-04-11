# d3-challenge

## Background

Welcome to the newsroom! You've just accepted a data visualization position for a major metro paper. You're tasked with analyzing the current trends shaping people's lives, as well as creating charts, graphs, and interactive elements to help readers understand your findings.

The editor wants to run a series of feature stories about the health risks facing particular demographics. She's counting on you to sniff out the first story idea by sifting through information from the U.S. Census Bureau and the Behavioral Risk Factor Surveillance System.

The data set included with the assignment is based on 2014 ACS 1-year estimates from the [US Census Bureau](https://data.census.gov/cedsci/), but you are free to investigate a different data set. The current data set includes data on rates of income, obesity, poverty, etc. by state. MOE stands for "margin of error."

### Initial steps:
1. Create a new repository for this project called `D3-Challenge`. **Do not add this homework to an existing repository**.

2. Clone the new repository to your computer.

3. Inside your local git repository, create a directory for the D3 challenge. Use the folder name to correspond to the challenge: **D3_data_journalism**.

4. This homework utilizes both **html** and **Javascript** so be sure to add all the necessary files. These will be the main files to run for analysis.

5. Push the above changes to GitHub or GitLab.

6. Begin coding by defining SVG area dimensions and define the margins for the chart. 

7. Create an SVG wrapper, select div, append SVG area to it, and set its dimensions and shift the latter by left and top margins.

8. Append an SVG group, then set its margins

9. Set initial params

10. load data from assets/data/data.csv

11. Format the data and type cast as numbers (csv is string values)

12. Create new js file named functions.js . 
	a. build functions to be called in the main app.js file
	b. build function xScale and yScale
	c. build function to render xScale and yScale. renderAxes and renderYAxes
	d. build function to render circles for x and y. renderXCircles and renderYCircles
	e. build function to render text for x and y. renderYText and renderYText
	f. build function to update circle groups with new tooltip. updateToolTip
	h. Add functions.js to html. Put the script above the app.js to ensure functions are live before app.js events.

13. use xScale and yScale to create xLinearScale and yLinearScale

14. Create bottomAxis and leftAxis using the d3.axis function and pass x/yLinearScale

15. Append x axis. Append an SVG group element to the SVG area, create the bottom axis inside of it. Tranlsate the bottom axis to the bottom of the page.

16. Append y axis. Append an SVG group element to the SVG area, create the left axis inside of it.

17. select the new g and circle, append to g, set to a variable called circlesGroup.

18. append circle x and y, use stateCircle classed for formatting. Adjust width and color of circle. 

19. Append the state abbreviation using abbr using a function. Use stateText for classed and set attr dx and dy using a function to pass the chosenXAxis and chosenYAxis to the xLinearScale functio.

20. Create group for the three x-axis labels. Use income, age, and poverty as your x axis. Use classed active and inactive to represent which one will be active on the d3 scatter chart.  

21. Create group for the three y-axis labels. Use obseity, healthcare, smokes as your y axis. Use classed active and inactive to represent which one will be active on the d3 scatter chart. 

22. Create an event listener using xLabelsGroup. Use d3.select(node) element,d3.select(this).attr("value"). Use if statement and set value to if not equal to chosenXAxis, then set chosenXAxis to value. Update xLinearScale for new data, use the xScale function. Update xAxis with transition by calling the renderXCircles function. Update circles text with new x values by calling the renderXText function. Update circlesGroup using the updateToolTip function. Use conditionals to change chosenAXis to active or inactive. use the class active and class inactive as classed references. #Use an if, else if, else statement. 

23. Create an event listener using yLablesGroup. Use d3.select(node) element,d3.select(this).attr("value"). Use if statement and set value to if not equal to chosenYAxis, then set chosenYAxis to value. Update yLinearScale for new data, use the yScale function. Update yAxis with transition by calling the renderYCircles function. Update circles text with new y values by calling the renderYText function. Update circlesGroup using the updateToolTip function. Use conditionals to change chosenYXis to active or inactive. use the class active and class inactive as classed references. #Use an if, else if, else statement.

24. Adjust html to update paragraph. Remove starter code text and input observations.

25. Update html header. Rename h1. Update h2 to adjust for padding and font size.

26. Give h1 & h2 a class within style.css