import {  Route, Routes } from 'react-router-dom';
// import Navigate from "react-router-dom"
import './App.css';
import Login from './pages/Login.js';
import Signup from './pages/Signup.js';
import Home from './pages/Home.js';
import TeacherSignup from './pages/Teacher/Teachersignup.js';
import TeacherLogin from './pages/Teacher/TeacherLogin.js';
import Teacherdashboard from './pages/Teacher/Teacherdashboard.js';
import StudentLogin from './pages/Studentcrud/Studentlogin.js';
import StudentSignup from './pages/Studentcrud/Studentsignup.js';
import Studentdashboard from './pages/Studentcrud/Studentdeshboard.js';
import StudentCrud from './pages/Studentcrud/StudentCrud.js';
import Attendance from './pages/Studentcrud/attendance.js';
 import '@fortawesome/fontawesome-free/css/all.min.css';
 import Grade from './pages/Studentcrud/grade.js';
 import Report from './pages/Studentcrud/report.js';
 import SeeReport from './pages/Studentcrud/seeReport.js';

import { useState } from 'react';
import RefrshHandler from './RefrshHandler.js';

function App() {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  // const PrivateRoute = ({ element }) => {
  //   return isAuthenticated ? element : <Navigate to="/login" />
  // }

  return (
    <div className="App">
      {/* <RefrshHandler setIsAuthenticated={setIsAuthenticated} /> */}
      <Routes>
        {/* <Route path='/login' element={<Navigate to="/login" />} /> */}
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        {/* <Route path='/home' element={<PrivateRoute element={<Home />} />} /> */}
        <Route path='/' element={<Home />} />


             {/* teacherlogin and signup */}
        <Route path="/teacher/signup" element={<TeacherSignup />} />
        <Route path="/teacher/login" element={<TeacherLogin />} />
        <Route path="/teacher/dashboard" element={<Teacherdashboard />} />
    


        <Route path="/student/dashboard" element={<Studentdashboard />} />
        <Route path="/student/login" element={<StudentLogin />} />
        <Route path="/student/signup" element={<StudentSignup />} />
        <Route path="/studentCrud" element={<StudentCrud />} />
        <Route path="/Attendance" element={<Attendance/>} />
        <Route path="/Grade" element={<Grade/>} />
        <Route path="/Report" element={<Report/>} />
        <Route path="/Seereport" element={<SeeReport/>} />
      </Routes>
    </div>
  );
}

export default App;
