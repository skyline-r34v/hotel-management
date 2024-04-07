import React from 'react';
import './landing.css'; // Import your CSS file here
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="navbar">
            <div className="container navbar-container">
                <input type="checkbox" name="" id="" />

                <div className="hamburger-lines">
                    <span className="line line1"></span>
                    <span className="line line2"></span>
                    <span className="line line3"></span>
                </div>

                <ul className="menu-items">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#food">Category</a></li>
                    <li><a href="#food-menu">Menu</a></li>
                    <li><a href="#testimonials">Testimonials</a></li>
                    <li><a href="#services">services</a></li>
                    <Link to="/login" className="btn btn-primary">Login</Link>
                </ul>

                <h1 className="logo">Taj Hotel</h1>
            </div>
        </nav>
    );
}

export default Navbar