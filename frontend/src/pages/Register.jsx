import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import Logo from "../assets/images/logo.png";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("User");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: email,
          password,
          userType,
        }),
      });
      if (response.ok) {
        // Registration successful
        // Redirect or show success message
        setIsSubmitted(true);
        console.log("Registered Successfully");
      } else {
        // Registration failed
        const data = await response.json();
        // Handle error, maybe show error message to the user
        console.log(data.error || "Failed to register user");
      }
    } catch (error) {
      console.log("Error registering user:", error);
    }
  };

  const successMessage = <div> Form submitted Successfully</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <img src={Logo} alt="" className=" h-16" />
      <h1 className="text-3xl font-bold mb-8 text-indigo-600">
        SMS Admin Dashboard Register
      </h1>{" "}
      <form
        onSubmit={handleRegister}
        className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        {/* Success message */}
        {isSubmitted && (
          <div className="bg-green-200 border-green-500 border-t-4 rounded-b text-green-900 px-4 py-3 shadow-md mt-4">
            <div>{successMessage}</div>
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
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="userType"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            User Type
          </label>
          <select
            id="userType"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Create Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="confirmPassword"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Register
          </button>
        </div>
      </form>
      <div className="mt-4 text-sm text-gray-600">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-blue-500 hover:text-blue-700 focus:outline-none"
        >
          Login
        </Link>
      </div>
      <div className="mt-8 text-sm text-gray-600">
        <p>Or sign up with:</p>
        <button
          type="button"
          onClick={() => alert("Sign up with Google")}
          className="mt-2 inline-flex gap-2 items-center bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          <FaGoogle />
          Google
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;
