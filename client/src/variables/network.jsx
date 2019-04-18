import confidential_taskIcon from "assets/img/svg/confidential-email.svg";
import objectIcon from "assets/img/svg/power.svg";
import documentsResearchIcon from "assets/img/svg/research.svg";
import peopleContactsIcon from "assets/img/svg/confidential.svg";
import experimentProtocol1 from "assets/img/svg/research (2).svg";
import experimentProtocolDop1 from "assets/img/svg/binary.svg";
import experimentProtocolDop2 from "assets/img/svg/analysis.svg";
import experimentProtocolDop3 from "assets/img/svg/digital-signature.svg";
import experimentProtocolDop4 from "assets/img/svg/experimentation.svg";
import experimentProtocolDop5 from "assets/img/svg/investment.svg";
import sourceTaskIcon from "assets/img/svg/topsecret_folder_danger.svg";
import {
  // default
  primaryColor,
  dangerColor,
  grayColor
} from "assets/jss/material-dashboard-pro-react.jsx";

const graph = {
  nodes: [
    {
      id: 1,
      label: "Задание 23484",
      title: "Задание 23484",
      font: { color: grayColor[0] },
      image: confidential_taskIcon,
      shape: "image"
    },
    {
      id: 2,
      label: "SCP-1007",
      title: "Связанный объект SCP",
      font: { color: grayColor[0] },
      image: objectIcon,
      shape: "image"
    },
    {
      id: 3,
      label: "Источник",
      title: "Источник засекречен",
      font: { color: dangerColor[0] },
      image: sourceTaskIcon,
      shape: "image"
    },
    {
      id: 4,
      label: "Протоколы экспериментов",
      title: "Протоколы экспериментов",
      font: { color: grayColor[0] },
      image: documentsResearchIcon,
      shape: "image"
    },
    {
      id: 5,
      label: "Сотрудники",
      font: { color: grayColor[0] },
      title: "Все сотрудники, непосредственно связанные с объектом",
      image: peopleContactsIcon,
      shape: "image"
    },
    {
      id: 6,
      label: "1001.1",
      font: { color: grayColor[0] },
      title: "Эксперимент SCP-1007 1001.1",
      image: experimentProtocol1,
      shape: "image"
    },
    {
      id: 7,
      label: "1001.2",
      font: { color: grayColor[0] },
      title: "Эксперимент SCP-1007 1001.1",
      image: experimentProtocol1,
      shape: "image"
    },
    {
      id: 8,
      label: "1001.3",
      font: { color: grayColor[0] },
      title: "Эксперимент SCP-1007 1001.1",
      image: experimentProtocol1,
      shape: "image"
    },
    {
      id: 9,
      label: "1001.4",
      font: { color: grayColor[0] },
      title: "Эксперимент SCP-1007 1001.1",
      image: experimentProtocol1,
      shape: "image"
    },
    {
      id: 10,
      label: "01dda5f",
      font: { color: grayColor[0] },
      title: "Дополнение SCP-1007 1001.1",
      image: experimentProtocolDop1,
      shape: "image"
    },
    {
      id: 11,
      label: "01dda5s",
      font: { color: grayColor[0] },
      title: "Дополнение SCP-1007 1001.1",
      image: experimentProtocolDop4,
      shape: "image"
    },
    {
      id: 12,
      label: "089s-ero",
      font: { color: grayColor[0] },
      title: "Дополнение SCP-1007 1001.3",
      image: experimentProtocolDop2,
      shape: "image"
    },
    {
      id: 13,
      label: "089s-ero",
      font: { color: grayColor[0] },
      title: "Дополнение SCP-1007 1001.4",
      image: experimentProtocolDop3,
      shape: "image"
    },
    {
      id: 14,
      label: "089swww",
      font: { color: grayColor[0] },
      title: "Дополнение SCP-1007 1001.2",
      image: experimentProtocolDop5,
      shape: "image"
    }
  ],
  edges: [
    {
      from: 1,
      to: 2,
      color: { color: primaryColor[0], highlight: primaryColor[1] }
    },
    {
      from: 3,
      to: 1,
      color: { color: primaryColor[0], highlight: primaryColor[1] }
    },
    {
      from: 2,
      to: 4,
      color: { color: primaryColor[0], highlight: primaryColor[1] }
    },
    {
      from: 2,
      to: 5,
      color: { color: primaryColor[0], highlight: primaryColor[1] }
    },
    {
      from: 4,
      to: 6,
      color: { color: primaryColor[0], highlight: primaryColor[1] }
    },
    {
      from: 4,
      to: 7,
      color: { color: primaryColor[0], highlight: primaryColor[1] }
    },
    {
      from: 4,
      to: 8,
      color: { color: primaryColor[0], highlight: primaryColor[1] }
    },
    {
      from: 4,
      to: 9,
      color: { color: primaryColor[0], highlight: primaryColor[1] }
    },
    {
      from: 6,
      to: 10,
      color: { color: primaryColor[0], highlight: primaryColor[1] }
    },
    {
      from: 6,
      to: 11,
      color: { color: primaryColor[0], highlight: primaryColor[1] }
    },
    {
      from: 7,
      to: 12,
      color: { color: primaryColor[0], highlight: primaryColor[1] }
    },
    {
      from: 8,
      to: 13,
      color: { color: primaryColor[0], highlight: primaryColor[1] }
    },
    {
      from: 9,
      to: 14,
      color: { color: primaryColor[0], highlight: primaryColor[1] }
    },
    {
      from: 6,
      to: 12,
      color: { color: primaryColor[0], highlight: primaryColor[1] }
    },
    {
      from: 8,
      to: 12,
      color: { color: primaryColor[0], highlight: primaryColor[1] }
    },
    {
      from: 9,
      to: 12,
      color: { color: primaryColor[0], highlight: primaryColor[1] }
    }
  ]
};

const options = {
  layout: {
    hierarchical: true
  },
  edges: {
    color: "#000000"
  },
  height: "500px"
};

export { graph, options };
