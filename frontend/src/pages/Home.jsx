import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { userAdded } from "./userSlice"

import Cookies from "js-cookie";

const Home = () => {
  // const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const user = useSelector((state) => state.users)
  const isAuthenticated = Cookies.get("auth"); // Retrieve the authentication state from the cookie



  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:3000/login/sucess", {
        withCredentials: true,
      });

      console.log("response", response);
      const obj = {
        name : response.data.user.displayName,
        image : response.data.user.image,
        role : response.data.user.userType
      }
      // dispatch(userAdded(obj))
      // console.log("user", user)
      dispatch(userAdded(obj))
      console.log(user)
    } catch (error) {
      navigate("/login");
      // console.log(error)
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      getUser();
    }

    // getUser()
    
  },[isAuthenticated])

  //   useEffect(() => {
  //     const accessToken = Cookies.get('accessToken');
  //     if (accessToken) {
  //         console.log("Invalid access token")
  //     } else {
  //         axios.defaults.withCredentials = true;
  //         axios.get('http://localhost:3000/home/')
  //             .then(res => {
  //                 console.log(res.data);
  //                 console.log("access token ",accessToken)

  //             })
  //             .catch(err => console.log(err));
  //     }
  // }, []);
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-4xl font-bold text-indigo-600 mb-8">
        Welcome to the Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Link
          to="/students"
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-4 rounded-md shadow-lg text-center transition-colors duration-300"
        >
          <h2 className="text-xl font-semibold mb-2">Manage Students</h2>
          <p className="text-sm">View, add, edit, and delete student records</p>
        </Link>
        <div className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-4 rounded-md shadow-lg text-center transition-colors duration-300">
          <h2 className="text-xl font-semibold mb-2">Analytics</h2>
          <p className="text-sm">Track student performance and analyze data</p>
        </div>
        <div className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-4 rounded-md shadow-lg text-center transition-colors duration-300">
          <h2 className="text-xl font-semibold mb-2">Settings</h2>
          <p className="text-sm">Customize your dashboard settings</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
