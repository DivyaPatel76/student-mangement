// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import { handleError, handleSuccess } from '../../utils.js';
// // import "../css/loginSignup.css"; // Add this if you have specific styles

// function StudentSignup() {
//     const [signupInfo, setSignupInfo] = useState({
//         rollno: '',
//         name: '',
//         class: '',
//         age: '',
//         address: '',
//         contactNumber: '',
//         email: '',
//         password: ''
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
//         const { rollno, name, class: studentClass, age, address, contactNumber, email, password } = signupInfo;
//         if (!rollno || !name || !studentClass || !age || !address || !contactNumber || !email || !password) {
//             return handleError('All fields are required');
//         }
//         try {
//             const url = 'http://localhost:8080/students/signup'; // URL for student signup
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
//                     navigate('/student/login'); // Redirect to student login page
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
//             <h1>Student Signup</h1>
//             <form onSubmit={handleSignup}>
//                 <div>
//                     <label htmlFor='rollno'>Roll Number</label>
//                     <input
//                         onChange={handleChange}
//                         type='text'
//                         name='rollno'
//                         autoFocus
//                         placeholder='Enter your roll number...'
//                         value={signupInfo.rollno}
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor='name'>Name</label>
//                     <input
//                         onChange={handleChange}
//                         type='text'
//                         name='name'
//                         placeholder='Enter your name...'
//                         value={signupInfo.name}
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor='class'>Class</label>
//                     <input
//                         onChange={handleChange}
//                         type='text'
//                         name='class'
//                         placeholder='Enter your class...'
//                         value={signupInfo.class}
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor='age'>Age</label>
//                     <input
//                         onChange={handleChange}
//                         type='number'
//                         name='age'
//                         placeholder='Enter your age...'
//                         value={signupInfo.age}
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
//                     <label htmlFor='contactNumber'>Contact Number</label>
//                     <input
//                         onChange={handleChange}
//                         type='text'
//                         name='contactNumber'
//                         placeholder='Enter your contact number...'
//                         value={signupInfo.contactNumber}
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
//                 <span>Already have an account?
//                     <Link to="/student/login">Login</Link>
//                 </span>
//             </form>
//             <ToastContainer />
//         </div>
//     );
// }

// export default StudentSignup;
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { handleError, handleSuccess } from '../../utils.js';

function StudentSignup() {
    const [signupInfo, setSignupInfo] = useState({
        rollno: '',
        name: '',
        class: '',
        age: '',
        address: '',
        contactNumber: '',
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
        const { rollno, name, class: studentClass, age, address, contactNumber, email, password } = signupInfo;
        if (!rollno || !name || !studentClass || !age || !address || !contactNumber || !email || !password) {
            return handleError('All fields are required');
        }
        try {
            const url = 'http://localhost:8080/students/signup'; // URL for student signup
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
                    navigate('/student/login'); // Redirect to student login page
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
                    <div className="col-md-8 col-lg-6 col-xl-5">
                        <div className="card" style={{ borderRadius: '1rem' }}>
                            <div className="card-body p-4 p-lg-5 text-black">
                                <h1 className="text-center mb-4">Student Signup</h1>

                                <form onSubmit={handleSignup}>
                                    <div className="form-outline mb-1">
                                        <label className="form-label" htmlFor="rollno">Roll Number</label>
                                        <input
                                            onChange={handleChange}
                                            type='text'
                                            id='rollno'
                                            name='rollno'
                                            className="form-control form-control-lg"
                                            placeholder='Enter your roll number...'
                                            value={signupInfo.rollno}
                                            autoFocus
                                        />
                                    </div>
                                    <div className="form-outline mb-1">
                                        <label className="form-label" htmlFor="name">Name</label>
                                        <input
                                            onChange={handleChange}
                                            type='text'
                                            id='name'
                                            name='name'
                                            className="form-control form-control-lg"
                                            placeholder='Enter your name...'
                                            value={signupInfo.name}
                                        />
                                    </div>
                                    <div className="form-outline mb-1">
                                        <label className="form-label" htmlFor="class">Class</label>
                                        <input
                                            onChange={handleChange}
                                            type='text'
                                            id='class'
                                            name='class'
                                            className="form-control form-control-lg"
                                            placeholder='Enter your class...'
                                            value={signupInfo.class}
                                        />
                                    </div>
                                    <div className="form-outline mb-1">
                                        <label className="form-label" htmlFor="age">Age</label>
                                        <input
                                            onChange={handleChange}
                                            type='number'
                                            id='age'
                                            name='age'
                                            className="form-control form-control-lg"
                                            placeholder='Enter your age...'
                                            value={signupInfo.age}
                                        />
                                    </div>
                                    <div className="form-outline mb-1">
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
                                    <div className="form-outline mb-1">
                                        <label className="form-label" htmlFor="contactNumber">Contact Number</label>
                                        <input
                                            onChange={handleChange}
                                            type='text'
                                            id='contactNumber'
                                            name='contactNumber'
                                            className="form-control form-control-lg"
                                            placeholder='Enter your contact number...'
                                            value={signupInfo.contactNumber}
                                        />
                                    </div>
                                    <div className="form-outline mb-1">
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
                                    <div className="form-outline mb-1">
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
                                    <div className="pt-1 mb-1">
                                        <button
                                            className="btn btn-dark btn-lg btn-block"
                                            type='submit'
                                        >
                                            Signup
                                        </button>
                                    </div>
                                    <p className="text-center">
                                        Already have an account? <Link to="/student/login" className="text-primary">Login</Link>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </section>
    );
}

export default StudentSignup;
