import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';

const Grade = () => {
    const [rollno, setRollno] = useState('');
    const [student, setStudent] = useState(null);
    const [subjects, setSubjects] = useState([{ subject: '', grade: '' }]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchStudent = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch(`http://localhost:8080/grades/student/${rollno}`);
            const result = await response.json();
            if (response.ok && result.success) {
                setStudent(result.student);
                setError('');
            } else {
                setError(result.message || 'Failed to fetch student details');
                setStudent(null);
            }
        } catch (error) {
            setError('Internal server error');
            setStudent(null);
        } finally {
            setLoading(false);
        }
    };

    const handleSubjectChange = (index, field, value) => {
        const newSubjects = [...subjects];
        newSubjects[index][field] = value;
        setSubjects(newSubjects);
    };

    const handleAddSubject = () => {
        setSubjects([...subjects, { subject: '', grade: '' }]);
    };

    const handleRemoveSubject = (index) => {
        const newSubjects = subjects.filter((_, i) => i !== index);
        setSubjects(newSubjects);
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:8080/grades/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ rollno, subjects })
            });

            const result = await response.json();
            if (response.ok && result.success) {
                toast.success('Grades submitted successfully');
                setError('');
            } else {
                toast.error(result.message || 'Failed to submit grades');
            }
        } catch (error) {
            toast.error('Internal server error');
        }
    };

    return (
        <div className="container-fluid min-vh-100 bg-light">
            <div className="container mt-4">
                <div className="card shadow-sm">
                    <div className="card-header  text-white"style={{ backgroundColor: '#ab3b3b' }}>
                        <h4 className="mb-0">Grade Management</h4>
                    </div>
                    <div className="card-body">
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Roll Number"
                                        value={rollno}
                                        onChange={(e) => setRollno(e.target.value)}
                                    />
                                    <button 
                                        onClick={fetchStudent} 
                                        className="btn btn-dark"
                                    >
                                        Fetch Student
                                    </button>
                                </div>
                            </div>
                        </div>
                        {loading && <p className="text-center">Loading...</p>}
                        {error && <p className="text-danger text-center">{error}</p>}
                        {student && (
                            <div>
                                <h4 className="mb-4">Student Details</h4>
                                <p><strong>Name:</strong> {student.name}</p>
                                <p><strong>Class:</strong> {student.class}</p>
                                <h5 className="mt-4">Enter Grades</h5>
                                {subjects.map((subject, index) => (
                                    <div key={index} className="mb-3 border p-3 rounded bg-white shadow-sm">
                                        <div className="row">
                                            <div className="col-md-5">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Subject Name"
                                                    value={subject.subject}
                                                    onChange={(e) => handleSubjectChange(index, 'subject', e.target.value)}
                                                />
                                            </div>
                                            <div className="col-md-5">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Grade"
                                                    value={subject.grade}
                                                    onChange={(e) => handleSubjectChange(index, 'grade', e.target.value)}
                                                />
                                            </div>
                                            <div className="col-md-2 d-flex align-items-center">
                                                <button
                                                    className="btn btn-danger w-100"
                                                    onClick={() => handleRemoveSubject(index)}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className="d-flex justify-content-between">
                                    <button 
                                        onClick={handleAddSubject} 
                                        className="btn btn-secondary"
                                    >
                                        Add Subject
                                    </button>
                                    <button 
                                        onClick={handleSubmit} 
                                        className="btn btn-dark"
                                    >
                                        Submit Grades
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Grade;
