const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reportSchema = new Schema({
    rollno: { type: String, required: true },
    student: {
        name: { type: String, required: true },
        rollno: { type: String, required: true },
        class: { type: String, required: true },
        address: { type: String, required: true },
        contactNumber: { type: String, required: true }
    },
    grades: [{
        subject: { type: String, required: true },
        grade: { type: String, required: true }
    }]
});

module.exports = mongoose.model('Report', reportSchema);
