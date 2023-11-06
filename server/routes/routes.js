const express = require('express');
const router = express.Router();

const controllers = require('../controllers/controllers');

// Employee routes //
router.get('/employees', controllers.getAllEmployees);
router.post('/employees', controllers.createEmployee);
router.put('/employees/:id', controllers.updateEmployee);
router.delete('/employees/:id', controllers.deleteEmployee);

// Department routes //
router.get('/departments', controllers.getAllDepartments);
router.post('/departments', controllers.createDepartment);
router.put('/departments/:id', controllers.updateDepartment);
module.exports = router;
