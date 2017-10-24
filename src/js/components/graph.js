import * as d3 from 'd3';


function Graph(nodes, links, graph, size){
    const W = size;
    const H = W;

    const viz = d3.select(graph)
        .append('svg')
        .attr('width', W)
        .attr('height', H);

    const simulation = d3.forceSimulation()
        .nodes(nodes);

    simulation
        .force('charge_force', d3.forceManyBody()
            .strength(- (size))
            .distanceMin(50)
            .distanceMax(size / 2))
        .force('center_force', d3.forceCenter(W / 2, H / 2));
    
    const popup = d3.select('body').append('div')
        .attr('class', 'popup')
        .style('opacity', 0);   

    const node = viz.append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(nodes)
        .enter()
        .append("circle")
        .attr("r", 12)
        .attr("fill", "red")
        .call(d3.drag()
            .on("start", dragstarted.bind(simulation))
            .on("drag", dragged.bind(simulation)));
            //.on("end", dragended.bind(simulation)));
            
    node.append('title').text(d => d.term);
 

    function tickActions() {
        //update circle positions to reflect node updates on each tick of the simulation 
        node
            .attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });

        link
            .attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });
    }


    const link_force =  d3.forceLink(links)
        .id(function(d) { return d.term; });


    simulation.on('tick', tickActions);
    simulation.force("links",link_force);

    const link = viz.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(links)
        .enter().append("line")
        .attr("stroke-width", 3)
        .style('stroke', linkColor);
        
    link.append('title').text(d => `${d.source.term} & ${d.target.term} : ${d.shared}`);
        
    //Popup(graph, popup, node, d => `<p>${d.term}</p>`);
    //Popup(graph, popup, link, d => `<p>${d.source.term} & ${d.target.term} : <strong>${d.shared}</strong></p>`);
}


/* D3Popup, D3Element, [Object -> String] -> Void */
function Popup($Elem, popupElem, d3Elem, html){
    const $posn = offset($Elem);
  
    d3Elem.on('mouseover', (d) => {
        popupElem.transition()
            .duration(200)
            .style('opacity', 0.9)
        popupElem.html(html(d))
            .style('left', `${$posn.left}px`)
            .style('top', `${$posn.top}px`)
    })
    .on('mouseout', d => {
        popupElem.transition()
            .duration(500)
            .style('opacity', 0)
    });
}


/* gets position of top-left corner of a DOM element */
function offset(el) {
    const rect = el.getBoundingClientRect();
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

function linkColor(d){
    const n = d.shared;

    return (
        n < 2 ? '#555' :
        n < 3 ? '#568' :
        n < 5 ? '#58a' :
        n < 9 ? '#5ad' : 
        n < 14 ? '#5cf' :
        n < 20 ? '#5ff' :
        n < 27 ? '#2ff' :
        n < 35 ? '#0ff' : '#00f'
    );
}


function dragstarted(d){
    if (!d3.event.active) this.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
}

function dragged(d){
    d.fx = d3.event.x;
    d.fy = d3.event.y;
}

function dragended(d){
    if (!d3.event.active) this.alphaTarget(0);
    d.fx = null;
    d.fy = null;
}


export {
    createNodes,
    createLinks,
    Graph
}
