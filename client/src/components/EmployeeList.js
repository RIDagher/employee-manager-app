import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Styles/EmployeeList.css';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/employees');
        setEmployees(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const handleUpdate = (employeeId) => {
    //Navigate to edit page with employee's Id
    navigate(`/employees/edit/${employeeId}`);
  };

  const handleDelete = async (employeeId) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await axios.delete(`http://localhost:8000/api/employees/${employeeId}`);
        // Remove the employee from the state to update the list
        setEmployees(
          employees.filter((employee) => employee._id !== employeeId)
        );
      } catch (error) {
        console.error('Error deleting employee', error);
        setError('Error deleting employee');
      }
    }
  };

  if (loading) return <div>Loading</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div className="employee-list-container">
      <h2>Employees Dashboard</h2>
      <div className="employee-list-header">
        <span className="header-item">Name</span>
        <span className="header-item">ID</span>
        <span className="header-item">Email</span>
        <span className="header-item">Address</span>
        <span className="header-item">Department</span>
        <span className="header-item">Actions</span>
      </div>
      <ul>
        {employees.map((employee) => (
          <li key={employee._id} className="employee-item">
            {}
            <span>{`${employee.firstName} ${employee.lastName}`}</span>
            <span>{employee._id}</span>
            <span>{employee.email}</span>
            <span>{employee.address}</span>
            {/* we need to add the address later */}
            <span>{employee.department.name}</span>
            <span className="employee-actions">
              <button onClick={() => handleUpdate(employee._id)}>Update</button>
              <button onClick={() => handleDelete(employee._id)}>Delete</button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;
