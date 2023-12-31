import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Styles/AddEditEmployeeForm.css';

const AddEditEmployeeForm = ({ departments }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: '',
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post('http://localhost:8000/api/employees', formData);
      navigate('/employees'); // Redirect to employee list after successful add
    } catch (error) {
      console.error('There was an error saving the new employee', error);
      // Handle errors (show to user, log, etc.)
    } finally {
      setLoading(false);
    }
  };

  const handleCancle = () => {
    navigate('/employees');
  };

  if (loading) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Last Name:
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Department:
        <select
          name="department"
          value={formData.department}
          onChange={handleChange}
          required
        >
          {departments.map((dept) => (
            <option key={dept._id} value={dept._id}>
              {dept.name}
            </option>
          ))}
        </select>
      </label>
      <button type="submit">Save</button>
      <button type="button" onClick={handleCancle}>
        Cancel
      </button>
    </form>
  );
};

export default AddEditEmployeeForm;
