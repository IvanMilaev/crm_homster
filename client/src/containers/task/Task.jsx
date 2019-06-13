import React from "react";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";

//material-ui core components
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import Collapse from "@material-ui/core/Collapse";
import Divider from "@material-ui/core/Divider";
import CardActions from "@material-ui/core/CardActions";

//Icons
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

// core components
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { selectNode } from "modules/tasks";

import { task_points } from "variables/general.jsx";
import style from "./styleTask.jsx";

import TaskBody from "./TaskBody.jsx";
import TaskCheckPoints from "./TaskCheckPoints.jsx";

class Task extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes, nodeDetail, selectNode } = this.props;
    return (
      <Card>
        <CardHeader color="info" stats icon>
          <CardIcon color="info" className={classes.icon}>
            <Icon>hdr_strong</Icon>
          </CardIcon>
          <p className={classes.cardCategory}>Контакт</p>
          <h3 className={classes.cardTitle}>
            ЗАДАНИЕ УРОВНЯ <small>КЕТЕР</small>
          </h3>
        </CardHeader>
        <Divider />
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardBody>
            <TaskBody actions={{ selectNode }} nodeDetail={nodeDetail} />
            <Divider />
            <TaskCheckPoints
              checkedIndexes={[0, 3]}
              tasksIndexes={[0, 1, 2, 3]}
              tasks={task_points}
            />
          </CardBody>
        </Collapse>
      </Card>
    );
  }
}

const mapStateToProps = ({ tasks }) => ({
  nodeDetail: tasks.nodeDetail
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      selectNode
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(style)(Task));
