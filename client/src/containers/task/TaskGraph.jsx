import React, { Component } from "react";
import Graph from "react-graph-vis";

import "vis/dist/vis.min.css";
// need to import the vis network css in order to show tooltip
import "vis/dist/vis-network.min.css";

import { graph, options } from "variables/network.jsx";

class TaskGraph extends Component {
  render() {
    const { selectNode } = this.props.eventHandlers;
    const events = {
      select: function(event) {
        const { nodes, edges } = event;
        console.log("Selected nodes:");
        console.log(nodes);
        selectNode(nodes[0]);
      }
    };
    return (
      <div>
        <Graph
          graph={graph}
          options={options}
          events={events}
          getNetwork={network => {
            //  if you want access to vis.js network api you can set the state in a parent component using this property
          }}
        />
      </div>
    );
  }
}

export default TaskGraph;
