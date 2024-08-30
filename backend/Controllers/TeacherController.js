const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const TeacherModel = require("../Models/Teacher");

// Signup function for teachers
const signup = async (req, res) => {
    try {
        const { name, email, password, address, salary } = req.body;
        
        // Check if the teacher already exists
        const existingTeacher = await TeacherModel.findOne({ email });
        if (existingTeacher) {
            return res.status(409)
                .json({ message: 'Teacher already exists, you can login', success: false });
        }

        // Create a new teacher
        const teacher = new TeacherModel({ name, email, password, address, salary });
        teacher.password = await bcrypt.hash(password, 10);
        await teacher.save();

        res.status(201)
            .json({
                message: 'Signup successful',
                success: true
            });
    } catch (err) {
        console.error('Signup Error:', err); // Log detailed error
        res.status(500)
            .json({
                message: 'Internal server error',
                success: false
            });
    }
};

// Login function for teachers
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        console.log('Received login request with email:', email);

        // Find the teacher by email
        const teacher = await TeacherModel.findOne({ email });
        if (!teacher) {
            console.log('Teacher not found');
            return res.status(403)
                .json({ message: 'Authentication failed, email or password is incorrect', success: false });
        }

        console.log('Teacher found:', teacher);

        // Compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(password, teacher.password);
        if (!isMatch) {
            console.log('Password does not match');
            return res.status(403)
                .json({ message: 'Authentication failed, email or password is incorrect', success: false });
        }

        // Generate a JWT token
        const token = jwt.sign({ email: teacher.email, _id: teacher._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        console.log('JWT Token generated:', token);

        res.status(200).json({
            message: 'Login successful',
            success: true,
            jwtToken: token,
            email: teacher.email,
            name: teacher.name
        });
    } catch (err) {
        console.error('Login Error:', err); // Log detailed error
        res.status(500)
            .json({
                message: 'Internal server error',
                success: false
            });
    }
};

// Signup function for teachers



module.exports = {
    signup,
    login,
   
};
