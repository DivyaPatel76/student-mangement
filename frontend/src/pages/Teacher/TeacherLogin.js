// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// // import { handleError, handleSuccess } from '../utils.js';
// import { handleError,handleSuccess } from '../../utils.js';
// // import "../css/loginSignup.css";
// // import "../"
// function TeacherLogin() {
//     const [loginInfo, setLoginInfo] = useState({
//         email: '',
//         password: ''
//     });

//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setLoginInfo(prevState => ({
//             ...prevState,
//             [name]: value
//         }));
//     };

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         const { email, password } = loginInfo;
//         if (!email || !password) {
//             return handleError('Email and password are required');
//         }
//         try {
//             const url = 'http://localhost:8080/teachers/login';
//             const response = await fetch(url, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(loginInfo)
//             });
//             const result = await response.json();
//             const { success, message, jwtToken, name, error } = result;
//             if (success) {
//                 handleSuccess(message);
//                 localStorage.setItem('token', jwtToken);
//                 localStorage.setItem('loggedInUser', name);
//                 setTimeout(() => {
//                     navigate('/teacher/dashboard');
//                 }, 1000);
//             } else if (error) {
//                 const details = error?.details[0]?.message;
//                 handleError(details);
//             } else if (!success) {
//                 handleError(message);
//             }
//         } catch (err) {
//             handleError(err);
//         }
//     };

//     return (
//         <div className='container'>
//             <h1>Teacher Login</h1>
//             <form onSubmit={handleLogin}>
//                 <div>
//                     <label htmlFor='email'>Email</label>
//                     <input
//                         onChange={handleChange}
//                         type='email'
//                         name='email'
//                         placeholder='Enter your email...'
//                         value={loginInfo.email}
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor='password'>Password</label>
//                     <input
//                         onChange={handleChange}
//                         type='password'
//                         name='password'
//                         placeholder='Enter your password...'
//                         value={loginInfo.password}
//                     />
//                 </div>
//                 <button type='submit'>Login</button>
//                 <span>Doesn't have an account?
//                     <Link to="/teacher/signup">Signup</Link>
//                 </span>
//             </form>
//             <ToastContainer />
//         </div>
//     );
// }

// export default TeacherLogin;
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import { handleError, handleSuccess } from '../../utils.js';

function TeacherLogin() {
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;
        if (!email || !password) {
            return handleError('Email and password are required');
        }
        try {
            const url = 'http://localhost:8080/teachers/login';
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo)
            });
            const result = await response.json();
            const { success, message, jwtToken, name, error } = result;
            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
                setTimeout(() => {
                    navigate('/teacher/dashboard');
                }, 1000);
            } else if (error) {
                const details = error?.details[0]?.message;
                handleError(details);
            } else if (!success) {
                handleError(message);
            }
        } catch (err) {
            handleError(err);
        }
    };

    return (
        <section className="vh-100" style={{ backgroundColor: '#9A616D' }}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-xl-10">
                        <div className="card" style={{ borderRadius: '1rem' }}>
                            <div className="row g-0">
                                <div className="col-md-6 col-lg-5 d-none d-md-block">
                                    <img
                                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                                        alt="login form"
                                        className="img-fluid"
                                        style={{ borderRadius: '1rem 0 0 1rem' }}
                                    />
                                </div>
                                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                    <div className="card-body p-4 p-lg-5 text-black">
                                        <form onSubmit={handleLogin}>
                                            <div className="d-flex align-items-center mb-3 pb-1">
                                                <i className="fas fa-chalkboard-teacher fa-2x me-3" ></i>
                                                <span className="h3 fw-bold mb-0">Teacher Login</span>
                                            </div>
                                            <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>
                                                Sign into your account
                                            </h5>
                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="form2Example17">Email address</label>
                                                <input
                                                    type="email"
                                                    id="form2Example17"
                                                    name="email"
                                                    className="form-control form-control-lg"
                                                    placeholder="Enter your email..."
                                                    value={loginInfo.email}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="form2Example27">Password</label>
                                                <input
                                                    type="password"
                                                    id="form2Example27"
                                                    name="password"
                                                    className="form-control form-control-lg"
                                                    placeholder="Enter your password..."
                                                    value={loginInfo.password}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="pt-1 mb-4">
                                                <button
                                                    className="btn btn-dark btn-lg btn-block"
                                                    type="submit"
                                                >
                                                    Login
                                                </button>
                                            </div>
                                            <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>
                                                Doesn't have an account? <Link to="/teacher/signup" style={{ color: '#393f81' }}>Register here</Link>
                                            </p>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </section>
    );
}

export default TeacherLogin;
