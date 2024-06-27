import React from 'react';
import { Navbar, Carousel, Nav } from 'react-bootstrap';
import "./HomePage.css";
import Footer from "../Footer/Footer";
import {useState,useEffect} from 'react';

function HomePage() {
        useEffect(() => {
            localStorage.setItem("user", "guest");
            localStorage.setItem("autentificare_admin",0);
        }, []); 
    
    
    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Acasă</Nav.Link>
                        <Nav.Link href="/guest/about">Despre noi</Nav.Link>
                        <Nav.Link href="/login">Login</Nav.Link>
                        <Nav.Link href="/autentif">Autentificare</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <h1>Welcome back!</h1>
            <div class="containerHOME">
               
    <div class="box">
        <img src="/assets/1.png"/>
  
    </div>
    <div class="box">
        <img src="/assets/2.png"/>

    </div>
    <div class="box">
        <img src="/assets/3.png"/>

    </div>
    </div>
    <h1>Printre cartile noastre populare...</h1>
    <div className="triangle-container">
        <img src="/assets/it.jpeg" alt="Image 1" className="triangle-image" id="top" />
        <img src="/assets/mister.jpeg" alt="Image 2" className="triangle-image" id="left" />
        <img src="/assets/ITH.jpeg" alt="Image 3" className="triangle-image" id="right" />
    </div>
            <section className="library-info">
                <h2>Biblioteca ATM</h2>
                <p>Bine ați venit la biblioteca noastră! Oferim o gamă largă de cărți pentru toate vârstele și interesele. Veniți să descoperiți lumea fascinantă a cărților!</p>
            </section>

            <Footer />
        </div>
    );
}

export default HomePage;