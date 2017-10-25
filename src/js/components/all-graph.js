import { DataSet, Network } from 'vis/index-network';
import 'vis/dist/vis-network.min.css';

const options = {
    edges: {
        color: {
            opacity: 0.3
        },
        chosen: {
            edge: (values, id, selected, hovering) => {
                values.opacity = 1.0;
                values.color = 'red';
            },
        },
        font: {
            face: 'Fira Sans'
        }
    },
    nodes: {
        shadow: true,
        shape: 'dot',
        scaling: {
            customScalingFunction: (min,max,total,value) => {
              return value / total;
            },
            min: 1,
            max: 150
        }
    },
};


export function Graph(nodes, links, graph, size){
    const _nodes = new DataSet(nodes);
    
      // create an array with edges
    const edges = new DataSet(links);
    
      // create a network
    const data = {
        nodes: _nodes,
        edges: edges
    };
    

    graph.style.width = `${size}px`;
    graph.style.height = `${size}px`;

    return new Network(graph, data, options);
}