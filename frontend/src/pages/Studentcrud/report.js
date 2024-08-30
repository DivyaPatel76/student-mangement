import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';

const Report = () => {
    const [rollno, setRollno] = useState('');
    const [student, setStudent] = useState(null);
    const [grades, setGrades] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchStudentAndGrades = async () => {
        setLoading(true);
        setError('');
        try {
            const studentResponse = await fetch(`http://localhost:8080/reports/student/${rollno}`);
            const studentResult = await studentResponse.json();
            if (studentResponse.ok && studentResult.success) {
                setStudent(studentResult.student);
                setGrades(studentResult.grades);
                setError('');
            } else {
                setError(studentResult.message || 'Failed to fetch student details');
                setStudent(null);
                setGrades([]);
            }
        } catch (error) {
            setError('Internal server error');
            setStudent(null);
            setGrades([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:8080/reports/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ rollno, student, grades })
            });

            const result = await response.json();
            if (response.ok && result.success) {
                toast.success('Report submitted successfully');
                setError('');
            } else {
                toast.error(result.message || 'Failed to submit report');
            }
        } catch (error) {
            toast.error('Internal server error');
        }
    };

    return (
        <div className="container-fluid min-vh-100 bg-light">
            <div className="container mt-4">
                <div className="card shadow-sm">
                    <div className="card-header  text-white" style={{ backgroundColor: '#ab3b3b' }}>
                        <h4 className="mb-0">Student Report</h4>
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
                                        onClick={fetchStudentAndGrades} 
                                        className="btn btn-dark"
                                    >
                                        Fetch Details
                                    </button>
                                </div>
                            </div>
                        </div>
                        {loading && <p className="text-center">Loading...</p>}
                        {error && <p className="text-danger text-center">{error}</p>}
                        {student && (
                            <div>
                                <h4 className="mb-4">Student Details</h4>
                                <div className="mb-3">
                                    <p><strong>Name:</strong> {student.name}</p>
                                    <p><strong>Roll Number:</strong> {student.rollno}</p>
                                    <p><strong>Class:</strong> {student.class}</p>
                                    <p><strong>Address:</strong> {student.address}</p>
                                    <p><strong>Contact Number:</strong> {student.contactNumber}</p>
                                </div>
                                <h5 className="mt-4 mb-3">Grades</h5>
                                <div className="table-responsive">
                                    <table className="table table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th>Subject</th>
                                                <th>Grade</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {grades.map((grade, index) => (
                                                <tr key={index}>
                                                    <td>{grade.subject}</td>
                                                    <td>{grade.grade}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <button 
                                    onClick={handleSubmit} 
                                    className="btn btn-dark mt-3"
                                >
                                    Submit Report
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Report;
