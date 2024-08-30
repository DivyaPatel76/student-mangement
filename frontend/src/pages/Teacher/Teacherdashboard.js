import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap-icons/font/bootstrap-icons.css'; 

function Teacherdashboard() {
  return (
    <>
      {/* Main content */}
      <div className="container-fluid mt-5">
        <h1 className="mb-4 text-center" >Welcome to the Teacher Dashboard</h1>
        <h3 className="mb-4 text-center">This area can be used to display important information or features relevant to teachers.</h3>
        
        <div className="row mt-5">
    
        {/* Student CRUD */}
          <div className="col-md-6 col-lg-3 mb-4">
            <div className="card text-center shadow-sm border-success">
              <div className="card-body">
                <i className="bi bi-person" style={{ fontSize: '40px', color: '#28a745' }}></i>
                <h5 className="card-title mt-3">Student CRUD</h5>
                <p className="card-text">student details with create,read,update,and delete options.</p>
                <Link to="/studentCrud" className="btn btn-success">Go to CRUD</Link>
              </div>
            </div>
          </div>

          {/* Attendance */}
          <div className="col-md-6 col-lg-3 mb-4">
            <div className="card text-center shadow-sm border-danger">
              <div className="card-body">
                <i className="bi bi-calendar-check" style={{ fontSize: '40px', color: '#dc3545' }}></i>
                <h5 className="card-title mt-3">Attendance</h5>
                <p className="card-text">Track and record student attendance.</p>
                <Link to="/Attendance" className="btn btn-danger">Go to Attendance</Link>
              </div>
            </div>
          </div>

          {/* Grade */}
          <div className="col-md-6 col-lg-3 mb-4">
            <div className="card text-center shadow-sm border-primary">
              <div className="card-body">
                <i className="bi bi-bar-chart" style={{ fontSize: '40px', color: '#007bff' }}></i>
                <h5 className="card-title mt-3">Grade</h5>
                <p className="card-text">Manage and update student grades.</p>
                <Link to="/Grade" className="btn btn-primary">Go to Grades</Link>
              </div>
            </div>
          </div>

          {/* Report */}
          <div className="col-md-6 col-lg-3 mb-4">
            <div className="card text-center shadow-sm border-secondary">
              <div className="card-body">
                <i className="bi bi-file-earmark-text" style={{ fontSize: '40px', color: '#6c757d' }}></i>
                <h5 className="card-title mt-3">Report</h5>
                <p className="card-text">Generate and view various reports.</p>
                <Link to="/Report" className="btn btn-secondary">Go to Reports</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Teacherdashboard;
