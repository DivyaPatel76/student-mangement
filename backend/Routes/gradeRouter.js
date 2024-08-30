const express = require('express');
const router = express.Router();
const gradeController = require('../Controllers/gradeController');

// Route to get student by roll number
router.get('/student/:rollno', gradeController.getStudentByRollno);

// Route to submit grades
router.post('/submit', gradeController.submitGrades);

module.exports = router;
