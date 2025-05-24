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
import MyDonationReqAll from "../Dashboard/Dashboard Components/MyDonationReqAll";
import CreateDonationReq from "../Dashboard/Dashboard Components/CreateDonationReq";
import Donations from "../Donation/Donations";
import VolunteerHome from "../Dashboard/Volunteer Dashboard/VolunteerHome";
import ApplyDonation from "../Donation/ApplyDonation";
import AllDonation from "../Dashboard/Volunteer Dashboard/AllDonation";
import AdminDashboardHome from "../Dashboard/Admin/AdminDashboardHome";
import UserList from "../Dashboard/Admin/UserList";
import AllPost from "../Dashboard/Admin/AllPost";

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
      {
        path: "/donations",
        element: (
          <PrivateRoute allowedRoles={["admin", "volunteer", "user"]}>
            <Donations />
          </PrivateRoute>
        ),
      },
      {
        path: "/donateNow",
        element: (
          <PrivateRoute allowedRoles={["admin", "volunteer", "user"]}>
            <ApplyDonation />
          </PrivateRoute>
        ),
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
      {
        path: "/dashboard/my-donation-requests",
        element: <MyDonationReqAll />,
      },
      {
        path: "/dashboard/create-donation-request",
        element: <CreateDonationReq />,
      },
      {
        path: "/dashboard/volunteer-dashboard/home",
        element: <VolunteerHome />,
      },
      {
        path: "/dashboard/volunteer-dashboard/allDonations",
        element: <AllDonation />,
      },
      {
        path: "/dashboard/admin/home",
        element: <AdminDashboardHome />,
      },
      {
        path: "/dashboard/admin/users",
        element: <UserList />,
      },
      {
        path: "/dashboard/admin/posts",
        element: <AllPost />,
      },
    ],
  },
]);

export default routers;
