import React from 'react';
import './landing.css'; // Import your CSS file here
import { Link } from 'react-router-dom';
import abtimg from '../assests/64c7911ad3dcfc01e4dd672f_untitled-design-2023-07-31t161628752-64c7910af08c7.webp'
import single from '../assests/single.jpg'
import double from '../assests/double.jpeg'
import suite from '../assests/suite.jpg'
import f1 from '../assests/Famous-Foods-of-Mysore-–-Dishes-You-Should-Try-on-Your-Next-Vacation.jpg.avif'
import f2 from '../assests/intro-1645057933.webp'
import f3 from '../assests/DAL-BAATI-CHURMA.jpg'
import f4 from '../assests/104041992.jpg'
import f5 from '../assests/skynews-burger-chips-junk-food_5425771.jpg'
import f6 from '../assests/Cherry-Cheesecake-with-Berry-Sauce.png'
import service from '../assests/Blog-4-Duties-To-be-Expected-from-Room-Service-PART-1-002.jpg'

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

function Showcase() {
    return (
        <section id="showcase" className="showcase-area">
            <div className="showcase-container">
                <h1 className="main-title" id="home">Welcome to Taj Hotel<span className="sub"></span></h1>
                <p>The perfect base for your stay!!!</p>
            </div>
        </section>
    );
}

function About() {
    return (
        <section id="about">
            <div class="about-wrapper container">
                <div class="about-text">
                    <p class="small">About Us</p>
                    <h2>We've been making healthy food last for 10 years.</h2>
                    <p>At Taj hotel, we pride ourselves on providing unparalleled hospitality and personalized service to each and every guest. Whether you're here for business or leisure, our goal is to make your stay unforgettable.</p>
                    <p>Whether you're craving a gourmet meal, a signature cocktail, or a relaxing massage, we have everything you need to unwind and rejuvenate.</p>
                </div>
                <div class="about-img">
                    <img src={abtimg} alt="food" />
                </div>
            </div>
        </section>
    );
}

function Food() {
    return (
        <section id="food">
            <h2>Room Type</h2>
            <div class="food-container container">
                <div class="food-type fruit">
                    <div class="img-container">
                        <img src={single} alt="fruit" />
                        <div class="img-content">
                            <h3>Single Room</h3>
                            <a href="#" class="btn btn-primary">Learn More</a>
                        </div>
                    </div>
                </div>
                <div class="food-type veg">
                    <div class="img-container">
                        <img src={double} alt="veg" />
                        <div class="img-content">
                            <h3>Double Room</h3>
                            <a href="#" class="btn btn-primary">Learn More</a>
                        </div>
                    </div>
                </div>
                <div class="food-type grain">
                    <div class="img-container">
                        <img src={suite} alt="grain" />
                        <div class="img-content">
                            <h3>Suite Room</h3>
                            <a href="#" class="btn btn-primary">Learn More</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function FoodMenu() {
    return (
        <section id="food-menu">
            <h2 class="food-menu-heading">Hotel`s Special</h2>
            <div class="food-menu-container container">
                <div class="food-menu-item">
                    <div class="food-img">
                        <img src={f1} alt="menu-1" />
                    </div>
                    <div class="food-description">
                        <h2 class="food-title">Maysore Dosa</h2>
                        <p>BreakFast</p>
                        <p class="food-price"> Price: &#8377;250 </p>
                    </div>
                </div>
                <div class="food-menu-item">
                    <div class="food-img">
                        <img src={f2} alt="menu-2" />
                    </div>
                    <div class="food-description">
                        <h2 class="food-title">Punjabi Thali</h2>
                        <p>Lunch</p>
                        <p class="food-price"> Price: &#8377;470 </p>
                    </div>
                </div>
                <div class="food-menu-item">
                    <div class="food-img">
                        <img src={f3} alt="menu-3" />
                    </div>
                    <div class="food-description">
                        <h2 class="food-title">Dal baati churma</h2>
                        <p>Lunch</p>
                        <p class="food-price"> Price: &#8377;340 </p>
                    </div>
                </div>
                <div class="food-menu-item">
                    <div class="food-img">
                        <img src={f4} alt="menu-4" />
                    </div>
                    <div class="food-description">
                        <h2 class="food-title">Samosa</h2>
                        <p>BreakFast</p>
                        <p class="food-price"> Price: &#8377;250 </p>
                    </div>
                </div>
                <div class="food-menu-item">
                    <div class="food-img">
                        <img src={f5} alt="menu-5" />
                    </div>
                    <div class="food-description">
                        <h2 class="food-title">Mexican Burger</h2>
                        <p>Eveing Snack</p>
                        <p class="food-price"> Price: &#8377;665 </p>
                    </div>
                </div>
                <div class="food-menu-item">
                    <div class="food-img">
                        <img src={f6} alt="menu-6" />
                    </div>
                    <div class="food-description">
                        <h2 class="food-title">Cherry cheeseCake</h2>
                        <p>Dessert</p>
                        <p class="food-price"> Price: &#8377;295 </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

function Testimonials() {
    return (
        <section id="testimonials">
            <h2 class="testimonial-title">What Our Customer Say?</h2>
            <div class="testimonial-container container">
                <div class="testimonial-box">
                    <div class="customer-detail">
                        <div class="customer-photo">
                            <img src="https://i.postimg.cc/5Nrw360Y/male-photo1.jpg" alt="first" />
                            <p class="customer-name">Ross Lee</p>
                        </div>
                    </div>
                    <div class="star-rating">
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                    </div>
                    <p class="testimonial-text">facility and service offer by hotel is outstanding</p>
                </div>
                <div class="testimonial-box">
                    <div class="customer-detail">
                        <div class="customer-photo">
                            <img src="https://i.postimg.cc/sxd2xCD2/female-photo1.jpg" alt="second" />
                            <p class="customer-name">Sara</p>
                        </div>
                    </div>
                    <div class="star-rating">
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star-half-alt checked"></span>
                    </div>
                    <p class="testimonial-text">it was a great stay! the staff are really good at their behaviour! </p>
                </div>
                <div class="testimonial-box">
                    <div class="customer-detail">
                        <div class="customer-photo">
                            <img src="https://i.postimg.cc/fy90qvkV/male-photo3.jpg" alt="third" />
                            <p class="customer-name">John</p>
                        </div>
                    </div>
                    <div class="star-rating">
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="fa fa-star checked"></span>
                        <span class="far fa-star checked"></span>
                        <span class="far fa-star checked"></span>
                    </div>
                    <p class="testimonial-text">the food was very great.</p>
                </div>
            </div>
        </section>
    );
}

function Services() {
    return (
        <section id="services">
            <div class="contact-container container">
                <div class="contact-img">
                    <img src={service} alt="contact img"/>
                </div>
                <div class="form-container">
                    <h2>Services</h2>
                    <p><b>High Class Security</b></p>
                    <p><b>24 Hours Room Service</b> </p>
                    <p><b>Conference Room</b></p>
                    </div>
                
            </div>
        </section>
    );
}

function Footer() {
    return (
        <footer id="footer">
            <h4>Taj Hotel&copy; 2024, All Rights Reserved. </h4>
        </footer>
    );
}

function App() {
    return (
        <div>
            <Navbar />
            <Showcase />
            <About />
            <Food />
            <FoodMenu />
            <Testimonials />
            <Services />
            <Footer />
        </div>
    );
}

export default App;
