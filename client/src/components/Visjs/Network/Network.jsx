import React, { Component } from "react";
import { Network, Node, Edge } from "@lifeomic/react-vis-network";
import Icon from "@material-ui/core/Icon";
import CardIcon from "components/Card/CardIcon.jsx";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ThreeDRotationIcon from "@material-ui/icons/ThreeDRotation";
import smartphone from "assets/img/smartphone.svg";
const renderSomeIcon = () => <smartphone />;

class MyNetwork extends Component {
  render() {
    return (
      <Network>
        <Node
          id="vader"
          label="Darth Vader"
          component={renderSomeIcon}
          icon={smartphone}
        />
        <Node id="luke" label="Luke Skywalker" />
        <Node id="leia" label="Leia Organa" />
        <Edge id="1" from="vader" to="luke" />
        <Edge id="2" from="vader" to="leia" />
      </Network>
    );
  }
}

export default MyNetwork;
