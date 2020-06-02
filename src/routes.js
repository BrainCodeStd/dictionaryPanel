// import Dashboard from "views/Dashboard.jsx";
import Login from "views/Login.jsx";
import UnAuthorized from "views/UnAuthorized.jsx";
import Dashboard from './views/Dashboard'
import Sale from './views/Sale/Sale'
var dashboardRoutes = [
  {
    path: "/dashboard",
    layout: "/admin",
    name: "DashBoard",
    component: Dashboard,
    icon: "pe-7s-graph"
  },
  {
    path: "/dSale",
    layout: "/admin",
    name: "Dictionary",
    component: Sale,
    icon: "pe-7s-news-paper"
  },
];

export const accountRoutes = [
  {
    path: "/login",
    name: "Login",
    icon: "pe-7s-graph",
    component: Login,
    layout: "/account"
  },
  {
    path: "/unauthorized",
    name: "Aunthorized",
    icon: "pe-7s-graph",
    component: UnAuthorized,
    layout: "/account"
  },

];
export default dashboardRoutes;
