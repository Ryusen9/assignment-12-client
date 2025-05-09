import React, { useContext, useEffect, useState } from "react";
import Context from "../Context/Context";
import axios from "axios";
import { Link } from "react-router-dom";
import { GoHome } from "react-icons/go";

const UserDashboard = () => {
  const { user } = useContext(Context);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    if (user?.email) {
      axios.get(`http://localhost:5000/users/${user.email}`).then((res) => {
        if (res.data) setCurrentUser(res.data);
      });
    }
  }, [user?.email]);

  return (
    <div className="min-h-screen">
      <aside className="fixed top-0 left-0 w-64 h-full bg-base-300 flex flex-col">
        <div className="flex justify-center items-center gap-4 mb-10 p-4">
          <div className="avatar">
            <div className="w-10 lg:w-16 rounded-full">
              <img src={currentUser?.profilePicture} />
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-lg">Welcome</p>
            <h2 className="text-lg font-bold">{currentUser?.name}</h2>
            <p className="text-sm text-gray-500">{currentUser?.email}</p>
          </div>
        </div>
        <nav>
          <ul className="flex flex-col">
            <li className="font-semibold hover:bg-rose-500 hover:text-white cursor-pointer duration-200 p-4">
              <Link to={"/"} className="flex items-center gap-3"> <GoHome/>Home</Link>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default UserDashboard;
