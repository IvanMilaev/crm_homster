import React from "react";
import PropTypes from "prop-types";

// material-ui core components
import Divider from "@material-ui/core/Divider";

// application components
import Task from "containers/task";

const Desktop = () => (
  <div>
    <h2>Задачи на сегодня</h2>
    <Divider />
    <Task />
  </div>
);

//Desktop.PropTypes = {};

export default Desktop;
