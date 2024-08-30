const express = require('express');
const router = express.Router();

// Import student-specific controller and validation middleware
const { signup, login } = require('../Controllers/StudentController');
const { signupValidation, loginValidation } = require('../Middlewares/StudentValidation');
const {  createStudent,  getAllStudents,  getStudentByRollno,  updateStudentByRollno,  deleteStudentByRollno} = require('../Controllers/StudentController');

// Route for student signup with validation
router.post('/signup', signupValidation, signup);

// Route for student login with validation
router.post('/login', loginValidation, login);


// Route to get all students
router.get('/', getAllStudents);

// Route to get a single student by roll number
router.get('/:rollno', getStudentByRollno);

// Route to update a student by roll number
router.put('/:rollno', updateStudentByRollno);

// Route to delete a student by roll number
router.delete('/:rollno', deleteStudentByRollno);

module.exports = router;


module.exports = router;
