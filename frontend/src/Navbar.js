import React from 'react';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark pb-3 pt-3" style={{ backgroundColor: '#ab3b3b' }}>
      {/* Container wrapper */}
      <div className="container-fluid">

        {/* Navbar brand */}
        <a className="navbar-brand fw-bold " href="/"><i class="fas fa-graduation-cap"></i></a>

        {/* Toggle button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars"></i>
        </button>

        {/* Collapsible wrapper */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item px-2">
              <a className="nav-link fw-bold" href="/">Home Page</a>
            </li>
            <li className="nav-item px-2">
              <a className="nav-link fw-bold" href="/login">Admin</a>
            </li>
            <li className="nav-item px-2">
              <a className="nav-link fw-bold" href="/teacher/login">Teacher</a>
            </li>
            <li className="nav-item px-2">
              <a className="nav-link fw-bold" href="/student/login">Student</a>
            </li>
          </ul>

          {/* Icons */}
          <ul className="navbar-nav d-flex flex-row ms-auto mb-2 mb-lg-0">
            <li className="nav-item px-2">
              <a className="nav-link" href="/"><i className="fas fa-shopping-cart"></i></a>
            </li>
            <li className="nav-item px-2">
              <a className="nav-link" href="/"><i className="fab fa-twitter"></i></a>
            </li>
          </ul>

          {/* Search */}
          <form className="d-flex ms-2">
            <input type="search" className="form-control" placeholder="Type query" aria-label="Search" />
          </form>

        </div>
      </div>
      {/* Container wrapper */}
    </nav>
  );
}

export default Navbar;
