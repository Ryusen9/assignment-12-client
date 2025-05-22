import React, { useContext, useEffect, useRef, useState } from "react";
import Context from "../Context/Context";
import axios from "axios";
import { Link, NavLink, Outlet } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { IoIosClose } from "react-icons/io";
import gsap from "gsap";
import { FiHome } from "react-icons/fi";
import { BiDonateBlood } from "react-icons/bi";

const UserDashboard = () => {
  const { user } = useContext(Context);
  const [currentUser, setCurrentUser] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sidebarRef = useRef(null);
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/volunteers/${user.email}`)
        .then((res) => {
          if (res.data) setCurrentUser(res.data);
        });
    }
  }, [user?.email]);
  useEffect(() => {
    if (isMenuOpen) {
      gsap.from(sidebarRef.current, {
        duration: 0.5,
        x: -100,
        opacity: 0,
        ease: "power2.out",
        onComplete: () => {
          gsap.to(sidebarRef.current, {
            duration: 0.5,
            x: 0,
            opacity: 1,
          });
        },
      });
    }
  }, [isMenuOpen]);

  return (
    <div className="min-h-screen flex overflow-hidden">
      <div
        onClick={toggleMenu}
        className={`lg:hidden ${isMenuOpen ? "hidden" : "block"} p-4`}
      >
        <HiOutlineMenuAlt1 className="text-3xl" />
      </div>
      <aside
        ref={sidebarRef}
        className={`${
          isMenuOpen ? "w-64" : "w-0"
        } lg:w-72 overflow-hidden bg-base-300 flex flex-col absolute top-0 left-0 lg:relative z-30 h-[100vh]`}
      >
        <div className="flex flex-col lg:flex-row lg:justify-center lg:items-center gap-4 mb-10 p-4">
          <div className="lg:hidden flex justify-end w-full">
            <IoIosClose onClick={toggleMenu} className="text-3xl" />
          </div>
          <div className="avatar">
            <div className="w-10 lg:w-16 rounded-full">
              <img src={currentUser?.photo} />
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-lg">Welcome</p>
            <h2 className="text-lg font-bold">{currentUser?.name}</h2>
            <p className="text-xs md:text-sm text-gray-500">
              {currentUser?.email}
            </p>
          </div>
        </div>
        <nav>
          <ul className="flex flex-col">
            <li>
              <NavLink
                to={"/dashboard/volunteer-dashboard/home"}
                className="text-xs md:text-sm lg:text-base flex items-center gap-3 font-semibold hover:bg-rose-500 hover:text-white cursor-pointer duration-200 p-4"
              >
                {" "}
                <GoHome />
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/dashboard/volunteer-dashboard/allDonations"}
                className="text-xs md:text-sm lg:text-base flex items-center gap-3 font-semibold hover:bg-rose-500 hover:text-white cursor-pointer duration-200 p-4"
              >
                {" "}
                <BiDonateBlood />
                All Donations
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
      <div className="w-full min-h-screen">
        <Outlet />
      </div>
      <div className="fixed bottom-10 right-10">
        <Link to={"/"}>
          <button className="btn btn-sm btn-primary">
            <FiHome className="text-lg" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UserDashboard;
