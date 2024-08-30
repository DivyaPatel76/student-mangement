const express = require('express');
const router = express.Router();

// Import teacher-specific controller and validation middleware
const { signup, login, } = require('../Controllers/TeacherController');
const { signupValidation, loginValidation} = require('../Middlewares/TeacherValidation');

// Route for teacher signup with validation
router.post('/signup', signupValidation, signup);

// Route for teacher login with validation
router.post('/login', loginValidation, login);


module.exports = router;
