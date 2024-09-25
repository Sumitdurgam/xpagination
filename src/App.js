import './App.css';
import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from '@mui/material/Box';


function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [error, setError] = useState("");

  const API_URL =
    "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(API_URL);
        setData(res.data);
      } catch (err) {
        setError("Error to fatch data", error);
        alert("Error fetching data");
      }
    };
    fetchData();
  }, [error]);

  //calculate total pages

  const totalPages = Math.floor(data.length / itemsPerPage);

  //currrent data on display

  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
    <div className="container">
      <h1>Employees Data Table</h1>
      <Box className="employee-table">
        <center>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </center>
      </Box>

      <div className="pagination">
        <button onClick={handlePrevious} disabled={currentPage === 1}>
          Previous
        </button>
        <span> {currentPage} </span>
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
    </>
  );
}

export default App;

