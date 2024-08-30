const StudentModel = require('../Models/Student');
const GradeModel = require('../Models/Grade');

// Fetch student details by roll number
const getStudentByRollno = async (req, res) => {
    const { rollno } = req.params;
    try {
        const student = await StudentModel.findOne({ rollno });
        if (student) {
            res.json({ success: true, student });
        } else {
            res.json({ success: false, message: 'Student not found' });
        }
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Submit grades
const submitGrades = async (req, res) => {
    const { rollno, subjects } = req.body;
    try {
        const grade = new GradeModel({
            rollno,
            subjects
        });

        await grade.save();
        res.json({ success: true });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

module.exports = {
    getStudentByRollno,
    submitGrades
};
