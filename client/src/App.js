import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './Styles/App.css';
import Header from './components/Header';
import EmployeeList from './components/EmployeeList';
import DepartmentList from './components/DepartmentList';
import AddEditEmployeeForm from './components/AddEditEmployeeForm';
import EditEmployeeForm from './components/EditEmployeeForm';

const App = () => {
  const [departments, setDepartment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8000/api/departments'
        );
        setDepartment(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchDepartments();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/employees" element={<EmployeeList />} />
          <Route
            path="/departments"
            element={
              <DepartmentList departments={departments} loading={loading} />
            }
          />
          <Route
            path="/new-employee"
            element={<AddEditEmployeeForm departments={departments} />}
          />
          <Route
            path="/employees/edit/:id"
            element={<EditEmployeeForm departments={departments} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
