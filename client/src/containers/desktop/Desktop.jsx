import React from "react";
import PropTypes from "prop-types";

import withStyles from "@material-ui/core/styles/withStyles";

// material-ui core components
import Divider from "@material-ui/core/Divider";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

//import ThreeContainer from "threejs/threeContainer";

// application components
import Task from "containers/task";

const style = theme => ({});
const Desktop = () => (
  <div>
    <h2>Задачи на сегодня</h2>
    <Divider />
    <GridContainer>
      <GridItem xs={12} sm={12} md={12} lg={12}>
        <Task />
      </GridItem>
    </GridContainer>
  </div>
);

//Desktop.PropTypes = {};

export default withStyles(style)(Desktop);
