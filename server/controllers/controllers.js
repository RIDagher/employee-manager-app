const Employee = require('../models/employee');
const Department = require('../models/department');

/////////////////Utility Function Responses/////////////////////////

const sendResponse = (res, statusCode, data, message) => {
  return res
    .status(statusCode)
    .json({ status: statusCode, data: data, message: message });
};

// Employee controller //
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().populate('department');

    if (employees.length > 0) {
      sendResponse(res, 200, employees, 'success!');
    } else {
      sendResponse(res, 404, null, 'No Employees found!');
    }
  } catch (err) {
    console.log('Error:', err);
    return res
      .status(500)
      .json({ err: 'Failed to fetch employees', message: err.message });
  }
};

exports.getSingleEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await Employee.findById(id).populate('department');

    if (employee) {
      sendResponse(res, 200, employee, 'Success');
    } else {
      sendResponse(res, 404, null, 'Employee not found!');
    }
  } catch (err) {
    console.log('failed to fetch employee', err);
    sendResponse(res, 500, err.message);
  }
};

exports.createEmployee = async (req, res) => {
  try {
    const { firstName, lastName, department, email } = req.body;
    const newEmployee = new Employee({
      firstName,
      lastName,
      department,
      email,
    });
    await newEmployee.save();

    sendResponse(res, 201, newEmployee, 'Employee created successfully!');
  } catch (err) {
    console.log('Error', err);
    if (err.name === 'ValidationError') {
      res.status(400).json({
        err: 'Validation Error',
        message: err.message,
      });
    } else if (err.code === 11000) {
      res.status(409).json({
        err: 'duplicate Error',
        message: 'Email already exists',
      });
    } else if (err.name === 'CastError') {
      // Handle cast error
      res.status(400).json({
        err: 'cast Error',
        message: 'Invalid Id format',
      });
    } else {
      res.status(500).json({
        err: 'Failed to create employee',
        message: err.message,
      });
    }
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const { firstName, lastName, department, email } = req.body;

    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, department, email },
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({
        status: 404,
        data_sent: req.body,
        message: 'Employee not found!',
      });
    }

    sendResponse(res, 200, updatedEmployee, 'Employee updated successfully!');
  } catch (err) {
    console.log('Error', err);
    return res
      .status(500)
      .json({ err: 'Failed to update employee!', message: err.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndRemove(req.params.id);

    if (!deletedEmployee) {
      sendResponse(res, 404, null, 'Employee not found!');
    }

    sendResponse(res, 200, deletedEmployee, 'Employess deleted successfully!');
  } catch (err) {
    console.log(err);
    sendResponse(res, 500, null, 'Failed to delete employee');
  }
};

////////////////// Department controller ////////////////////

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

exports.updateDepartment = async (req, res) => {
  try {
    const { name } = req.body;

    const updateDepartment = await Department.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );

    if (!updateDepartment) {
      return res.status(404).json({
        status: 404,
        data_sent: req.body,
        message: 'Depatment not found!',
      });
    }

    return res.status(200).json({
      status: 200,
      data: updateDepartment,
      message: 'Department updated successfully!',
    });
  } catch (err) {
    console.log('Error', err);
    return res.status(500).json({
      err: 'Failed to update department!',
      message: err.message,
    });
  }
};

exports.deleteDepartment = async (req, res) => {
  try {
    const departmentId = req.params.id;

    // Check for associated employees before deletion
    const associatedEmployees = await Employee.find({
      department: departmentId,
    });
    if (associatedEmployees.length > 0) {
      // If there are associated employees, prevent deletion
      return sendResponse(
        res,
        400,
        null,
        'Cannot delete department with associated employees.'
      );
    }

    const department = await Department.findById(departmentId);
    if (!department) {
      return sendResponse(res, 404, null, 'Department not found!');
    }

    // If no associated employees, proceed with deletion
    await Department.findByIdAndDelete(departmentId);
    sendResponse(res, 200, null, 'Department deleted successfully!');
  } catch (err) {
    console.error('Error', err); // Consider replacing with a robust logging system later
    sendResponse(res, 500, null, 'Failed to delete department: ' + err.message);
  }
};
