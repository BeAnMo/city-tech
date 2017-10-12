import { intersect } from './calculations';

/* creates nodes for d3 graph */
function createNodes(results){
  const terms = Object.keys(results);
  
  return terms.map(term => {
    return { term: term, size: results[term].length };
  });
}

function createLinks(results){
  const terms = Object.keys(results);
  const len = terms.length;
  // enforce this order
  // 0 -> 9 -> a > z
  const byIncr = (a, b) => a > b;
  let links = [];
  
  for(let i = 0; i < len; i++){
    const source = terms[i];
    const sourceIds = results[source];
    sourceIds.sort(byIncr);
    
    for(let j = 0; j < len; j++){
      const target = terms[j];
      const targetIds = results[target];
      targetIds.sort(byIncr);
      const shared = intersect(sourceIds, targetIds).length;
    
      // until "C" regexp is more accurate
      const c_test = source === 'C *' || target === 'C *' ? false : true;
    
      if(target !== source && shared > 0 && c_test){
        links.push({ target, source, shared });
      }
    }
  }
  
  return links;
}

//@TEST
(() => {
    const t0 = {
        Scala: [ "d996ecb107d95f5e" ],
        Python: ["1a8db8794d09a479", "22264e0253a9351b", "2973bbaa38b591bd", "2d865695d82ae324", "4ad674d054f4bbf1", "57b44a3efb8f140f", "76ad4673f873412e", "7aae7e244f359744", "91a7f3f9f500fd19", "9d937cc790aabc39"],
        Java: ["04d4a774fe2bd693", "060564ecba2e71e2", "0696f3c1db4ea2b7"],
        'Go *': ["04d4a774fe2bd693", "183f4803b7ba8f51", "2e05678631f51cf4"],
        WhatLang: ["1a8db8794d09a479", "76ad4673f873412e", "7aae7e244f359744"]
    };
    
    const tests = [
        intersect(t0.Scala, t0.Python).length === 0,
        intersect(t0.Java, t0['Go *']).length === 1,
        intersect(t0.WhatLang, t0.Python).length === 3
    ];
    
    let total = tests.length;
    let passed = 0;
    
    console.log('---- MODULE TEST: Graph ----');
    
    tests.forEach((t, i) => {
        console.assert(t, `tests[${i}]`);
        
        if(t){
            passed += 1;
        }
    });
    
    console.log(`${passed} out of ${total} tests passed`);
    console.log('----------------------------');
})();


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
    .attr("fill", "red");
 

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
        
    Popup(graph, popup, node, d => `<p>${d.term}</p>`);
    Popup(graph, popup, link, d => `<p>${d.source.term} & ${d.target.term} : <strong>${d.shared}</strong></p>`);
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


export {
    createNodes,
    createLinks,
    Graph
}
