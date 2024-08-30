// routes/attendance.js
const express = require('express');
const router = express.Router();
const attendanceController = require('../Controllers/attendanceController');

// Get students by class name
router.get('/students/:className', attendanceController.getStudents);

// Submit attendance
router.post('/submit', attendanceController.submitAttendance);

module.exports = router;
