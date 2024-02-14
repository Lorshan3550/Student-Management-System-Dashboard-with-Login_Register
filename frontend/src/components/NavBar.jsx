import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/images/logo.png";
import Person from "../assets/images/p2.jpeg";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../pages/userSlice";
import Cookies from "js-cookie";

const NavBar = () => {
  const userObj = useSelector((state) => state.users);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Check if the "Auth" cookie exists
    const authCookie = Cookies.get("auth");
    if (authCookie) {
      // // Delete the "Auth" cookie

      // Cookies.remove("auth");
      // // Navigate to the login page
      // navigate("/login");

      axios.get("/logout-okay")
      .then(response => {
        // Remove the "auth" cookie
        Cookies.remove("auth");
        // Navigate to the login page
        navigate("/login");
      })
      .catch(error => {
        console.log("Error logging out:", error);
      });
    }
  };
  // useEffect(() => {
  //   setUser(userObj)
  // }, [user])

  console.log(userObj);
  return (
    <nav className="bg-indigo-500 shadow-lg">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        {/* Logo and Title */}

        <div className="flex items-center">
          <Link to="/">
            <img src={Logo} alt="Logo" className="h-10 mr-2" />
          </Link>
          <h1 className="text-white text-lg font-bold">SMS</h1>
        </div>

        {/* Dashboard Title */}
        <h2 className="text-white text-lg font-semibold lg:block hidden">
          Student Manangement System Dashboard
        </h2>

        {/* User info and Logout */}
        <div className="flex items-center">
          <img
            src={userObj ? userObj.image : Person}
            alt="Profile"
            className="h-10 w-10 rounded-full mr-2"
          />
          <span className="text-white hidden md:inline">
            {userObj ? userObj.name : "Jake"}
          </span>
          <Link to="/login">
            <button
              className="ml-4 bg-white text-indigo-500 px-3 py-1 rounded hover:bg-indigo-500 hover:text-white focus:outline-none"
              onClick={handleLogout}
            >
              Logout
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
