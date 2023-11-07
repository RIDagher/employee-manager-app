import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DepartmentList = () => {
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
    <div>
      <h2>Departments Dashboard</h2>
      <ul>
        {departments.map((department) => (
          <li key={department._id}>{department.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default DepartmentList;
