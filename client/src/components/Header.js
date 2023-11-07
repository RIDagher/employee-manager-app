import React from 'react';
import '../Styles/Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <h1>Employee Management Systeme </h1>
      <nav>
        <Link to="/employees">Employees Dashboard</Link>
        <Link to="/departments">Departments Dashboard</Link>
        <Link to="/new-employee">Add New Employee</Link>
      </nav>
    </header>
  );
};

export default Header;
