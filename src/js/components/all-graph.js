import { DataSet, Network } from 'vis/index-network';
import 'vis/dist/vis-network.min.css';

const options = {
  edges: {
    smooth: false,
    color: {
      opacity: 0.3
    },
    chosen: {
      edge: (values, id, selected, hovering) => {
        values.opacity = 1.0;
        values.color = 'black';
      }
    },
    font: {
      face: 'Fira Sans'
    }
  },
  nodes: {
    shadow: true,
    shape: 'dot',
    scaling: {
      customScalingFunction: (min, max, total, value) => {
        return value / total;
      },
      min: 1,
      max: 150
    }
  },
  /*physics: {
        enabled: false,
        barnesHut: {
            gravitationalConstant: -20000,
            centralGravity: 0,
            avoidOverlap: 1,
            springLength: 300
        }
    }*/
  physics: {
    //enabled: false,
    forceAtlas2Based: {
      gravitationalConstant: -26,
      centralGravity: 0.005,
      springLength: 230,
      springConstant: 0.18
    },
    maxVelocity: 146,
    solver: 'forceAtlas2Based',
    timestep: 0.35,
    stabilization: { iterations: 150 }
  }
};

export function Graph(nodes, links, graph, size) {
  return new Network(
    graph,
    {
      nodes: new DataSet(nodes),
      edges: new DataSet(links)
    },
    options
  );
}
