import { PiStudent } from "react-icons/pi";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="flex flex-col p-5 bg-indigo-500 text-slate-100 h-screen">
      <Link to="/">
        <button className="flex items-center gap-2 hover:bg-white hover:text-indigo-500 w-fit px-2 py-1 rounded mb-2 md:mb-0">
          {/* icon */}
          <FaHome className="h-12 md:h-9" />
          {/* Title */}
          <span className="md:block hidden">Home</span>
        </button>
      </Link>

      <Link to="/students">
        <button className="flex items-center gap-2 hover:bg-white hover:text-indigo-500 w-fit px-2 py-1 rounded">
          {/* icon */}
          <PiStudent className="lg:h-9" />
          {/* Title */}
          <span className=" md:block hidden">Student</span>
        </button>
      </Link>
    </div>
  );
};

export default SideBar;
