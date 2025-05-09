import React, { useContext } from "react";
import AdminDashboard from "./AdminDashboard";
import VolunteerDashboard from "./VolunteerDashboard";
import UserDashboard from "./UserDashboard";
import Context from "../Context/Context";

const RoleBasedDashboard = () => {
  const { user } = useContext(Context);

  if (user.role === "admin") return <AdminDashboard />;
  if (user.role === "volunteer") return <VolunteerDashboard />;
  return <UserDashboard />;
};

export default RoleBasedDashboard;
