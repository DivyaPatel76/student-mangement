import React, { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; 

const SeeReport = () => {
    const [students, setStudents] = useState([]);
    const [studentToEdit, setStudentToEdit] = useState(null);
    const [searchRollno, setSearchRollno] = useState("");

    // Form field references
    const rollInput = useRef();
    const nameInput = useRef();
    const classInput = useRef();
    const ageInput = useRef();
    const addressInput = useRef();
    const contactInput = useRef();
    const emailInput = useRef();
    const passwordInput = useRef();

    useEffect(() => {
        fetchStudents();
    }, []);

    // Fetch students from the server
    const fetchStudents = async () => {
        try {
            const response = await fetch('http://localhost:8080/students');
            const result = await response.json();
            if (result.success) {
                setStudents(result.students);
            } else {
                toast.error(result.message || 'Failed to fetch students');
            }
        } catch (error) {
            console.error("Error fetching students:", error);
            toast.error('Internal server error');
        }
    };

    // Add a new student
    const handleAddStudent = async () => {
        const student = {
            rollno: rollInput.current.value,
            name: nameInput.current.value,
            class: classInput.current.value,
            age: ageInput.current.value,
            address: addressInput.current.value,
            contactNumber: contactInput.current.value,
            email: emailInput.current.value,
            password: passwordInput.current.value,
        };

        try {
            const response = await fetch('http://localhost:8080/students/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(student),
            });
            const result = await response.json();
            if (result.success) {
                toast.success('Student added successfully');
                fetchStudents();
                clearForm();
            } else {
                toast.error(result.message || 'Failed to add student');
            }
        } catch (error) {
            console.error("Error adding student:", error);
            toast.error('Internal server error');
        }
    };

    // Edit a student
    const handleEditStudent = async () => {
        if (studentToEdit) {
            const updatedStudent = {
                name: nameInput.current.value,
                class: classInput.current.value,
                age: ageInput.current.value,
                address: addressInput.current.value,
                contactNumber: contactInput.current.value,
            };

            try {
                const response = await fetch(`http://localhost:8080/students/${studentToEdit.rollno}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedStudent),
                });
                const result = await response.json();
                if (result.success) {
                    toast.success('Student updated successfully');
                    fetchStudents();
                    setStudentToEdit(null);
                    clearForm();
                } else {
                    toast.error(result.message || 'Failed to update student');
                }
            } catch (error) {
                console.error("Error updating student:", error);
                toast.error('Internal server error');
            }
        }
    };

    // Delete a student
    const handleDeleteStudent = async (rollno) => {
        try {
            const response = await fetch(`http://localhost:8080/students/${rollno}`, {
                method: 'DELETE',
            });
            const result = await response.json();
            if (result.success) {
                toast.success('Student deleted successfully');
                fetchStudents();
            } else {
                toast.error(result.message || 'Failed to delete student');
            }
        } catch (error) {
            console.error("Error deleting student:", error);
            toast.error('Internal server error');
        }
    };

    // Set the form for editing
    const handleEditButtonClick = (student) => {
        setStudentToEdit(student);
        rollInput.current.value = student.rollno;
        nameInput.current.value = student.name;
        classInput.current.value = student.class;
        ageInput.current.value = student.age;
        addressInput.current.value = student.address;
        contactInput.current.value = student.contactNumber;
        emailInput.current.value = ""; // Clear email input
        passwordInput.current.value = ""; // Clear password input
    };

    // Search by roll number
    const handleSearch = (e) => {
        setSearchRollno(e.target.value);
    };

    // Clear the form
    const clearForm = () => {
        rollInput.current.value = "";
        nameInput.current.value = "";
        classInput.current.value = "";
        ageInput.current.value = "";
        addressInput.current.value = "";
        contactInput.current.value = "";
        emailInput.current.value = "";
        passwordInput.current.value = "";
    };

    // Filter students by roll number
    const filteredStudents = students.filter(student =>
        student.rollno.includes(searchRollno)
    );

    return (
        <>
            <div className="container-fluid mt-3" style={{ backgroundColor: '#FCF6F5' }}>
                <div className="container mt-2 mb-2 " style={{ backgroundColor: '#FCF6F5' }}>
                    <h3 className="mb-4 text-center">Add or Edit Student</h3>
                    <div className="row">
                        <div className="col-md-4">
                            <input ref={rollInput} type="text" className="form-control mb-2" placeholder="Roll Number" />
                        </div>
                        <div className="col-md-4">
                            <input ref={nameInput} type="text" className="form-control mb-2" placeholder="Name" />
                        </div>
                        <div className="col-md-4">
                            <input ref={classInput} type="text" className="form-control mb-2" placeholder="Class" />
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-md-4">
                            <input ref={ageInput} type="number" className="form-control mb-2" placeholder="Age" />
                        </div>
                        <div className="col-md-4">
                            <input ref={addressInput} type="text" className="form-control mb-2" placeholder="Address" />
                        </div>
                        <div className="col-md-4">
                            <input ref={contactInput} type="text" className="form-control mb-2" placeholder="Contact Number" />
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-md-4">
                            <input ref={emailInput} type="email" className="form-control mb-2" placeholder="Email" />
                        </div>
                        <div className="col-md-4">
                            <input ref={passwordInput} type="password" className="form-control mb-2" placeholder="Password" />
                        </div>
                        <div className="col-md-4 d-flex align-items-end">
                            <button onClick={handleAddStudent} className="btn btn-success me-2">Add Student</button>
                            {studentToEdit && <button onClick={handleEditStudent} className="btn btn-primary">Update Student</button>}
                        </div>
                    </div>
                    <h3 className="mt-4 mb-3 text-center">Search Student</h3>
                    <div className="row mt-2">
                        <div className="col-md-12">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by Roll Number"
                                value={searchRollno}
                                onChange={handleSearch}
                            />
                        </div>
                    </div>
                </div>
                <h3 className="mb-4 text-center mt-4">All Student List</h3>
                <div className="container mt-4">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Roll Number</th>
                                <th>Name</th>
                                <th>Class</th>
                                <th>Age</th>
                                <th>Address</th>
                                <th>Contact Number</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStudents.map((student, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{student.rollno}</td>
                                    <td>{student.name}</td>
                                    <td>{student.class}</td>
                                    <td>{student.age}</td>
                                    <td>{student.address}</td>
                                    <td>{student.contactNumber}</td>
                                    <td>{student.email}</td>
                                    <td>
                                        <button
                                            onClick={() => handleEditButtonClick(student)}
                                            className="btn btn-warning me-2"
                                        >
                                            <i className="bi bi-pencil"></i> Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteStudent(student.rollno)}
                                            className="btn btn-danger"
                                        >
                                            <i className="bi bi-trash"></i> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <ToastContainer />
            </div>
        </>
    );
}

export default SeeReport;
