import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import EmployeeList from './components/EmployeeList';
import DepartmentList from './components/DepartmentList';
import AddEditEmployeeForm from './components/AddEditEmployeeForm';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/departments" element={<DepartmentList />} />
          <Route path="/new-employee" element={<AddEditEmployeeForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
