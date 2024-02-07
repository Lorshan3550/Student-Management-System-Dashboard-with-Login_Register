import { useState } from "react";
import { Link ,  } from "react-router-dom"; // Import Link from react-router-dom
import Logo from "../assets/images/logo.png"
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const LoginPage = () => {
  const navigate = useNavigate(); // Get the navigate function
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgetPassword, setShowForgetPassword] = useState(false);
  const [isLoginFailed, setIsLoginFailed] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName : email,
          password,
        }),
      });
      if (response.ok) {
        // Login successful
        navigate("/"); // Navigate to Home page
        // Redirect or do something else
      } else {
        // Login failed
        setIsLoginFailed(true)
        const data = await response.json();
        // Handle error, maybe show error message to the user
        console.error(data.error || "Failed to log in user");
      }
    } catch (error) {
      console.error("Error logging in user:", error);
    }
  };


  const handleForgetPassword = () => {
    // Handle forget password logic
    setShowForgetPassword(true);
  };

  const FailedMessage = <div> Invalid Email or Password</div>;


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <img src={Logo} alt="" className=" h-16"/>
      <h1 className="text-3xl font-bold mb-8 text-indigo-600">SMS Admin Dashboard Login</h1>
      <form onSubmit={handleLogin} className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {/* Success message */}
        {isLoginFailed && (
          <div className="bg-red-200 border-red-500 border-t-4 rounded-b  text-slate-900 px-4 py-3 shadow-md mt-4">
            <div>{FailedMessage}</div>
          </div>
        )}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
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
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
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
          onClick={() => alert("Sign in with Google")}
          className="mt-2 inline-flex items-center gap-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline  "
        >
          <span><FaGoogle/></span>
          <span>Google</span>
        </button>
      </div>
      <div className="mt-4 text-sm text-gray-600">
        Don't have an account?{" "}
        <Link to="/register" className="text-blue-500 hover:text-blue-700 focus:outline-none">
          Register
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
