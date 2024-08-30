const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const TeacherRouter = require('./Routes/TeacherRouter');
const StudentRouter = require('./Routes/StudentRouter'); 
const attendanceRoutes = require('./Routes/attendance');
const gradeRoutes = require('./Routes/gradeRouter');
const reportRoutes = require('./Routes/reportRoutes');
require('dotenv').config();
require('./Models/db');
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cors());

app.use('/auth', AuthRouter);
app.use('/teachers', TeacherRouter);
app.use('/students', StudentRouter);
app.use('/attendance', attendanceRoutes);
app.use('/grades', gradeRoutes);
app.use('/reports', reportRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})