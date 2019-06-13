import React, { Component } from "react";
import threeEntryPoint from "./threeEntryPoint";
export default class ThreeContainer extends Component {
  componentDidMount() {
    threeEntryPoint(this.threeRootElement);
  }
  render() {
    return (
      <div
        style={{ height: window.innerHeight }}
        ref={element => (this.threeRootElement = element)}
      />
    );
  }
}
