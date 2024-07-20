import React from 'react';
import './footer.css'; // Import the CSS file

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-left">
                    <h2>METAL SHINE FASTENERS</h2>
                </div>
                <div className="footer-right">
                    <p>Suresh Mehta: +919824040828</p>
                    <p>Harshit Mehta: +919723619108</p>
                    <p>Block No. 543/12, Nr. Supreme Radiators Pvt. Ltd., Village - Rakanpur 382721, Dist. Gandhinagar, Gujarat</p>
                    <p>www.metalshinefasteners.com</p>
                    <p>info@metalshinefasteners.com</p>
                </div>
                <div className="footer-logo">
                    <img src="/manufacture_logo.jpg" alt="HSM Logo" />
                </div>
            </div>
        </footer>
    );
};

export default Footer;
