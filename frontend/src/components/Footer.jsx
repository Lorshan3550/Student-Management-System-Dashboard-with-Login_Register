const Footer = () => {
  return (
    <div className="flex justify-between items-center bg-indigo-600 text-white py-4 px-6">
      <span className="text-lg font-semibold">Student Management System</span>
      <span className="text-sm">&copy; {new Date().getFullYear()} All rights reserved</span>
    </div>
  );
};

export default Footer;
