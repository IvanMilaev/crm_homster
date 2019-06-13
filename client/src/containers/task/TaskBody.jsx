import React from "react";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import CustomTabs from "components/CustomTabs/CustomTabs.jsx";

import InfoIcon from "@material-ui/icons/Info";
import ScatterPlotIcon from "@material-ui/icons/ScatterPlot";
import Cloud from "@material-ui/icons/Cloud";

import TaskGraph from "./TaskGraph.jsx";
import NodeDetail from "./NodeDetail.jsx";

import tabs from "variables/tasks";

import style from "./styleTask.jsx";

const TaskBody = props => (
  <CustomTabs
    headerColor="info"
    tabs={[
      {
        tabName: "Описание",
        tabIcon: InfoIcon,
        tabContent: (
          <div>
            <p className={props.classes.cardBodyText}>
              <b>Описание:</b> {tabs.info.description}
            </p>
            <p className={props.classes.cardBodyText}>
              <b>Особые условия содержания:</b>
              {tabs.info.text}
            </p>
          </div>
        )
      },
      {
        tabName: "Граф",
        tabIcon: ScatterPlotIcon,
        tabContent: (
          <div>
            <TaskGraph eventHandlers={props.actions} />
            <NodeDetail text={props.nodeDetail} />
          </div>
        )
      },
      {
        tabName: "Третье",
        tabIcon: Cloud,
        tabContent: <p>третье</p>
      }
    ]}
  />
);

export default withStyles(style)(TaskBody);
