import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';

const SeeReport = () => {
    const [rollno, setRollno] = useState('');
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchReport = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch(`http://localhost:8080/reports/student/${rollno}`);
            const result = await response.json();
            if (response.ok && result.success) {
                setReport(result);
                setError('');
            } else {
                setError(result.message || 'Failed to fetch report');
                setReport(null);
            }
        } catch (error) {
            setError('Internal server error');
            setReport(null);
        } finally {
            setLoading(false);
        }
    };

    const generatePDF = () => {
        if (!report) return;

        const doc = new jsPDF();
        doc.text(`Name: ${report.student.name}`, 10, 10);
        doc.text(`Roll Number: ${report.student.rollno}`, 10, 20);
        doc.text(`Class: ${report.student.class}`, 10, 30);
        doc.text(`Address: ${report.student.address}`, 10, 40);
        doc.text(`Contact Number: ${report.student.contactNumber}`, 10, 50);

        doc.text('Grades:', 10, 60);
        report.grades.forEach((grade, index) => {
            doc.text(`${grade.subject}: ${grade.grade}`, 10, 70 + (index * 10));
        });

        doc.save('report.pdf');
    };

    const generateExcel = () => {
        if (!report) return;

        const ws = XLSX.utils.json_to_sheet([
            { ...report.student, '': '' },
            ...report.grades.map(grade => ({ Subject: grade.subject, Grade: grade.grade }))
        ]);

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Report');
        const wbout = XLSX.write(wb, { type: 'array', bookType: 'xlsx' });

        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'report.xlsx');
    };

    return (
        <div className="container mt-4">
            <div className="card shadow-sm">
                <div className="card-header text-white " style={{ backgroundColor: '#ab3b3b' }}>
                    <h4 className="mb-0">View Report</h4>
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
                                    onClick={fetchReport} 
                                    className="btn btn-dark"
                                >
                                    Fetch Report
                                </button>
                            </div>
                        </div>
                    </div>
                    {loading && <p className="text-center">Loading...</p>}
                    {error && <p className="text-danger text-center">{error}</p>}
                    {report && (
                        <div>
                            <h4 className="mb-4 text-center"> School Of management</h4>
                            <div className="mb-4">
                                <p><strong>Name:</strong> {report.student.name}</p>
                                <p><strong>Roll Number:</strong> {report.student.rollno}</p>
                                <p><strong>Class:</strong> {report.student.class}</p>
                                <p><strong>Address:</strong> {report.student.address}</p>
                                <p><strong>Contact Number:</strong> {report.student.contactNumber}</p>
                            </div>
                            <h5 className="mb-3">Grades</h5>
                            <div className="table-responsive">
                                <table className="table table-bordered table-hover">
                                    <thead>
                                        <tr>
                                            <th>Subject</th>
                                            <th>Grade</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {report.grades.map((grade, index) => (
                                            <tr key={index}>
                                                <td>{grade.subject}</td>
                                                <td>{grade.grade}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="d-flex justify-content-end mt-3">
                                <button 
                                    onClick={generatePDF} 
                                    className="btn btn-secondary me-2"
                                >
                                    Download PDF
                                </button>
                                <button 
                                    onClick={generateExcel} 
                                    className="btn btn-secondary"
                                >
                                    Download Excel
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default SeeReport;
