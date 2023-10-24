const Employee = require('../models/employee');
const Department = require('../models/department');

// Employee controller //
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().populate('department');

    if (employees.length > 0) {
      return res
        .status(200)
        .json({ status: 200, data: employees, message: 'success!' });
    } else {
      return res
        .status(404)
        .json({ status: 404, message: 'No Employees found!' });
    }
  } catch (err) {
    console.log('Error:', err);
    return res
      .status(500)
      .json({ err: 'Failed to fetch employees', message: err.message });
  }
};

exports.createEmployee = async (req, res) => {
  try {
    const { firstName, lastName, department } = req.body;
    const newEmployee = new Employee({
      firstName,
      lastName,
      department,
    });
    await newEmployee.save();

    return res.status(201).json({
      status: 201,
      data: newEmployee,
      message: 'New Employess Created!',
    });
  } catch (err) {
    console.log('Error', err);
    res.status(500).json({
      err: 'Failed to create employee',
      message: err.message,
    });
  }
};

// Department controller //

exports.getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find();

    if (departments.length > 0) {
      return res
        .status(200)
        .json({ status: 200, data: departments, message: 'success!' });
    } else {
      return res
        .status(404)
        .json({ status: 404, message: 'No Departments found!' });
    }
  } catch (err) {
    console.log('Error', err);
    return res
      .status(500)
      .json({ err: 'failed to fetch departments', message: err.message });
  }
};

exports.createDepartment = async (req, res) => {
  try {
    const { name } = req.body;
    const newDepartment = new Department({
      name,
    });

    await newDepartment.save();

    return res.status(201).json({
      status: 201,
      data: newDepartment,
      message: 'New department created!',
    });
  } catch (err) {
    console.log('Error', err);
    return res.status(500).json({
      err: 'Failed to create new department',
      message: err.message,
    });
  }
};
