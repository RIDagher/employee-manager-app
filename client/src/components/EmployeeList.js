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
      <ul>
        {employees.map((employee) => (
          <li key={employee._id}>
            <div className="employee-info">
              {employee.firstName} {employee.lastName}
            </div>
            <div className="employee-details">
              <span className="employee-email">{employee.email}</span>

              <span className="employee-department">
                {employee.department.name}
              </span>
            </div>
            <div className="employee-actions">
              <button onClick={() => handleUpdate(employee._id)}>Update</button>
              <button onClick={() => handleDelete(employee._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;
