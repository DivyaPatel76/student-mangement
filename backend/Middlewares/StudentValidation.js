const Joi = require('joi');

// Signup validation for students
const signupValidation = (req, res, next) => {
    const schema = Joi.object({
        rollno: Joi.string().required(), // Roll number is required
        name: Joi.string().min(3).max(100).required(),
        class: Joi.string().required(), // Class is required
        age: Joi.number().min(1).required(), // Age should be a positive number
        address: Joi.string().required(), // Address is required
         contactNumber: Joi.string().required(), // Contact number should be a 10-digit number
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(100).required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        console.log('Signup validation error:', error.details); // Log detailed validation error
        return res.status(400).json({
            message: 'Validation error',
            details: error.details.map(detail => detail.message) // Provide specific validation errors
        });
    }

    next();
};

// Login validation for students
const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(100).required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        console.log('Login validation error:', error.details); // Log detailed validation error
        return res.status(400).json({
            message: 'Validation error',
            details: error.details.map(detail => detail.message) // Provide specific validation errors
        });
    }

    next();
};

module.exports = { signupValidation, loginValidation };
