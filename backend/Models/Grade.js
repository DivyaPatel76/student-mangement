const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gradeSchema = new Schema({
    rollno: { type: String, required: true },
    date: { type: Date, default: Date.now },
    subjects: [{
        subject: { type: String, required: true },
        grade: { type: String, required: true }
    }]
});

module.exports = mongoose.model('Grade', gradeSchema);
