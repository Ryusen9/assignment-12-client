import React, { useContext, useEffect, useState } from "react";
import AdminDashboard from "./AdminDashboard";
import VolunteerDashboard from "./VolunteerDashboard";
import UserDashboard from "./UserDashboard";
import Context from "../Context/Context";
import axios from "axios";

const RoleBasedDashboard = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const { user } = useContext(Context);

  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
      return;
    }

    if (user?.email) {
      axios.get(`http://localhost:5000/users-by-email/${user.email}`).then((res) => {
        if (res.data) {
          setCurrentUser(res.data);
        }
      });
    }
  }, [user]);

  if (!currentUser) {
    return (
      <div className="flex justify-center items-center h-screen text-lg text-gray-500">
        Loading dashboard...
      </div>
    );
  }

  // if (currentUser.role === "admin") return <AdminDashboard />;
  // if (currentUser.role === "volunteer") return <VolunteerDashboard />;
  // return <UserDashboard />;
  if (currentUser.role === "user") {
    return <UserDashboard />;
  } else if (currentUser.role === "volunteer") {
    return <VolunteerDashboard />;
  } else {
    return <AdminDashboard />;
  }
};

export default RoleBasedDashboard;
