const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the user schema
const UserSchema = new Schema({
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
    }
}, {
    timestamps: true // Add createdAt and updatedAt fields
});

// Create and export the model
const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;
