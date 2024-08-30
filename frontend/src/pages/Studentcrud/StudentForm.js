import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; // For notifications
import 'react-toastify/dist/ReactToastify.css'; // For toast styles

function StudentForm() {
    const [studentInfo, setStudentInfo] = useState({
        rollno: '',
        name: '',
        age: '',
        class: '',
        address: '',
        contactNumber: '',
        email: '',
        password: ''
    });
    const [isEdit, setIsEdit] = useState(false); // Flag to determine if we are editing
    const { rollno } = useParams(); // Roll number from URL params
    const navigate = useNavigate();

    useEffect(() => {
        if (rollno) {
            setIsEdit(true); // Set edit mode
            fetchStudentData(rollno);
        }
    }, [rollno]);

    const fetchStudentData = async (rollno) => {
        try {
            const url = `http://localhost:8080/students/${rollno}`; // URL to fetch student data
            const response = await fetch(url);
            const result = await response.json();
            const { success, student, error } = result;
            if (success) {
                setStudentInfo(student);
            } else if (error) {
                toast.error(error?.details[0]?.message || 'Error fetching student data');
            } else {
                toast.error('Error fetching student data');
            }
        } catch (error) {
            toast.error('Error fetching student data');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudentInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = isEdit ? `http://localhost:8080/students/${studentInfo.rollno}` : 'http://localhost:8080/students/signup';
        const method = isEdit ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(studentInfo)
            });
            const result = await response.json();
            const { success, message, error } = result;
            if (success) {
                toast.success(message);
                setTimeout(() => {
                    navigate('/students'); // Redirect to student list page
                }, 1000);
            } else if (error) {
                toast.error(error?.details[0]?.message || message);
            } else {
                toast.error(message);
            }
        } catch (err) {
            toast.error('Error saving student data');
        }
    };

    return (
        <div className='container'>
            <h1>{isEdit ? 'Edit Student' : 'Add Student'}</h1>
            <form onSubmit={handleSubmit}>
                {/* Roll Number input */}
                {!isEdit && (
                    <div>
                        <label htmlFor='rollno'>Roll Number</label>
                        <input
                            onChange={handleChange}
                            type='text'
                            name='rollno'
                            placeholder='Enter roll number...'
                            value={studentInfo.rollno}
                            required
                        />
                    </div>
                )}

                {/* Name input */}
                <div>
                    <label htmlFor='name'>Name</label>
                    <input
                        onChange={handleChange}
                        type='text'
                        name='name'
                        placeholder='Enter name...'
                        value={studentInfo.name}
                        required
                    />
                </div>

                {/* Age input */}
                <div>
                    <label htmlFor='age'>Age</label>
                    <input
                        onChange={handleChange}
                        type='number'
                        name='age'
                        placeholder='Enter age...'
                        value={studentInfo.age}
                        required
                    />
                </div>

                {/* Class input */}
                <div>
                    <label htmlFor='class'>Class</label>
                    <input
                        onChange={handleChange}
                        type='text'
                        name='class'
                        placeholder='Enter class...'
                        value={studentInfo.class}
                        required
                    />
                </div>

                {/* Address input */}
                <div>
                    <label htmlFor='address'>Address</label>
                    <input
                        onChange={handleChange}
                        type='text'
                        name='address'
                        placeholder='Enter address...'
                        value={studentInfo.address}
                        required
                    />
                </div>

                {/* Contact Number input */}
                <div>
                    <label htmlFor='contactNumber'>Contact Number</label>
                    <input
                        onChange={handleChange}
                        type='text'
                        name='contactNumber'
                        placeholder='Enter contact number...'
                        value={studentInfo.contactNumber}
                        required
                    />
                </div>

                {/* Email input */}
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        onChange={handleChange}
                        type='email'
                        name='email'
                        placeholder='Enter email...'
                        value={studentInfo.email}
                        required
                    />
                </div>

                {/* Password input */}
                {!isEdit && (
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input
                            onChange={handleChange}
                            type='password'
                            name='password'
                            placeholder='Enter password...'
                            value={studentInfo.password}
                            required
                        />
                    </div>
                )}

                {/* Submit button */}
                <button type='submit'>
                    {isEdit ? 'Update' : 'Save'}
                </button>
            </form>
            <ToastContainer />
        </div>
    );
}

export default StudentForm;
