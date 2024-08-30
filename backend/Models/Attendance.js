// models/Attendance.js
const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    className: { type: String, required: true },
    date: { type: Date, default: Date.now },
    students: [{
        rollno: { type: String, required: true },
        name: { type: String, required: true },
        status: { type: String, enum: ['Present', 'Absent'], required: true }
    }]
});

module.exports = mongoose.model('Attendance', attendanceSchema);
