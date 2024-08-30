// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import { handleError,handleSuccess } from '../../utils.js';
// // import "../css/loginSignup.css"; 

// function TeacherSignup() {
//     const [signupInfo, setSignupInfo] = useState({
//         name: '',
//         email: '',
//         password: '',
//         address: '',   
//         salary: ''     
//     });

//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setSignupInfo(prevState => ({
//             ...prevState,
//             [name]: value
//         }));
//     };

//     const handleSignup = async (e) => {
//         e.preventDefault();
//         const { name, email, password, address, salary } = signupInfo;
//         if (!name || !email || !password || !address || !salary) {
//             return handleError('All fields are required');
//         }
//         try {
//             const url = 'http://localhost:8080/teachers/signup'; 
//             const response = await fetch(url, {
//                 method: 'POST',
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
//                     navigate('/teacher/login'); // Redirect to teacher login page
//                 }, 1000);
//             } else if (error) {
//                 const details = error?.details[0]?.message;
//                 handleError(details);
//             } else if (!success) {
//                 handleError(message);
//             }
//             console.log(result);
//         } catch (err) {
//             handleError(err);
//         }
//     };

//     return (
//         <div className='container'>
//             <h1>Teacher Signup</h1>
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
//                 <div>
//                     <label htmlFor='address'>Address</label>
//                     <input
//                         onChange={handleChange}
//                         type='text'
//                         name='address'
//                         placeholder='Enter your address...'
//                         value={signupInfo.address}
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor='salary'>Salary</label>
//                     <input
//                         onChange={handleChange}
//                         type='number'
//                         name='salary'
//                         placeholder='Enter your salary...'
//                         value={signupInfo.salary}
//                     />
//                 </div>
//                 <button type='submit'>Signup</button>
//                 <span>Already have an account?
//                     <Link to="/teacher/login">Login</Link>
//                 </span>
//             </form>
//             <ToastContainer />
//         </div>
//     );
// }

// export default TeacherSignup;
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import { handleError, handleSuccess } from '../../utils.js';

function TeacherSignup() {
    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: '',
        address: '',
        salary: ''
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
        const { name, email, password, address, salary } = signupInfo;
        if (!name || !email || !password || !address || !salary) {
            return handleError('All fields are required');
        }
        try {
            const url = 'http://localhost:8080/teachers/signup';
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
                    navigate('/teacher/login'); // Redirect to teacher login page
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
            <div className="container py-4 h-100">
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
                                    <div className="card-body p-3 p-lg-5 text-black">
                                        <h1 className="text-center mb-0">Teacher Signup</h1>
                                        <form onSubmit={handleSignup}>
                                            <div className="form-outline mb-2">
                                                <label className="form-label" htmlFor="name">Name</label>
                                                <input
                                                    onChange={handleChange}
                                                    type='text'
                                                    id='name'
                                                    name='name'
                                                    className="form-control form-control-lg"
                                                    placeholder='Enter your name...'
                                                    value={signupInfo.name}
                                                    autoFocus
                                                />
                                            </div>
                                            <div className="form-outline mb-2">
                                                <label className="form-label" htmlFor="email">Email</label>
                                                <input
                                                    onChange={handleChange}
                                                    type='email'
                                                    id='email'
                                                    name='email'
                                                    className="form-control form-control-lg"
                                                    placeholder='Enter your email...'
                                                    value={signupInfo.email}
                                                />
                                            </div>
                                            <div className="form-outline mb-2">
                                                <label className="form-label" htmlFor="password">Password</label>
                                                <input
                                                    onChange={handleChange}
                                                    type='password'
                                                    id='password'
                                                    name='password'
                                                    className="form-control form-control-lg"
                                                    placeholder='Enter your password...'
                                                    value={signupInfo.password}
                                                />
                                            </div>
                                            <div className="form-outline mb-2">
                                                <label className="form-label" htmlFor="address">Address</label>
                                                <input
                                                    onChange={handleChange}
                                                    type='text'
                                                    id='address'
                                                    name='address'
                                                    className="form-control form-control-lg"
                                                    placeholder='Enter your address...'
                                                    value={signupInfo.address}
                                                />
                                            </div>
                                            <div className="form-outline mb-2">
                                                <label className="form-label" htmlFor="salary">Salary</label>
                                                <input
                                                    onChange={handleChange}
                                                    type='number'
                                                    id='salary'
                                                    name='salary'
                                                    className="form-control form-control-lg"
                                                    placeholder='Enter your salary...'
                                                    value={signupInfo.salary}
                                                />
                                            </div>
                                            <div className="pt-1 mb-0">
                                                <button
                                                    className="btn btn-dark btn-lg btn-block"
                                                    type='submit'
                                                >
                                                    Signup
                                                </button>
                                            </div>
                                            <p className="text-center">
                                                Already have an account? <Link to="/teacher/login" className="text-primary">Login</Link>
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

export default TeacherSignup;
