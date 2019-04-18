import React from "react";
import PropTypes from "prop-types";

import withStyles from "@material-ui/core/styles/withStyles";

// material-ui core components
import Divider from "@material-ui/core/Divider";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

// application components
import Task from "containers/task";

const style = theme => ({});
const Desktop = () => (
  <div>
    <h2>Задачи на сегодня</h2>
    <Divider />
    <GridContainer>
      <GridItem xs={12} sm={6} md={6} lg={6}>
        <Task />
      </GridItem>
      <GridItem xs={12} sm={6} md={6} lg={6} />
    </GridContainer>
  </div>
);

//Desktop.PropTypes = {};

export default withStyles(style)(Desktop);
