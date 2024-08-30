const StudentModel = require('../Models/Student');
const GradeModel = require('../Models/Grade');
const ReportModel = require('../Models/Report');

// Fetch student details and grades by roll number
const getStudentAndGrades = async (req, res) => {
    const { rollno } = req.params;
    try {
        const student = await StudentModel.findOne({ rollno });
        if (!student) {
            return res.json({ success: false, message: 'Student not found' });
        }

        const grades = await GradeModel.find({ rollno });
        res.json({ success: true, student, grades: grades[0]?.subjects || [] });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Submit report
const submitReport = async (req, res) => {
    const { rollno, student, grades } = req.body;
    try {
        const report = new ReportModel({
            rollno,
            student,
            grades
        });

        await report.save();
        res.json({ success: true });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

module.exports = {
    getStudentAndGrades,
    submitReport
};
