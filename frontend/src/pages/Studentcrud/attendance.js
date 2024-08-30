
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';

const Attendance = () => {
    const [className, setClassName] = useState('');
    const [students, setStudents] = useState([]);
    const [attendance, setAttendance] = useState({});
    const [presentCount, setPresentCount] = useState(0);
    const [absentCount, setAbsentCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (className) {
            fetchStudents();
        }
    }, [className]);

    const fetchStudents = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch(`http://localhost:8080/attendance/students/${className}`);
            const result = await response.json();
            if (response.ok && result.success) {
                setStudents(result.students);
                setAttendance(result.students.reduce((acc, student) => ({
                    ...acc,
                    [student.rollno]: 'Absent' // Default to absent
                }), {}));
                setError('');
            } else {
                setError(result.message || 'Failed to fetch students');
                setStudents([]);
            }
        } catch (error) {
            setError('Internal server error');
            setStudents([]);
        } finally {
            setLoading(false);
        }
    };

    const handleChangeStatus = (rollno, status) => {
        setAttendance(prevState => ({
            ...prevState,
            [rollno]: status
        }));
    };

    const handleSubmit = async () => {
        try {
            const studentsWithStatus = students.map(student => ({
                rollno: student.rollno,
                name: student.name,
                status: attendance[student.rollno]
            }));

            const response = await fetch('http://localhost:8080/attendance/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ className, students: studentsWithStatus })
            });

            const result = await response.json();
            if (response.ok && result.success) {
                setPresentCount(result.presentCount);
                setAbsentCount(result.absentCount);
                toast.success('Attendance submitted successfully');
                setError('');
            } else {
                toast.error(result.message || 'Failed to submit attendance');
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
                        <h4 className="mb-0">Attendance Management</h4>
                    </div>
                    
                    <div className="card-body">
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Class Name"
                                    value={className}
                                    onChange={(e) => setClassName(e.target.value)}
                                /> 
                            </div>
                        </div>
                        {loading && <p className="text-center">Loading...</p>}
                        {error && <p className="text-danger text-center">{error}</p>}
                        {students.length > 0 ? (
                            <>
                                <table className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>Roll Number</th>
                                            <th>Name</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {students.map((student) => (
                                            <tr key={student.rollno}>
                                                <td>{student.rollno}</td>
                                                <td>{student.name}</td>
                                                <td>
                                                    <div className="form-check form-check-inline">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name={student.rollno}
                                                            value="Present"
                                                            checked={attendance[student.rollno] === 'Present'}
                                                            onChange={() => handleChangeStatus(student.rollno, 'Present')}
                                                        />
                                                        <label className="form-check-label">Present</label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name={student.rollno}
                                                            value="Absent"
                                                            checked={attendance[student.rollno] === 'Absent'}
                                                            onChange={() => handleChangeStatus(student.rollno, 'Absent')}
                                                        />
                                                        <label className="form-check-label">Absent</label>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="mt-3">
                                    <button onClick={handleSubmit} className="btn btn-dark">Submit Attendance</button>
                                    <div className="mt-3">
                                        <p><strong>Present:</strong> {presentCount}</p>
                                        <p><strong>Absent:</strong> {absentCount}</p>
                                    </div>
                                </div>
                            </>
                        ) : (
                            !loading && <p className="text-center">No students found for this class.</p>
                        )}
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Attendance;
