const Student = require('../Models/Student');
const Attendance = require('../Models/Attendance');

// Get students by class name
const getStudents = async (req, res) => {
    const { className } = req.params;
    try {
        // Query the Student model to get students for the specified class
        const students = await Student.find({ class: className }).exec();
        if (students.length === 0) {
            return res.json({ success: false, message: 'No students found for this class.' });
        }
        res.json({ success: true, students });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Submit attendance
const submitAttendance = async (req, res) => {
    const { className, students } = req.body;
    try {
        // Create and save attendance record
        const attendance = new Attendance({
            className,
            students
        });

        await attendance.save();

        // Calculate present and absent counts
        const presentCount = students.filter(student => student.status === 'Present').length;
        const absentCount = students.length - presentCount;

        res.json({ success: true, presentCount, absentCount });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getStudents,
    submitAttendance
};
