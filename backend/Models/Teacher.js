const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Define the teacher schema
const TeacherSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 100
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    salary: {
        type: Number,
        required: true,
        min: 0
    }
}, {
    timestamps: true 
});


// Create and export the model
const TeacherModel = mongoose.model('Teacher', TeacherSchema);
module.exports = TeacherModel;
