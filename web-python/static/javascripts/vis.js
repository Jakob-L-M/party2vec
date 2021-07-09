// Frame for colors and names
var data = [{ id: 1, party: 'Afd', passive_color: '#3D3BFB', active_color: '#1A18E0' },
{ id: 2, party: 'Union', passive_color: '#6F6F6F', active_color: '#151515' },
{ id: 3, party: 'FDP', passive_color: '#F3FF56', active_color: '#FBFF00' },
{ id: 4, party: 'Gruene', passive_color: '#52B11F', active_color: '#4BD302' },
{ id: 5, party: 'LINKE', passive_color: '#9E49C0', active_color: '#8900C0' },
{ id: 6, party: 'SPD', passive_color: '#E93333', active_color: '#EB0101' }]

var radius;

// handle mouse events
function handleMouseOver(mouse_event, data) {
    d3.selectAll(`.${mouse_event.target.classList.value}`).style('fill', data.data.active_color).attr('d', d3.arc()
        .innerRadius(radius * 0.65)         // This is the size of the donut hole
        .outerRadius(radius * 1.25)
        .padAngle(0.03))
    let id = mouse_event.path[2].id.substring(4)
    document.getElementById(`${id}_text`).innerHTML = (data.data[`${id}`] * 100).toFixed(2) + '%'
    
}

function handleMouseOut(mouse_event, data) {
    d3.selectAll(`.${mouse_event.target.classList.value}`).style('fill', data.data.passive_color).attr('d', d3.arc()
        .innerRadius(radius * 0.65)         // This is the size of the donut hole
        .outerRadius(radius)
        .padAngle(0.03)
    )
    document.getElementById(`${mouse_event.path[2].id.substring(4)}_text`).innerHTML = " "
}

// function to create half circle diagramm
function create_vis_svg() {
    // data creation call
    get_data(document.getElementById('cleaned_text').value)
}

document.getElementById('input_field').addEventListener('input', function () {

    document.getElementById('cleaned_text').value = clean_text(document.getElementById('input_field').value)

})

function clean_text(string) {
    let text = string.replace("ä", "ae").replace("Ä", "Äe").replace("ö", "oe").replace("Ö", "Oe").replace(/ü/g, "ue").replace("Ü", "Ue").replace("ß", "ss")
    text = text.replace(/http\S+/g, '')
    text = text.replace(/@\S+/g, "user")
    text = text.replace(/[^0-9A-Za-z ]/g, " ").replace(/ +/g, " ")
    if (text[0] == " ") {
        text = text.substring(1)
    }
    return text
}

function word_emb_vis(emb_data) {
    // emb_data is a array of length including percentages for each party
    for (let i = 0; i < data.length; i++) {
        data[i]['embedding'] = emb_data[i]
    }
    create_gauge(data, 'embedding')
}

function nn_vis(nn_data) {
    // emb_data is a array of length including percentages for each party
    for (let i = 0; i < data.length; i++) {
        data[i]['nn_forest'] = nn_data[i]
    }
    create_gauge(data, 'nn_forest')
}

function build_svg(py_data) {

    console.log(py_data)

    word_emb_vis(py_data["embedding"])

    nn_vis(py_data["nn_forest"])

    document.getElementById('tfidf').innerHTML = data[py_data['tfidf']].party
    document.getElementById('tfidf').style.color = data[py_data['tfidf']].active_color
}

function create_gauge(data, id) {
    if (document.getElementById(id)) {
        document.getElementById(id).innerHTML = `<p id='${id}_text'> </p>`
    }

    // get height/width/margin
    var width = document.getElementById(id).clientWidth
    height = document.getElementById(id).clientHeight
    margin = Math.min(width, height) * 0.15

    var radius = Math.min(width, height) / 2 - margin
    this.radius = radius

    // append the svg object to vis div | id='vis_result'
    var svg = d3.select(`#${id}`)
        .append("svg")
        .attr("id", `svg_${id}`)
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`)
        .attr("id", "g")
        ;

    // Compute the position of each group on the pie:
    var pie = d3.pie()
        .value(function (d) { return d[id]; })
        .startAngle(-135 * Math.PI / 180)
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
        .attr("class", function (d) { return d.data.party })
        .on("mouseover", handleMouseOver)
        .on("mouseout", handleMouseOut)
        .style('fill', function (d) { return d.data.passive_color })
        .attr("stroke", "black")
        .style("stroke-width", "2px")
        .style("opacity", 0.7)
}

function get_data(input_text) {

    function postData(input_text) {
        $.getJSON(`/py/${input_text}`, function (data) { callbackFunc(data) })
    }

    function callbackFunc(response) {
        // do something with the response
        build_svg(response);
    }

    postData(input_text);
}