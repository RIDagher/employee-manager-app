const express = require('express');
const router = express.Router();

const controllers = require('../controllers/controllers');

// Employee routes //
router.get('/employees', controllers.getAllEmployees);
router.post('/employees', controllers.createEmployee);

// Department routes //
router.get('/departments', controllers.getAllDepartments);
router.post('departments', controllers.createDepartment);
module.exports = router;
