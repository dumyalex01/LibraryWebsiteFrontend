import React from 'react';
import './Footer.css';
const Footer = () => {
  return (
    <footer className="footer">
      <div className="contact">
        <h3>CONTACT</h3>
        <p>ACADEMIA TEHNICĂ MILITARĂ “FERDINAND I”</p>
        <p>B-dul George Coșbuc nr. 81-83, Sector 5, 050141 BUCUREȘTI</p>
        <p>Cod poștal 050141</p>
        <p>Tel: +4021 3354678 / +4021 3194760</p>
      </div>

      <div className="facebook">
        <h3>FACEBOOK</h3>
        <a href="https://www.facebook.com/search/top?q=academia%20tehnic%C4%83%20militar%C4%83%20%22ferdinand%20i%22-%20www.mta.ro">Academia Tehnica Militara “Ferdinand I”</a>
      </div>
      <div className="copyright">
        <p>© 2021 Academia Tehnica Militara “Ferdinand I”. Toate drepturile rezervate.</p>
      </div>
    </footer>
  );
};

export default Footer;