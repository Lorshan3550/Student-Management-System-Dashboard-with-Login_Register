import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-4xl font-bold text-indigo-600 mb-8">Welcome to the Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Link to="/students" className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-4 rounded-md shadow-lg text-center transition-colors duration-300">
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
