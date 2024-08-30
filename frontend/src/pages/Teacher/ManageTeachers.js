import React, { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const ManageTeachers = () => {
    const [teachers, setTeachers] = useState([]);
    const [teacherToEdit, setTeacherToEdit] = useState(null);
    const [searchEmail, setSearchEmail] = useState("");

    // Form field references
    const nameInput = useRef();
    const emailInput = useRef();
    const passwordInput = useRef();
    const addressInput = useRef();
    const salaryInput = useRef();

    useEffect(() => {
        fetchTeachers();
    }, []);

    // Fetch teachers from the server
    const fetchTeachers = async () => {
        try {
            const response = await fetch('http://localhost:8080/teachers');
            const result = await response.json();
            if (result.success) {
                setTeachers(result.teachers);
            } else {
                toast.error(result.message || 'Failed to fetch teachers');
            }
        } catch (error) {
            console.error("Error fetching teachers:", error);
            toast.error('Internal server error');
        }
    };

    // Add a new teacher
    const handleAddTeacher = async () => {
        const teacher = {
            name: nameInput.current.value,
            email: emailInput.current.value,
            password: passwordInput.current.value,
            address: addressInput.current.value,
            salary: salaryInput.current.value,
        };

        try {
            const response = await fetch('http://localhost:8080/teachers/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(teacher),
            });
            const result = await response.json();
            if (result.success) {
                toast.success('Teacher added successfully');
                fetchTeachers();
                clearForm();
            } else {
                toast.error(result.message || 'Failed to add teacher');
            }
        } catch (error) {
            console.error("Error adding teacher:", error);
            toast.error('Internal server error');
        }
    };

    // Edit a teacher
    const handleEditTeacher = async () => {
        if (teacherToEdit) {
            const updatedTeacher = {
                name: nameInput.current.value,
                address: addressInput.current.value,
                salary: salaryInput.current.value,
            };

            try {
                const response = await fetch(`http://localhost:8080/teachers/${teacherToEdit._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedTeacher),
                });
                const result = await response.json();
                if (result.success) {
                    toast.success('Teacher updated successfully');
                    fetchTeachers();
                    setTeacherToEdit(null);
                    clearForm();
                } else {
                    toast.error(result.message || 'Failed to update teacher');
                }
            } catch (error) {
                console.error("Error updating teacher:", error);
                toast.error('Internal server error');
            }
        }
    };

    // Delete a teacher
    const handleDeleteTeacher = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/teachers/${id}`, {
                method: 'DELETE',
            });
            const result = await response.json();
            if (result.success) {
                toast.success('Teacher deleted successfully');
                fetchTeachers();
            } else {
                toast.error(result.message || 'Failed to delete teacher');
            }
        } catch (error) {
            console.error("Error deleting teacher:", error);
            toast.error('Internal server error');
        }
    };

    // Set the form for editing
    const handleEditButtonClick = (teacher) => {
        setTeacherToEdit(teacher);
        nameInput.current.value = teacher.name;
        emailInput.current.value = teacher.email;
        addressInput.current.value = teacher.address;
        salaryInput.current.value = teacher.salary;
        passwordInput.current.value = ""; // Clear password input
    };

    // Search by email
    const handleSearch = (e) => {
        setSearchEmail(e.target.value);
    };

    // Clear the form
    const clearForm = () => {
        nameInput.current.value = "";
        emailInput.current.value = "";
        addressInput.current.value = "";
        salaryInput.current.value = "";
        passwordInput.current.value = "";
    };

    // Filter teachers by email
    const filteredTeachers = teachers.filter(teacher =>
        teacher.email.toLowerCase().includes(searchEmail.toLowerCase())
    );

    return (
        <>
            <div className="container-fluid mt-3" style={{ backgroundColor: '#FCF6F5' }}>
                <div className="container mt-2 mb-2" style={{ backgroundColor: '#FCF6F5' }}>
                    <h3 className="mb-4 text-center">Add or Edit Teacher</h3>
                    <div className="row">
                        <div className="col-md-4">
                            <input ref={nameInput} type="text" className="form-control mb-2" placeholder="Name" />
                        </div>
                        <div className="col-md-4">
                            <input ref={emailInput} type="email" className="form-control mb-2" placeholder="Email" />
                        </div>
                        <div className="col-md-4">
                            <input ref={passwordInput} type="password" className="form-control mb-2" placeholder="Password" />
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-md-4">
                            <input ref={addressInput} type="text" className="form-control mb-2" placeholder="Address" />
                        </div>
                        <div className="col-md-4">
                            <input ref={salaryInput} type="number" className="form-control mb-2" placeholder="Salary" />
                        </div>
                        <div className="col-md-4 d-flex align-items-end">
                            <button onClick={handleAddTeacher} className="btn btn-success me-2">Add Teacher</button>
                            {teacherToEdit && <button onClick={handleEditTeacher} className="btn btn-primary">Update Teacher</button>}
                        </div>
                    </div>
                    <h3 className="mt-4 mb-3 text-center">Search Teacher</h3>
                    <div className="row mt-2">
                        <div className="col-md-12">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by Email"
                                value={searchEmail}
                                onChange={handleSearch}
                            />
                        </div>
                    </div>
                </div>
                <h3 className="mb-4 text-center mt-4">All Teacher List</h3>
                <div className="container mt-4">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>Salary</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTeachers.map((teacher, index) => (
                                <tr key={teacher._id}>
                                    <td>{index + 1}</td>
                                    <td>{teacher.name}</td>
                                    <td>{teacher.email}</td>
                                    <td>{teacher.address}</td>
                                    <td>{teacher.salary}</td>
                                    <td>
                                        <button
                                            onClick={() => handleEditButtonClick(teacher)}
                                            className="btn btn-warning me-2"
                                        >
                                            <i className="bi bi-pencil"></i> Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteTeacher(teacher._id)}
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

export default ManageTeachers;
