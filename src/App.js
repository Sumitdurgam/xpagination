import './App.css';
import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from '@mui/material/Box';
// import { Alert } from 'react-alert'


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
        const errorMessage = "Failed to fetch data"; 
        setError(errorMessage);
        alert(errorMessage); 
        console.error("Error fetching data:", err); 
      }
    };
    fetchData();
  }, []);

  //calculate total pages

  const totalPages = Math.ceil(data.length / itemsPerPage);

  //currrent data on display

  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

   // Handle the Previous button

   const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => {
        const newPage = prevPage - 1;
        console.log(`Navigating to previous page: ${newPage}`);
        return newPage;
      });
    }
  };

  // Handle the   Next button

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => {
        const newPage = prevPage + 1;
        console.log(`Navigating to next page: ${newPage}`);
        return newPage;
      });
    }
  };

  useEffect(() => {
    if (data.length > 0 && currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [data, totalPages]);

  return (
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
              {currentData.length > 0 ? (
                currentData.map((employee) => (
                  <tr key={employee.id}>
                    <td>{employee.id}</td>
                    <td>{employee.name}</td>
                    <td>{employee.email}</td>
                    <td>{employee.role}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No Data Available</td>
                </tr>
              )}
            </tbody>
          </table>
        </center>
      </Box>

      {/* Pagination Controls */}
      <div className="pagination">
        <button onClick={handlePrevious} disabled={currentPage === -1}>
          Previous
        </button>
        <span>
           {currentPage}
        </span>
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>

      {/* Error Handling */}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}

export default App;