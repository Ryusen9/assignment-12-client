import React, { useContext, useEffect, useState } from "react";
import logo from "/public/logo.png";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { LuMenu } from "react-icons/lu";
import { IoClose, IoMoon, IoSunny } from "react-icons/io5";
import Context from "../Context/Context";
import axios from "axios";
import Swal from "sweetalert2";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useContext(Context);
  const [currentUser, setCurrentUser] = useState(null);
  const { user, logoutUser } = useContext(Context);
  useEffect(() => {
    axios.get(`http://localhost:5000/users/${user?.email}`).then((res) => {
      if (res.data) {
        setCurrentUser(res.data);
      }
    });
  }, [user?.email]);
  const handleToggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const handleLogOut = () => {
    logoutUser()
      .then(() => {
        setCurrentUser(null);
        Swal.fire("Logged Out", "You have successfully logged out.", "success");
      })
      .catch((error) => {
        Swal.fire({
          title: "Logout Failed",
          text: "An error occurred while logging out. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };
  console.log(user);
  return (
    <nav className="fixed top-0 left-0 w-full flex items-center justify-center z-10">
      <div className="flex items-center justify-between max-w-7xl p-3 mx-auto bg-slate-50 w-full lg:rounded-lg">
        {/* logo */}
        <div className="flex items-center justify-center">
          <img src={logo} alt="" className="w-10" />
          <p className="text-xl font-semibold text-slate-950">BloodBond</p>
        </div>
        {/* nav items */}
        <div className="hidden md:block">
          <ul className="flex items-center justify-center gap-5">
            <li className="font-semibold hover:text-rose-500 text-slate-950 cursor-pointer duration-200">
              <Link to={"/"}>Home</Link>
            </li>
            <li className="font-semibold hover:text-rose-500 cursor-pointer text-slate-950 duration-200">
              <Link to={"/dashboard"}>Dashboard</Link>
            </li>
            <li className="font-semibold hover:text-rose-500 cursor-pointer text-slate-950 duration-200">
              <Link to={"/donations"}>Donate</Link>
            </li>
            <li className="font-semibold text-slate-950 hover:text-rose-500 cursor-pointer duration-200">
              <Link to={"/about_us"}>About Us</Link>
            </li>
            <li className="font-semibold hover:text-rose-500 text-slate-950 cursor-pointer duration-200">
              <Link to={"/contact_us"}>Contact Us</Link>
            </li>
          </ul>
        </div>
        {/* button */}
        <div className="flex items-center justify-center gap-3">
          {user ? (
            <>
              <button
                onClick={() =>
                  document.getElementById("my_modal_2").showModal()
                }
              >
                <div className="avatar">
                  <div className="w-8 rounded-full">
                    <img src={currentUser?.profilePicture} />
                  </div>
                </div>
              </button>
              <dialog id="my_modal_2" className="modal">
                <div className="modal-box">
                  <h3 className="font-bold text-lg">
                    Hello! {currentUser?.name}
                  </h3>
                  <p className="py-4">
                    Select your profile to edit or update your information.
                  </p>
                  <div className="flex items-center justify-end gap-3">
                    <button
                      onClick={handleLogOut}
                      className="btn btn-outline btn-error"
                    >
                      Logout
                    </button>
                  </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                  <button>close</button>
                </form>
              </dialog>
            </>
          ) : (
            <Link to={"/register"}>
              <button className="btn btn-sm md:btn-md bg-rose-500 text-slate-50 shadow-rose-200">
                Register <FaHeart />
              </button>
            </Link>
          )}
          {/* mobile menu */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="btn btn-circle btn-sm bg-rose-500 text-slate-50 text-lg"
            >
              {isMenuOpen ? <IoClose /> : <LuMenu />}
            </button>
          </div>

          {/* Theme Switcher */}
          <div>
            <button
              className="btn btn-circle btn-sm bg-rose-500 text-slate-50 text-lg"
              onClick={handleToggleTheme}
            >
              {theme === "light" ? (
                <IoMoon className="text-base" />
              ) : (
                <IoSunny className="text-base" />
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Aside menu for mobile */}
      {isMenuOpen && (
        <aside
          className={`min-h-screen w-full ${
            theme === "light" ? "bg-slate-50" : "bg-black"
          } absolute top-0 left-0 z-20`}
        >
          <div className="p-10">
            <div className="flex items-center justify-end">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="btn btn-circle btn-sm bg-rose-500 text-slate-50 text-lg"
              >
                <IoClose className="text-3xl" />
              </button>
            </div>
            <div className="flex items-center justify-center mt-10">
              <ul className="flex flex-col items-center w-full justify-center gap-5">
                <li className="border-t-2 hover:border-t-rose-500 hover:text-rose-500 font-semibold hover:border-b-rose-500 border-b-2 w-full p-4 cursor-pointer duration-200">
                  <Link>Home</Link>
                </li>
                <li className="border-t-2 hover:border-t-rose-500 hover:text-rose-500 font-semibold hover:border-b-rose-500 border-b-2 w-full p-4 cursor-pointer duration-200">
                  <Link to={"/dashboard"}>Dashboard</Link>
                </li>
                <li className="border-t-2 hover:border-t-rose-500 hover:text-rose-500 font-semibold hover:border-b-rose-500 border-b-2 w-full p-4 cursor-pointer duration-200">
                  <Link to={"/donations"}>Donate</Link>
                </li>
                <li className="border-t-2 hover:border-t-rose-500 hover:text-rose-500 font-semibold hover:border-b-rose-500 border-b-2 w-full p-4 cursor-pointer duration-200">
                  <Link to={"/about_us"}>About Us</Link>
                </li>
                <li className="border-t-2 hover:border-t-rose-500 hover:text-rose-500 font-semibold hover:border-b-rose-500 border-b-2 w-full p-4 cursor-pointer duration-200">
                  <Link to={"/contact_us"}>Contact Us</Link>
                </li>
              </ul>
            </div>
          </div>
        </aside>
      )}
    </nav>
  );
};

export default Navbar;
