const Joi = require('joi');
const signupValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(100).required() // Adjusted minimum length for security
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

const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(100).required() // Adjusted minimum length for security
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
