import React from 'react';
import '../Styles/DepartmentList.css'; // Ensure you import the CSS file

const DepartmentList = ({ departments, loading }) => {
  if (loading) return <div>Loading...</div>;

  const handleUpdate = (departmentId) => {
    // Placeholder function - implement navigation or state update logic
    console.log('Update Department ID:', departmentId);
  };

  const handleDelete = (departmentId) => {
    // Placeholder function - implement delete logic
    console.log('Delete Department ID:', departmentId);
  };

  return (
    <div className="department-list-container">
      <h2>Departments Dashboard</h2>
      <ul>
        {departments.map((department) => (
          <li key={department._id}>
            {department.name}
            <div className="department-actions">
              <button onClick={() => handleUpdate(department._id)}>
                Update
              </button>
              <button onClick={() => handleDelete(department._id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DepartmentList;
