import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Dialog from "@material-ui/core/Dialog";
import Paper from "@material-ui/core/Paper";

import classNames from "classnames";
import dialogStyle from "assets/jss/material-dashboard-pro-react/components/dialogStyle.jsx";

const paperStyle = {
  info: {
    color: "red",
    backgroundColor: "red"
  }
};

const usePaperStyles = makeStyles(paperStyle);

function CustomPaper({ ...props }) {
  const classes = usePaperStyles();
  const { children } = props;
  return <Paper className={classes.info}>{children}</Paper>;
}

const useStyles = makeStyles(dialogStyle);

export default function CustomDialog({ ...props }) {
  const classes = useStyles();
  const { children, ...rest } = props;
  const DlgClasses = classNames({
    [classes.info]: true
  });
  return (
    <Dialog {...rest} classes={{ paper: classes.paper }} className={DlgClasses}>
      {children}
    </Dialog>
  );
}
