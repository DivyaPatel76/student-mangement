
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import { handleError, handleSuccess } from '../utils.js';

function Login() {
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
            const url = 'http://localhost:8080/auth/login';
            const response = await fetch(url, {
                method: "POST",
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
                const details = error?.details[0].message;
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
                                            <i class="fas fa-graduation-cap" ></i>
                                                <span className="h3 fw-bold mb-0">Admin Login</span>
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
                                            {/* <a className="small text-muted" href="#!">Forgot password?</a> */}
                                            <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>
                                                Don't have an account? <Link to="/signup" style={{ color: '#393f81' }}>Register here</Link>
                                            </p>
                                            {/* <a href="#!" className="small text-muted">Terms of use.</a>
                                            <a href="#!" className="small text-muted">Privacy policy</a> */}
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

export default Login;
