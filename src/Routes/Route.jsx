import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomeLayout from "../Layouts/HomeLayout";
import Login from "../Components/Login/Login";
import Register from "../Components/Register/Register";
import AboutUs from "../Extras/AboutUs";
import ContactUs from "../Extras/ContactUs";
import PrivateRoute from "./PrivateRoute";
import RoleBasedDashboard from "../Dashboard/RoleBasedDashboard";
import UserDashboardHome from "../Dashboard/Dashboard Components/UserDashboardHome";

const routers = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomeLayout />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/about_us",
        element: <AboutUs />,
      },
      {
        path: "/contact_us",
        element: <ContactUs />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute allowedRoles={["admin", "volunteer", "user"]}>
        <RoleBasedDashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <UserDashboardHome />,
      },
    ],
  },
]);

export default routers;
