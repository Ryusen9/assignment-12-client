import React, { useContext, useState } from "react";
import logo from "/public/logo.png";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { LuMenu } from "react-icons/lu";
import { IoClose, IoMoon, IoSunny } from "react-icons/io5";
import Context from "../Context/Context";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useContext(Context);
  const handleToggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };
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
              <Link>Home</Link>
            </li>
            <li className="font-semibold hover:text-rose-500 cursor-pointer text-slate-950 duration-200">
              <Link>Donate</Link>
            </li>
            <li className="font-semibold hover:text-rose-500 cursor-pointer text-slate-950 duration-200">
              <Link>Donate</Link>
            </li>
            <li className="font-semibold text-slate-950 hover:text-rose-500 cursor-pointer duration-200">
              <Link>About Us</Link>
            </li>
            <li className="font-semibold hover:text-rose-500 text-slate-950 cursor-pointer duration-200">
              <Link>Contact Us</Link>
            </li>
          </ul>
        </div>
        {/* button */}
        <div className="flex items-center justify-center gap-3">
          <Link to={"/register"}>
            <button className="btn btn-sm md:btn-md bg-rose-500 text-slate-50 shadow-rose-200">
              Register <FaHeart />
            </button>
          </Link>
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
                  <Link>Donate</Link>
                </li>
                <li className="border-t-2 hover:border-t-rose-500 hover:text-rose-500 font-semibold hover:border-b-rose-500 border-b-2 w-full p-4 cursor-pointer duration-200">
                  <Link>Donate</Link>
                </li>
                <li className="border-t-2 hover:border-t-rose-500 hover:text-rose-500 font-semibold hover:border-b-rose-500 border-b-2 w-full p-4 cursor-pointer duration-200">
                  <Link>About Us</Link>
                </li>
                <li className="border-t-2 hover:border-t-rose-500 hover:text-rose-500 font-semibold hover:border-b-rose-500 border-b-2 w-full p-4 cursor-pointer duration-200">
                  <Link>Contact Us</Link>
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
