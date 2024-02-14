import Login from "./pages/Login";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Students from "./pages/Students";
import Footer from "./components/Footer";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NewStudent from "./components/NewStudent";
import UpdateStudent from "./components/UpdateStudent";
import { useState } from "react";

export default function App() {
  
  const Layout = () => {
    return (
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <div className="flex flex-grow">
          <div className="lg:block w-1/6 bg-indigo-500 text-white">
            <SideBar />
          </div>
          <div className="w-full lg:w-5/6 px-4 py-8 md:px-8 md:py-12 bg-gray-100">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/students", element: <Students /> },
        { path: "/students/create", element: <NewStudent /> },
        { path: "/students/update/:Id", element: <UpdateStudent /> },
      ],
    },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
  ]);

  return <RouterProvider router={router} />;
}
