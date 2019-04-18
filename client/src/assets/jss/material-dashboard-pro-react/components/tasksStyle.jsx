import {
  defaultFont,
  primaryColor,
  dangerColor,
  grayColor,
  tooltip,
  whiteColor,
  hexToRgb
} from "assets/jss/material-dashboard-pro-react.jsx";
import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";

const tasksStyle = {
  ...customCheckboxRadioSwitch,
  table: {
    marginBottom: "0"
  },
  tableRow: {
    position: "relative",
    borderBottom: "0.5px solid " + grayColor[23]
  },
  tableActions: {
    border: "none",
    padding: "12px 8px !important",
    verticalAlign: "middle"
  },
  tableCell: {
    ...defaultFont,
    padding: "0",
    verticalAlign: "middle",
    border: "none",
    lineHeight: "1.42857143",
    fontSize: "14px",
    color: "rgba(" + hexToRgb(whiteColor) + ", 0.7)"
  },
  tableActionButton: {
    width: "27px",
    height: "27px",
    padding: "0"
  },
  tableActionButtonIcon: {
    width: "17px",
    height: "17px"
  },
  edit: {
    backgroundColor: "transparent",
    color: primaryColor[0],
    boxShadow: "none"
  },
  close: {
    backgroundColor: "transparent",
    color: dangerColor[0],
    boxShadow: "none"
  },
  tooltip
};
export default tasksStyle;
