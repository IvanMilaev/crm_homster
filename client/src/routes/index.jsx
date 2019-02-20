import Dashboard from "layouts/Dashboard/Dashboard.jsx";
import LoginPage from "containers/login";
import IntroPage from "containers/intro";

const indexRoutes = [
  { path: "/", component: IntroPage, private: false, exact: true },
  { path: "/login", component: LoginPage, private: false, exact: true },
  { path: "/crm", component: Dashboard, private: true, exact: false }
];

export default indexRoutes;
