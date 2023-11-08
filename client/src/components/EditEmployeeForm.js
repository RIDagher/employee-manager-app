import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditEmployeeForm = ({ departments }) => {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: '',
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      setLoading(true);

      try {
        const response = await axios.get(
          `http://localhost:8000/api/employees/${id}`
        );
        // Assuming the department is populated with the entire department object
        setFormData({
          firstName: response.data.data.firstName,
          lastName: response.data.data.lastName,
          email: response.data.data.email,
          department: response.data.data.department._id,
        });
        setLoading(false);
      } catch (error) {
        console.log('Failed to fetch employee', error);
        setLoading(false);
      }
    };
    fetchEmployee();
  }, [id]);

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
      await axios.put(`http://localhost:8000/api/employees/${id}`, formData);
      navigate('/employees');
    } catch (error) {
      console.log('Error updating employee', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/employees');
  };

  if (loading) return <div>Loading...</div>;
  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
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
        >
          {departments.map((department) => (
            <option key={department._id} value={department._id}>
              {department.name}
            </option>
          ))}
        </select>
      </label>
      <button type="submit">Save</button>
      <button type="button" onClick={handleCancel}>
        Cancel
      </button>
    </form>
  );
};

export default EditEmployeeForm;
