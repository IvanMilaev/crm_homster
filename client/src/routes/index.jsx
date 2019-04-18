//import MainLayout from "layouts/MainLayout/MainLayout.jsx";
import LoginPage from "containers/login";
import IntroPage from "containers/intro";

import AuthLayout from "layouts/Auth.jsx";
import RtlLayout from "layouts/RTL.jsx";
import AdminLayout from "layouts/Admin.jsx";

const indexRoutes = [
  { path: "/", component: IntroPage, private: false, exact: true },
  { path: "/login", component: LoginPage, private: false, exact: true },
  { path: "/crm", component: AdminLayout, private: true, exact: false },
  { path: "/auth", component: AuthLayout, private: false, exact: false },
  { path: "/rtl", component: RtlLayout, private: true, exact: false }
];

export default indexRoutes;
