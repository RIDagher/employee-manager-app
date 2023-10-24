# Apollonia Dental Practice - Employee Management System

An application to manage employees and departments of the Apollonia Dental Practice.

## Project Overview

Apollonia Dental Practice aims to digitalize its employee management. The primary objective at this stage is to manage records of clinic departments and the medical staff.

## Current Features:

1.Maintain a list of employees by department.
2.CRUD operations for employees and departments.

## Future Features:

1.Training and specializations for each medical staff member.
2.Record of current projects.
3.Assign patients to medical staff.
4.Revenue tracking per patient and staff member.

## Structure:

`Backend:`
-Node.js & Express.js for the server.
-MongoDB for the database.
-Models:
-Employee: Contains Name, Surname, Department.
-Department: Contains Department Name.

``Frontend:`
-React for building the user interface.
-CRUD operations through the frontend for both employees and departments.

``Directories & Files:`
-server/: Contains all backend related files.
-config/: Configuration files such as database connection.
-models/: MongoDB database models.
-routes/: Express routes to handle API endpoints.
-index.js: Entry point for the server.

``client/: Contains all frontend related files (React application).`

-src/: Source files for React.
-components/: Reusable React components.
-pages/: React components representing entire pages/views.
-App.js: Main React component.
-... (other frontend directories and files)

## Current Data:

-Employees (10): Lisa Harris, Alfred Christensen, John Dudley, Danny Perez, Sarah Alvarez, Constance Smith, Travis Combs, Francisco Willard, Janet Doe, Leslie Roche.
-Departments (5): General Dentistry, Pediatric Dentistry, Restorative Dentistry, Surgery, Orthodontics.
