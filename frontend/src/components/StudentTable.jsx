import { FaUserEdit } from "react-icons/fa";
import { useState, useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import path from "path";
import PropTypes from "prop-types";
// import Cookies from 'js-cookie';
import { useDispatch, useSelector } from "react-redux"
import { userAdded } from "../pages/userSlice"
import {selectUser} from "../pages/userSlice"


const statuses = ["Active", "Inactive"];
// const currentFilePath = new URL('../../../backend/uploads/', import.meta.url).pathname;

const TableRow = ({ data, fetchData }) => {
  
  // console.log("user in student", user)

  // const handleDelete1 = () => {
  //   onDelete(data.id);
  // };
  const [info, setInfo] = useState(data);

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/student/${info.id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchData();
        console.log("Success");
      } else {
        console.log(data.id);
        console.log(info);
        console.log("Failed to delete student");
      }
    } catch (error) {
      console.log("Error deleting student:", error);
    }
  };

  return (
    <tr>
      <td className="border px-4 py-2">{data.id}</td>
      <td className="border px-4 py-2">
        <img src="" alt="" />
      </td>
      <td className="border px-4 py-2">{data.firstName}</td>
      <td className="border px-4 py-2">{data.lastName}</td>
      <td className="border px-4 py-2">{data.age}</td>
      <td className="border px-4 py-2">{data.status}</td>

      <td className="border px-4 py-2 bg-indigo-500 text-white">
        <Link
          to={`/students/update/${data.id}`}
          className="flex items-center justify-center"
        >
          <FaUserEdit className="h-5 w-5" />
        </Link>
      </td>

      <td className="border px-4 py-2 bg-red-500 text-white">
        <button
          onClick={handleDelete}
          className="flex items-center justify-center"
        >
          <FaTrashAlt className="h-5 w-5" />
        </button>
      </td>
    </tr>
  );
};

// TableRow.propTypes = {
//   data: PropTypes.shape({
//     id: PropTypes.string.isRequired,
//     firstName: PropTypes.string.isRequired,
//     lastName: PropTypes.string.isRequired,
//     age: PropTypes.number.isRequired,
//     status: PropTypes.oneOf(["Active", "Inactive"]).isRequired,
//   }).isRequired,
// };

const Table = ({ data, fetchData }) => {
  // const user = useSelector((state) => state.users)
  // console.log(user)
  return (
    <table className="w-full table-auto">
      <thead>
        <tr>
          <th className="px-4 py-2">ID</th>
          <th className="px-4 py-2">Avatar</th>
          <th className="px-4 py-2">First Name</th>
          <th className="px-4 py-2">Last Name</th>
          <th className="px-4 py-2">Age</th>
          <th className="px-4 py-2">Status</th>
          <th className="px-4 py-2">Edit</th>
          <th className="px-4 py-2">Delete</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <TableRow key={String(row.id)} data={row} fetchData={fetchData} />
        ))}
      </tbody>
    </table>
  );
};

// Table.propTypes = {
//   data: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.string.isRequired,
//       firstName: PropTypes.string.isRequired,
//       lastName: PropTypes.string.isRequired,
//       age: PropTypes.number.isRequired,
//       status: PropTypes.oneOf(["Active", "Inactive"]).isRequired,
//       // Add more PropTypes validations as needed
//     })
//   ).isRequired,
// };

const StudentTable = () => {
  const [rows, setRows] = useState([
    {
      id: 1,
      avatar: "",
      firstName: "Jon",
      lastName: "Snow",
      age: 35,
      status: "Active",
    },

    // Other data rows...
  ]);
  const [student, setStudent] = useState([]);
  // const [students, setStudents] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("http://localhost:3000/students/");
  //       if (response.ok) {
  //         const data = await response.json();
  //         // setStudents(data.students);
  //         console.log(data.students);
  //         const f1 = data.students.map((student) => {
  //           return {
  //             id: student.studentId,
  //             avatar: `../../../backend/uploads/${student.image}`,
  //             firstName: student.firstName,
  //             lastName: student.lastName,
  //             age: student.age,
  //             status: student.status,
  //           };
  //         });
  //         console.log(f1);
  //         setRows(() => [...f1]);
  //         // console.log(data.students)
  //       } else {
  //         console.error("Failed to fetch students");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching students:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const fetchData = async () => {
    // const accessToken = Cookies.get('accessToken');
    try {
      const response = await fetch("http://localhost:3000/students/");
      if (response.ok) {
        // console.log("Access token", accessToken)
        const data = await response.json();
        const formattedStudents = data.students.map((student) => {
          return {
            id: Number(student.studentId),
            avatar: `../../../backend/uploads/${student.image}`,
            firstName: student.firstName,
            lastName: student.lastName,
            age: student.age,
            status: student.status,
          };
        });
        setRows(formattedStudents);
      } else {
        console.log("Failed to fetch students");
      }
    } catch (error) {
      console.log("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [rows]);

  return (
    <div className="container mx-auto">
      <Table data={rows} fetchData={fetchData} />
    </div>
  );
};

export default StudentTable;
