import { grayColor } from "assets/jss/material-dashboard-pro-react.jsx";

const style = theme => ({
  icon: {
    color: grayColor[3]
  },
  cardCategory: {
    color: grayColor[3],
    marginTop: 20
  },
  cardTitle: {
    color: grayColor[3]
  },
  cardBodyText: {
    color: grayColor[3]
  },
  taskGoal: {},
  stats: {
    borderColor: grayColor[3]
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  }
});

export default style;
