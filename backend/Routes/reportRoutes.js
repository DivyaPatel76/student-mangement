const express = require('express');
const router = express.Router();
const reportController = require('../Controllers/reportController');

// Route to get student and grades by roll number
router.get('/student/:rollno', reportController.getStudentAndGrades);

// Route to submit a report
router.post('/submit', reportController.submitReport);

module.exports = router;
