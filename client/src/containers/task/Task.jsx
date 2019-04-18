import React from "react";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";

//material-ui core components
import Icon from "@material-ui/core/Icon";
import Warning from "@material-ui/icons/Warning";
import Checkbox from "@material-ui/core/Checkbox";
import Collapse from "@material-ui/core/Collapse";
import Divider from "@material-ui/core/Divider";
import CardActions from "@material-ui/core/CardActions";

import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import ScatterPlotIcon from "@material-ui/icons/ScatterPlot";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
import FormatQuote from "@material-ui/icons/FormatQuote";

import TaskCheckPoints from "components/Tasks/TaskCheckPoints.jsx";

//Icons
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// core components

import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CardText from "components/Card/CardText.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";

import Network from "components/Visjs/Network/Network2.jsx";

import { grayColor } from "assets/jss/material-dashboard-pro-react.jsx";
import { task_points } from "variables/general.jsx";
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

const NodeDetail = () => <div>Детализация</div>;

const NetworkStructure = () => (
  <div>
    <Network />
    <NodeDetail />
  </div>
);

class Task extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes } = this.props;
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
            <CustomTabs
              headerColor="info"
              tabs={[
                {
                  tabIcon: InfoIcon,
                  tabContent: (
                    <div>
                      <p className={classes.cardBodyText}>
                        <b>Описание:</b> SCP-1007 представляет собой ранее
                        неизвестный науке вирус, вызывающий необратимую
                        ступенчатую мутацию нейронов. При этом порог
                        переносимости боли экспоненциально возрастает, однако
                        перед каждым этапом мутации клеток носитель вируса
                        испытывает боль, интенсивность которой почти достигает
                        текущего порога переносимости. Вирус передаётся
                        воздушно-капельным, контактным и гемоконтактным путями.
                        Живое существо, инфицированное SCP-1007, становится
                        переносчиком вируса. Инкубационный период длится от двух
                        до четырёх часов. При этом вирус распространяется по
                        центральной нервной системе и головному мозгу. По
                        окончании этого периода заражённое существо,
                        по-видимому, испытывает сильную боль и теряет сознание.
                        Через несколько минут оно приходит в себя. Этот момент
                        можно считать началом развития болезни. Число стадий
                        болезни, по-видимому, уходит в бесконечность, однако
                        среди зарегистрированных случаев не было ни одного, при
                        котором человек дожил бы до седьмой стадии. В одном
                        случае подопытная крыса дожила до девятой стадии, после
                        чего было решено умертвить её.
                      </p>
                      <p className={classes.cardBodyText}>
                        <b>Особые условия содержания:</b> Камера содержания
                        SCP-1007 должна быть строго герметична. Вход должен
                        осуществляться через тройную систему шлюзов и
                        исключительно в полном защитном костюме. После контакта
                        с SCP-1007 обязателен стерилизующий душ и шестичасовой
                        карантин. При обнаружении у персонала признаков
                        заражения следует немедленно произвести эвтаназию и
                        кремировать останки. Разгерметизация камеры содержания
                        считается событием повышенной опасности, при котором
                        задействуются обычные в таких случаях протоколы, и,
                        кроме того, камера содержания и близлежащие участки
                        стерилизуются с использованием сверхвысоких температур.
                        На данный момент объект содержится в Зоне 7.
                      </p>
                    </div>
                  )
                },
                {
                  tabIcon: ScatterPlotIcon,
                  tabContent: <NetworkStructure />
                },
                {
                  tabIcon: Cloud,
                  tabContent: <p>третье</p>
                }
              ]}
            />
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

export default withStyles(style)(Task);
