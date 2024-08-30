import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
         <div className="container-fluid ">

      {/* Hero Section */}
      <section className="text-center bg-danger-subtle py-5" style={{ height: 'calc(40vh + 40px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className="container-lg">
          <h1 className="display-4 mb-4 fw-bold">Welcome to Our Student Management System</h1>
          <p className="lead mb-4 "style={{ width: '50%', margin: '0 auto' }}>
            Our system offers comprehensive tools for managing student data, tracking progress, and enhancing communication between students and administrators.
          </p>
     
        </div>
      </section>


      {/* Testimonials */}
      <section className="text-center bg-danger-subtle py-5">
        <div className="container-lg">
          <h2 className="display-4 mb-4  fw-bold ">What Our Users Say</h2>
          <div id="testimonialsCarousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <blockquote className="blockquote">
                  <p className="mb-0">"This system has transformed how we manage student data. It's intuitive and effective."</p>
                  <footer className="blockquote-footer pt-3">Jane Doe, <cite title="Source Title">Admin</cite></footer>
                </blockquote>
              </div>
              <div className="carousel-item">
                <blockquote className="blockquote">
                  <p className="mb-0">"An excellent tool for tracking and improving student performance."</p>
                 
                </blockquote>
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#testimonialsCarousel" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#testimonialsCarousel" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-light text-center py-4">
        <div className="container-lg">
          <p className="mb-0">© 2024 Student Management System. All rights reserved.</p>
          <div className="mt-2">
            <Link to="/privacy" className="text-light mx-2">Privacy Policy</Link>
            <Link to="/terms" className="text-light mx-2">Terms of Service</Link>
          </div>
        </div>
      </footer>
      
      </div>
    </>
  );
}

export default Home;
