import { IoIosAdd } from "react-icons/io";
import StudentTable from "../components/StudentTable";
import { Link , Outlet } from "react-router-dom";
import NewStudent from "../components/NewStudent";



const Students = () => {
  // const currentFilePath = new URL('../../../backend/uploads/3.jpg', import.meta.url).pathname;
// console.log(currentFilePath);
  return (
    <div className=" m-3 flex flex-col gap-6">
      <div className=" flex justify-end">
        <Link to="/students/create">
          <button className=" bg-green-500 text-white p-2 rounded flex items-center  ">
            {" "}
            <IoIosAdd />
            Add Student
          </button>
          
        </Link>
        
        
        
      </div>
      {/* <p>{currentFilePath}</p> */}


      
      <div className=" flex justify-center  ">
        <Outlet/>
        <StudentTable/>
      </div>
    </div>
  );
};

export default Students;
