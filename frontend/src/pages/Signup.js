// import React, { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { ToastContainer } from 'react-toastify';
// import { handleError, handleSuccess } from '../utils.js';

// function Signup() {

//     const [signupInfo, setSignupInfo] = useState({
//         name: '',
//         email: '',
//         password: ''
//     })

//     const navigate = useNavigate();
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         console.log(name, value);
//         const copySignupInfo = { ...signupInfo };
//         copySignupInfo[name] = value;
//         setSignupInfo(copySignupInfo);
//     }

//     const handleSignup = async (e) => {
//         e.preventDefault();
//         const { name, email, password } = signupInfo;
//         if (!name || !email || !password) {
//             return handleError('name, email and password are required')
//         }
//         try {
//             const url = `http://localhost:8080/auth/signup`;
//             const response = await fetch(url, {
//                 method: "POST",
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(signupInfo)
//             });
//             const result = await response.json();
//             const { success, message, error } = result;
//             if (success) {
//                 handleSuccess(message);
//                 setTimeout(() => {
//                     navigate('/login')
//                 }, 1000)
//             } else if (error) {
//                 const details = error?.details[0].message;
//                 handleError(details);
//             } else if (!success) {
//                 handleError(message);
//             }
//             console.log(result);
//         } catch (err) {
//             handleError(err);
//         }
//     }
//     return (
//         <div className='container'>
//             <h1>use Signup</h1>
//             <form onSubmit={handleSignup}>
//                 <div>
//                     <label htmlFor='name'>Name</label>
//                     <input
//                         onChange={handleChange}
//                         type='text'
//                         name='name'
//                         autoFocus
//                         placeholder='Enter your name...'
//                         value={signupInfo.name}
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor='email'>Email</label>
//                     <input
//                         onChange={handleChange}
//                         type='email'
//                         name='email'
//                         placeholder='Enter your email...'
//                         value={signupInfo.email}
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor='password'>Password</label>
//                     <input
//                         onChange={handleChange}
//                         type='password'
//                         name='password'
//                         placeholder='Enter your password...'
//                         value={signupInfo.password}
//                     />
//                 </div>
//                 <button type='submit'>Signup</button>
//                 <span>Already have an account ?
//                     <Link to="/login">Login</Link>
//                 </span>
//             </form>
//             <ToastContainer />
//         </div>
//     )
// }

// export default Signup

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import { handleError, handleSuccess } from '../utils.js';

function Signup() {
    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password } = signupInfo;
        if (!name || !email || !password) {
            return handleError('Name, email, and password are required');
        }
        try {
            const url = 'http://localhost:8080/auth/signup';
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupInfo)
            });
            const result = await response.json();
            const { success, message, error } = result;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/login');
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
                                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img2.webp"
                                        alt="signup form"
                                        className="img-fluid"
                                        style={{ borderRadius: '1rem 0 0 1rem' }}
                                    />
                                </div>
                                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                    <div className="card-body p-4 p-lg-5 text-black">
                                        <form onSubmit={handleSignup}>
                                            <div className="d-flex align-items-center mb-3 pb-1">
                                                <i className="fas fa-user-plus fa-2x me-3" ></i>
                                                <span className="h3 fw-bold mb-0">Sign Up</span>
                                            </div>
                                            <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>
                                                Create a new account
                                            </h5>
                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="form2Example17">Name</label>
                                                <input
                                                    type="text"
                                                    id="form2Example17"
                                                    name="name"
                                                    className="form-control form-control-lg"
                                                    placeholder="Enter your name..."
                                                    value={signupInfo.name}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="form2Example27">Email address</label>
                                                <input
                                                    type="email"
                                                    id="form2Example27"
                                                    name="email"
                                                    className="form-control form-control-lg"
                                                    placeholder="Enter your email..."
                                                    value={signupInfo.email}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="form2Example37">Password</label>
                                                <input
                                                    type="password"
                                                    id="form2Example37"
                                                    name="password"
                                                    className="form-control form-control-lg"
                                                    placeholder="Enter your password..."
                                                    value={signupInfo.password}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="pt-1 mb-4">
                                                <button
                                                    className="btn btn-dark btn-lg btn-block"
                                                    type="submit"
                                                >
                                                    Signup
                                                </button>
                                            </div>
                                            <p className="mb-5 pb-lg-2" >
                                                Already have an account? <Link to="/login" style={{ color: '#007bff' }}>Login here</Link>
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

export default Signup;
