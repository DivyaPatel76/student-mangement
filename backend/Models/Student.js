const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the student schema
const StudentSchema = new Schema({
    rollno: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 100
    },
    class: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required: true,
        min: 1
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    contactNumber: { 
        type: String,
        required: true,
        trim: true
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
    }
}, {
    timestamps: true 
});

// Create and export the model
const StudentModel = mongoose.model('Student', StudentSchema);
module.exports = StudentModel;
