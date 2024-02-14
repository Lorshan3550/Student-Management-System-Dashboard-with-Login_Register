import { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Logo from "../assets/images/logo.png";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { userAdded } from "./userSlice";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Get the navigate function
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgetPassword, setShowForgetPassword] = useState(false);
  const [isLoginFailed, setIsLoginFailed] = useState(false);
  const user = useSelector((state) => state.users);

  const loginwithgoogle = () => {
    const obj = {
      name: "Lorshan123",
      image:
        "https://lh3.googleusercontent.com/a/ACg8ocL0_ERj0DwxSWmVHUsyGpKynxm_KIusw2yw4Rnpfe_-r0A=s96-c",
      role: "User",
      auth: true,
    };
    dispatch(userAdded(obj));
    Cookies.set("auth", true); // Set a cookie to store the authentication state
    window.open("http://localhost:3000/auth/google/callback", "_self");
  };

  axios.defaults.withCredentials = true;
  const handleLogin = async (e) => {
    const accessToken = Cookies.get("accessToken");
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: email,
          password,
        }),
      });
      if (response.ok) {
        // const res = await axios.get("http://localhost:3000/role/", {userName : email}, {
        //   withCredentials: true,
        // })
        // console.log(res)

        // Login successful
        const userData = await response.json();
        // Dispatch user data to Redux store
        const obj = {
          name: userData.Name ? userData.Name : "User",
          image:
            "https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png",
          role: userData.Role,          
        };
        dispatch(userAdded(obj));
        console.log("Login successful");
        console.log("User data:", userData);
        // Login successful
        console.log("response", response);
        // const obj = {
        //   name: "User",
        //   image:
        //     "https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png",
        //   role: response.data.Role,
        // };
        // // dispatch(userAdded(obj))
        // // console.log("user", user)
        // dispatch(userAdded(obj));
        // console.log("Obj", obj);
        console.log("Success");
        console.log("access token", accessToken);

        navigate("/"); // Navigate to Home page
        // Redirect or do something else
      } else {
        // Login failed
        setIsLoginFailed(true);
        const data = await response.json();
        // Handle error, maybe show error message to the user
        console.log(data.error || "Failed to log in user");
      }

      //   axios.post('http://localhost:3000/login', {userName : email, password})
      //     .then(res => {
      //         console.log(res)
      //         if(res.data.Login) {

      //             navigate("/")
      //         } else {
      //             navigate('/login')
      //         }
      //     })
      //     .catch(err => console.log(err))
    } catch (error) {
      console.log("Error logging in user:", error);
    }
  };

  const handleForgetPassword = () => {
    // Handle forget password logic
    setShowForgetPassword(true);
  };

  const FailedMessage = <div> Invalid Email or Password</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <img src={Logo} alt="" className=" h-16" />
      <h1 className="text-3xl font-bold mb-8 text-indigo-600">
        SMS Admin Dashboard Login
      </h1>
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        {/* Success message */}
        {isLoginFailed && (
          <div className="bg-red-200 border-red-500 border-t-4 rounded-b  text-slate-900 px-4 py-3 shadow-md mt-4">
            <div>{FailedMessage}</div>
          </div>
        )}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            autoComplete="false"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            autoComplete="false"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={handleForgetPassword}
            className="text-sm text-blue-500 hover:text-blue-700 focus:outline-none"
          >
            Forget Password?
          </button>
        </div>
      </form>
      {showForgetPassword && (
        <div className="mt-4 text-sm text-gray-600">
          An email with instructions to reset your password has been sent.
        </div>
      )}
      <div className="mt-8 text-sm text-gray-600">
        <p>Or sign in with:</p>
        <button
          type="button"
          onClick={loginwithgoogle}
          className="mt-2 inline-flex items-center gap-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline  "
        >
          <span>
            <FaGoogle />
          </span>
          <span>Google</span>
        </button>
      </div>
      <div className="mt-4 text-sm text-gray-600">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-blue-500 hover:text-blue-700 focus:outline-none"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
