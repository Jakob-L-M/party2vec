// set the dimensions and margins of the graph
var width = document.getElementById('vis_result').clientWidth
height = document.getElementById('vis_result').clientHeight
margin = Math.min(width, height*2)*0.15

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
var radius = Math.min(width, height*2)/2 - margin

// append the svg object to the div called 'my_dataviz'
var svg = d3.select("#vis_result")
    .append("svg")
    .attr("id", "svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width / 2},${height})`)
    .attr("id", "g")
    ;

// Dummy data
// Will be output of python evaluation
function postData(input) {
    $.ajax({
        type: "POST",
        url: "./eval.py",
        data: { param: input },
        success: callbackFunc
    });
}

function callbackFunc(response) {
    // do something with the response
    console.log(response);
}
postData()

var data = [{ id: 1, party: 'Afd', percent: 0.09, passive_color: '#3D3BFB', active_color: '#1A18E0' },
{ id: 2, party: 'Union', percent: 0.16, passive_color: '#6F6F6F', active_color: '#151515' },
{ id: 3, party: 'B90/Grüne', percent: 0.09, passive_color: '#52B11F', active_color: '#4BD302' },
{ id: 4, party: 'FDP', percent: 0.05, passive_color: '#F3FF56', active_color: '#FBFF00' },
{ id: 5, party: 'SPD', percent: 0.2, passive_color: '#E93333', active_color: '#EB0101' },
{ id: 6, party: 'LINKE', percent: 0.41, passive_color: '#9E49C0', active_color: '#8900C0' }]


// Compute the position of each group on the pie:
var pie = d3.pie()
    .value(function (d) { return d.percent; })
    .startAngle(-Math.PI / 2)
    .endAngle(Math.PI / 2)
var data_ready = pie(data)

// Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
svg
    .selectAll('whatever')
    .data(data_ready)
    .enter()
    .append('path')
    .attr('d', d3.arc()
        .innerRadius(radius*0.65)         // This is the size of the donut hole
        .outerRadius(radius)
        .padAngle(0.03)
    )
    .on("mouseover", handleMouseOver)
    .on("mouseout", handleMouseOut)
    .style('fill', function (d) { return d.data.passive_color })
    .attr("stroke", "black")
    .style("stroke-width", "2px")
    .style("opacity", 0.7)

function handleMouseOver(mouse_event, data) {
    d3.select(this).style('fill', data.data.active_color).attr('d', d3.arc()
        .innerRadius(radius*0.7)         // This is the size of the donut hole
        .outerRadius(radius*1.25)
        .padAngle(0.03))
}

function handleMouseOut(mouse_event, data) {
    d3.select(this).style('fill', data.data.passive_color).attr('d', d3.arc()
        .innerRadius(radius*0.65)         // This is the size of the donut hole
        .outerRadius(radius)
        .padAngle(0.03)
    )
}