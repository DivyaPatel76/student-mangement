
import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap-icons/font/bootstrap-icons.css'; 

function Studentdashboard() {
  return (
    <>
      {/* Header */}
      <header className="p-3 mb-4" style={{ backgroundColor: '#FCF6F5' }}>
        <div className="container text-center">
          <h1 className="mb-0">Student Dashboard</h1>
        </div>
      </header>
      
      {/* Main content */}
      <div className="container mt-5">
        <h2 className="mb-4 text-center">Welcome to Your Dashboard</h2> 
        <div className="row ">
          {/* View Report */}
          <div className="col-md-6 col-lg-3 mb-4">
            <div className="card text-center shadow-sm border-info">
              <div className="card-body">
                <i className="bi bi-file-earmark-text" style={{ fontSize: '40px', color: '#17a2b8' }}></i>
                <h5 className="card-title mt-3">View Report</h5>
                <p className="card-text">Access and view your academic reports.</p>
                <Link to="/Seereport" className="btn btn-info">Go to Report</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Studentdashboard;
