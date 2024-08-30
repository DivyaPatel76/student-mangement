const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require("../Models/User");


const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409)
                .json({ message: 'User is already exist, you can login', success: false });
        }
        const userModel = new UserModel({ name, email, password });
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(201)
            .json({
                message: "Signup successfully",
                success: true
            })
    } catch (err) {
        console.log(err);
        
        res.status(500)
            .json({
                message: "Internal server errror",
                success: false
            })
    }
}


const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        console.log('Received login request with email:', email);

        const user = await UserModel.findOne({ email });
        if (!user) {
            console.log('User not found');
            return res.status(403).json({ message: 'Authentication failed, email or password is incorrect', success: false });
        }

        console.log('User found:', user);

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('Password does not match');
            return res.status(403).json({ message: 'Authentication failed, email or password is incorrect', success: false });
        }

        const token = jwt.sign({ email: user.email, _id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        console.log('JWT Token generated:', token);

        res.status(200).json({ message: 'Login successful', success: true, jwtToken: token, email: user.email, name: user.name });
    } catch (err) {
        console.error('Login Error:', err); // Log detailed error
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};


module.exports = {
    signup,
    login
}