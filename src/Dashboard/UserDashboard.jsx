import React, { useContext, useEffect, useState } from "react";
import Context from "../Context/Context";
import axios from "axios";
import { NavLink, Outlet } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { HiOutlineMenuAlt1 } from "react-icons/hi";

const UserDashboard = () => {
  const { user } = useContext(Context);
  const [currentUser, setCurrentUser] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    if (user?.email) {
      axios.get(`http://localhost:5000/users/${user.email}`).then((res) => {
        if (res.data) setCurrentUser(res.data);
      });
    }
  }, [user?.email]);

  return (
    <div className="min-h-screen flex">
      <div className="block lg:hidden">
        <HiOutlineMenuAlt1 className="btn btn-sm text-sm btn-primary bg-rose-500 border-2 border-rose-600 hover:text-white hover:bg-rose-600 text-white" />
      </div>
      <aside className="w-64 bg-base-300 flex flex-col">
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
            <li>
              <NavLink
                to={"/"}
                className="flex items-center gap-3 font-semibold hover:bg-rose-500 hover:text-white cursor-pointer duration-200 p-4"
              >
                {" "}
                <GoHome />
                Home
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
      <div className="w-full min-h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default UserDashboard;
