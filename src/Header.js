import React from 'react';
import {Link} from 'react-router-dom';

function Header({ isAuthenticated, username }) {
  return (
    <div>
      <div className="site-mobile-menu site-navbar-target">
        <div className="site-mobile-menu-header">
          <div className="site-mobile-menu-close mt-3">
            <span className="icon-close2 js-menu-toggle"></span>
          </div>
        </div>
        <div className="site-mobile-menu-body"></div>
      </div>

      <div className="py-2 bg-light">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-9 d-none d-lg-block">
              <a href="#" className="small mr-3"><span className="icon-question-circle-o mr-2"></span> Have a questions?</a> 
              <a href="#" className="small mr-3"><span className="icon-phone2 mr-2"></span> 10 20 123 456</a> 
              <a href="#" className="small mr-3"><span className="icon-envelope-o mr-2"></span> info@mydomain.com</a> 
            </div>
            <div className="col-lg-3 text-right">
              {isAuthenticated ? (
                <span>{username}</span>
              ) : (
                <div>
                  <a href="/login" className="small mr-3"><span className="icon-unlock-alt"></span> Log In</a>
                  <a href="/register" className="small btn btn-primary px-4 py-2 rounded-0"><span className="icon-users"></span> Register</a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <header className="site-navbar py-4 js-sticky-header site-navbar-target" role="banner">
        <div className="container">
          <div className="d-flex align-items-center">
            <div className="site-logo">
              <a href="index.html" className="d-block">
                <img src="images/logo.jpg" alt="Image" className="img-fluid" />
              </a>
            </div>
            <div className="mr-auto">
              <nav className="site-navigation position-relative text-right" role="navigation">
                <ul className="site-menu main-menu js-clone-nav mr-auto d-none d-lg-block">
                  <li>
                    <Link to="/home" className="nav-link text-left">Home</Link>
                  </li>
                  <li className="has-children">
                    <a href="about.html" className="nav-link text-left">About Us</a>
                    <ul className="dropdown">
                      <li><a href="teachers.html">Our Teachers</a></li>
                      <li><a href="about.html">Our School</a></li>
                    </ul>
                  </li>
                  <li>
                    <a href="admissions.html" className="nav-link text-left">Admissions</a>
                  </li>
                  <li>
                    <a href="courses.html" className="nav-link text-left">Courses</a>
                  </li>
                  <li>
                    <a href="contact.html" className="nav-link text-left">Contact</a>
                  </li>
                  <li>
                    <Link to="/exam-list" className="nav-link text-left">Exams</Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="ml-auto">
              <div className="social-wrap">
                <a href="#"><span className="icon-facebook"></span></a>
                <a href="#"><span className="icon-twitter"></span></a>
                <a href="#"><span className="icon-linkedin"></span></a>
                <a href="#" className="d-inline-block d-lg-none site-menu-toggle js-menu-toggle text-black">
                  <span className="icon-menu h3"></span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
