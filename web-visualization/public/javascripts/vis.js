// Frame for colors and names
var data = [{ id: 1, party: 'Afd', passive_color: '#3D3BFB', active_color: '#1A18E0' },
{ id: 2, party: 'Union', passive_color: '#6F6F6F', active_color: '#151515' },
{ id: 3, party: 'Gruene', passive_color: '#52B11F', active_color: '#4BD302' },
{ id: 4, party: 'FDP', passive_color: '#F3FF56', active_color: '#FBFF00' },
{ id: 5, party: 'SPD', passive_color: '#E93333', active_color: '#EB0101' },
{ id: 6, party: 'LINKE', passive_color: '#9E49C0', active_color: '#8900C0' }]

var radius;

// handle mouse events
function handleMouseOver(mouse_event, data) {
    d3.selectAll(`.${mouse_event.target.classList.value}`).style('fill', data.data.active_color).attr('d', d3.arc()
        .innerRadius(radius * 0.65)         // This is the size of the donut hole
        .outerRadius(radius * 1.25)
        .padAngle(0.03))
}

function handleMouseOut(mouse_event, data) {
    d3.selectAll(`.${mouse_event.target.classList.value}`).style('fill', data.data.passive_color).attr('d', d3.arc()
        .innerRadius(radius * 0.65)         // This is the size of the donut hole
        .outerRadius(radius)
        .padAngle(0.03)
    )
}


// function to create half circle diagramm
function create_vis_svg() {

    // data creation call
    let py_data = get_data(document.getElementById('input_field').value)

}

function word_emb_vis(emb_data) {
    // emb_data is a array of length including percentages for each party
    for(let i = 0; i < data.length; i++) {
        data[i].percent = emb_data[i]
    }

    document.getElementById('emb_result').innerHTML = ''

    var width = document.getElementById('emb_result').clientWidth
    height = document.getElementById('emb_result').clientHeight
    margin = Math.min(width, height) * 0.15

    var radius = Math.min(width, height) / 2 - margin
    this.radius = radius

    // append the svg object to vis div | id='vis_result'
    var svg = d3.select("#emb_result")
        .append("svg")
        .attr("id", "svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2},${height/2})`)
        .attr("id", "g")
        ;

    // Compute the position of each group on the pie:
    var pie = d3.pie()
        .value(function (d) { return d.percent; })
        .startAngle(- 135 * Math.PI / 180)
        .endAngle(135 * Math.PI / 180)
    var data_ready = pie(data)

    svg
        .selectAll('whatever')
        .data(data_ready)
        .enter()
        .append('path')
        .attr('d', d3.arc()
            .innerRadius(radius * 0.65)         // This is the size of the donut hole
            .outerRadius(radius)
            .padAngle(0.03)
        )
        .attr("class", function (d) { return d.data.party})
        .on("mouseover", handleMouseOver)
        .on("mouseout", handleMouseOut)
        .style('fill', function (d) { return d.data.passive_color })
        .attr("stroke", "black")
        .style("stroke-width", "2px")
        .style("opacity", 0.7)
}

function nn_vis(nn_data) {
    // emb_data is a array of length including percentages for each party
    for(let i = 0; i < data.length; i++) {
        data[i].percent = nn_data[i]
    }

    document.getElementById('nn_result').innerHTML = ''

    var width = document.getElementById('nn_result').clientWidth
    height = document.getElementById('nn_result').clientHeight
    margin = Math.min(width, height) * 0.15

    var radius = Math.min(width, height) / 2 - margin
    this.radius = radius

    // append the svg object to vis div | id='vis_result'
    var svg = d3.select("#nn_result")
        .append("svg")
        .attr("id", "svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2},${height/2})`)
        .attr("id", "g")
        ;

    // Compute the position of each group on the pie:
    var pie = d3.pie()
        .value(function (d) { return d.percent; })
        .startAngle(- 135 * Math.PI / 180)
        .endAngle(135 * Math.PI / 180)
    var data_ready = pie(data)

    svg
        .selectAll('whatever')
        .data(data_ready)
        .enter()
        .append('path')
        .attr('d', d3.arc()
            .innerRadius(radius * 0.65)         // This is the size of the donut hole
            .outerRadius(radius)
            .padAngle(0.03)
        )
        .attr("class", function (d) { return d.data.party})
        .on("mouseover", handleMouseOver)
        .on("mouseout", handleMouseOut)
        .style('fill', function (d) { return d.data.passive_color })
        .attr("stroke", "black")
        .style("stroke-width", "2px")
        .style("opacity", 0.7)
}

function build_svg(py_data) {

    py_data = JSON.parse(py_data.replace(/'/g, '"'))

    word_emb_vis(py_data["word_e"])

    nn_vis(py_data["nn_forest"])

    for(let i = 0; i < data.length; i++) {
        data[i].percent = py_data[i]
    }

    console.log(data)
    //clear vis_result
    document.getElementById('vis_result').innerHTML = ''

    // get height/width/margin
    var width = document.getElementById('vis_result').clientWidth
    height = document.getElementById('vis_result').clientHeight
    margin = Math.min(width, height * 2) * 0.15

    var radius = Math.min(width, height * 2) / 2 - margin
    this.radius = radius

    // append the svg object to vis div | id='vis_result'
    var svg = d3.select("#vis_result")
        .append("svg")
        .attr("id", "svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2},${height})`)
        .attr("id", "g")
        ;

    // Compute the position of each group on the pie:
    var pie = d3.pie()
        .value(function (d) { return d.percent; })
        .startAngle(-Math.PI / 2)
        .endAngle(Math.PI / 2)
    var data_ready = pie(data)

    svg
        .selectAll('whatever')
        .data(data_ready)
        .enter()
        .append('path')
        .attr('d', d3.arc()
            .innerRadius(radius * 0.65)         // This is the size of the donut hole
            .outerRadius(radius)
            .padAngle(0.03)
        )
        .on("mouseover", handleMouseOver)
        .on("mouseout", handleMouseOut)
        .style('fill', function (d) { return d.data.passive_color })
        .attr("stroke", "black")
        .style("stroke-width", "2px")
        .style("opacity", 0.7)

}

function get_data(input_text) {

    function postData(input_text) {
        $.ajax({
            type: "POST",
            url: "/py",
            data: { param: input_text },
            success: callbackFunc
        });
    }

    function callbackFunc(response) {
        // do something with the response
        build_svg(response);
    }

    postData(input_text);
}