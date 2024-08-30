const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const StudentModel = require("../Models/Student");

// Signup function for students
const signup = async (req, res) => {
    try {
        const { rollno, name, class: studentClass, age, address, contactNumber, email, password } = req.body;
        
        // Check if the student already exists
        const existingStudent = await StudentModel.findOne({ email });
        if (existingStudent) {
            return res.status(409)
                .json({ message: 'Student already exists, you can login', success: false });
        }

        // Create a new student
        const student = new StudentModel({ rollno, name, class: studentClass, age, address, contactNumber, email, password });
        student.password = await bcrypt.hash(password, 10);
        await student.save();

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

// Login function for students
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        console.log('Received login request with email:', email);

        // Find the student by email
        const student = await StudentModel.findOne({ email });
        if (!student) {
            console.log('Student not found');
            return res.status(403)
                .json({ message: 'Authentication failed, email or password is incorrect', success: false });
        }

        console.log('Student found:', student);

        // Compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) {
            console.log('Password does not match');
            return res.status(403)
                .json({ message: 'Authentication failed, email or password is incorrect', success: false });
        }

        // Generate a JWT token
        const token = jwt.sign({ email: student.email, _id: student._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        console.log('JWT Token generated:', token);

        res.status(200).json({
            message: 'Login successful',
            success: true,
            jwtToken: token,
            email: student.email,
            name: student.name
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


// Create a new student
const createStudent = async (req, res) => {
    try {
        const { rollno, name, class: studentClass, age, address, contactNumber, email, password } = req.body;

        // Check if the student already exists
        const existingStudent = await StudentModel.findOne({ rollno });
        if (existingStudent) {
            return res.status(409).json({ message: 'Student with this roll number already exists', success: false });
        }

        // Create and save new student
        const student = new StudentModel({
            rollno,
            name,
            class: studentClass,
            age,
            address,
            contactNumber,
            email,
            password: await bcrypt.hash(password, 10)
        });
        await student.save();

        res.status(201).json({ message: 'Student created successfully', success: true, student });
    } catch (err) {
        console.error('Create Student Error:', err);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

// Read all students
const getAllStudents = async (req, res) => {
    try {
        const students = await StudentModel.find();
        res.status(200).json({ success: true, students });
    } catch (err) {
        console.error('Get All Students Error:', err);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

// Read a single student by roll number
const getStudentByRollno = async (req, res) => {
    try {
        const student = await StudentModel.findOne({ rollno: req.params.rollno });
        if (!student) {
            return res.status(404).json({ message: 'Student not found', success: false });
        }
        res.status(200).json({ success: true, student });
    } catch (err) {
        console.error('Get Student By Roll Number Error:', err);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

// Update a student by roll number
const updateStudentByRollno = async (req, res) => {
    try {
        const { name, class: studentClass, age, address, contactNumber, email, password } = req.body;
        const studentUpdates = { name, class: studentClass, age, address, contactNumber, email };

        if (password) {
            studentUpdates.password = await bcrypt.hash(password, 10);
        }

        const student = await StudentModel.findOneAndUpdate({ rollno: req.params.rollno }, studentUpdates, { new: true });
        if (!student) {
            return res.status(404).json({ message: 'Student not found', success: false });
        }

        res.status(200).json({ message: 'Student updated successfully', success: true, student });
    } catch (err) {
        console.error('Update Student Error:', err);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

// Delete a student by roll number
const deleteStudentByRollno = async (req, res) => {
    try {
        const student = await StudentModel.findOneAndDelete({ rollno: req.params.rollno });
        if (!student) {
            return res.status(404).json({ message: 'Student not found', success: false });
        }
        res.status(200).json({ message: 'Student deleted successfully', success: true });
    } catch (err) {
        console.error('Delete Student Error:', err);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

// Export all functions
module.exports = {
    signup,
    login,
    createStudent,
    getAllStudents,
    getStudentByRollno,
    updateStudentByRollno,
    deleteStudentByRollno
};


