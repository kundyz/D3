var svgHeight = 500;
var svgWidth = 900;

var margin = {
    top: 30,
    right: 100,
    bottom: 100,
    left: 100
};

var chartHeight = svgHeight - margin.top - margin.bottom;
var chartWidth = svgWidth - margin.left - margin.right;

var svg = d3.select("#scatter")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);
    
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.csv("assets/data/data.csv").then(function(healthData) {

    healthData.forEach(function(data) {
        data.poverty = +data.poverty;
        data.smokes = +data.smokes;
    });
        
    var xLinearScale = d3.scaleLinear()
        .domain([d3.min(healthData, d => d.poverty)*0.9, d3.max(healthData, d => d.poverty)*1.1])
        .range([0, chartWidth]);
        
    var yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(healthData, d => d.smokes)*1.1])
        .range([chartHeight, 0]);

    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    chartGroup.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .style("font-size", "18px")
        .call(bottomAxis);

    chartGroup.append("g")
        .style("font-size", "18px")
        .call(leftAxis);

    chartGroup.selectAll("circle")
        .data(healthData)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.poverty))
        .attr("cy", d => yLinearScale(d.smokes))
        .attr("r", "12")
        .attr("fill", "#89bdd3")
        .attr("stroke", "#e3e3e3")
        .attr("opacity", 0.7);

    chartGroup.selectAll("text.text-circles")
        .data(healthData)
        .enter()
        .append("text")
        .classed("text-circles", true)
        .text(d => d.abbr)
        .attr("x", d => xLinearScale(d.poverty))
        .attr("y", d => yLinearScale(d.smokes))
        .attr("dy", "5")
        .attr("text-anchor", "middle")
        .attr("font-size", "12px");
        
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", 0 - (chartHeight/2))
        .attr("y", 30 - margin.left)
        .attr("dy", "1em")
        .classed("aText", true)
        .text("Smokers (%)")
        
    chartGroup.append("text")
        .attr("x", chartWidth/2)
        .attr("y", chartHeight + margin.bottom/2 - 10)
        .attr("dy", "1em")
        .classed("aText", true)
        .text("In Poverty (%)")
    
});

