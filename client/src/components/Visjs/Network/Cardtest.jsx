import React from "react";
import { withStyles } from "@material-ui/core/styles";

import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Icon from "@material-ui/core/Icon";

const Cardtest = () => (
  <Card>
    <CardHeader color="info" stats icon>
      <CardIcon color="info">
        <Icon>hdr_strong</Icon>
      </CardIcon>
      <p>Контакт</p>
      <h3>
        ЗАДАНИЕ УРОВНЯ <small>КЕТЕР</small>
      </h3>
    </CardHeader>
  </Card>
);
export default Cardtest;
