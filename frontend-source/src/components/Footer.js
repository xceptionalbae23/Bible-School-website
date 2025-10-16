import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Youtube, ExternalLink } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            {/* About Section */}
            <div className="footer-section">
              <div className="footer-brand">
                <img 
                  src="/images/logo/main-logo.jpeg" 
                  alt="WHIBC Logo" 
                  className="footer-logo"
                />
                <div>
                  <h3>WHIBC</h3>
                  <p className="footer-motto">Excellence in Academic and Character</p>
                </div>
              </div>
              <p className="footer-description">
                Word of Hope International Bible College is committed to training Christian leaders 
                through advanced research, policy formation, and comprehensive theological education.
              </p>
              <div className="footer-accreditation">
                <strong>Affiliated with:</strong><br />
                Triumphant Christian University of America
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul className="footer-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/programs">Academic Programs</Link></li>
                <li><Link to="/admissions">Admissions</Link></li>
                <li><Link to="/partnership">Partnership</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
              </ul>
            </div>

            {/* Programs */}
            <div className="footer-section">
              <h4>Programs</h4>
              <ul className="footer-links">
                <li>Certificate Programs</li>
                <li>Diploma Programs</li>
                <li>Advanced Diploma</li>
                <li>Postgraduate Diploma</li>
                <li>Master's Programs</li>
                <li>Doctoral Programs</li>
                <li>Skill Acquisition</li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="footer-section">
              <h4>Contact Information</h4>
              
              <div className="contact-group">
                <h5>Canada Office</h5>
                <div className="contact-item">
                  <MapPin size={16} />
                  <span>200 Bay Street South Apartment, 814 Hamilton, Ontario L8P 4S4, Canada</span>
                </div>
              </div>

              <div className="contact-group">
                <h5>Nigeria Study Centre</h5>
                <div className="contact-item">
                  <MapPin size={16} />
                  <span>Life Giving Word Mission Inc., 37 Amuri Road Achakpa, Abakpa, Enugu State</span>
                </div>
              </div>

              <div className="contact-group">
                <div className="contact-item">
                  <Phone size={16} />
                  <span>+234 904 252 0176</span>
                </div>
                <div className="contact-item">
                  <Phone size={16} />
                  <span>+234 915 778 8318</span>
                </div>
                <div className="contact-item">
                  <Mail size={16} />
                  <span>wohibc2025@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <div className="footer-copyright">
              <p>&copy; {currentYear} Word of Hope International Bible College. All rights reserved.</p>
            </div>
            <div className="footer-social">
              <a 
                href="https://facebook.com/groups/1249228856399823/" 
                className="social-link" 
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://youtube.com/@wohiministriesworldwide?si=Fn-_FtPOVtJl-_kO" 
                className="social-link" 
                aria-label="YouTube"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Youtube size={20} />
              </a>
              <a 
                href="https://wa.me/2349042520176" 
                className="social-link" 
                aria-label="WhatsApp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Phone size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background: var(--text-dark);
          color: white;
          margin-top: auto;
        }

        .footer-main {
          padding: 4rem 0 2rem;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 3rem;
        }

        .footer-section h3,
        .footer-section h4 {
          color: white;
          margin-bottom: 1.5rem;
          font-family: 'Playfair Display', serif;
          font-weight: 600;
        }

        .footer-section h5 {
          color: var(--accent-gold);
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
          font-weight: 600;
        }

        .footer-brand {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .footer-logo {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          object-fit: cover;
        }

        .footer-motto {
          color: var(--accent-gold);
          font-size: 0.85rem;
          margin: 0;
          font-weight: 500;
        }

        .footer-description {
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .footer-accreditation {
          color: rgba(255, 255, 255, 0.9);
          font-size: 0.9rem;
          padding: 1rem;
          background: rgba(30, 74, 114, 0.3);
          border-radius: 8px;
          border-left: 3px solid var(--primary-blue);
        }

        .footer-links {
          list-style: none;
          padding: 0;
        }

        .footer-links li {
          margin-bottom: 0.75rem;
        }

        .footer-links a,
        .footer-links li {
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          transition: color 0.3s ease;
          font-size: 0.95rem;
        }

        .footer-links a:hover {
          color: var(--accent-gold);
        }

        .contact-group {
          margin-bottom: 1.5rem;
        }

        .contact-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.95rem;
          line-height: 1.5;
        }

        .contact-item svg {
          margin-top: 2px;
          flex-shrink: 0;
          color: var(--accent-gold);
        }

        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding: 2rem 0;
          background: rgba(0, 0, 0, 0.3);
        }

        .footer-bottom-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .footer-copyright p {
          color: rgba(255, 255, 255, 0.7);
          margin: 0;
          font-size: 0.9rem;
        }

        .footer-social {
          display: flex;
          gap: 1rem;
        }

        .social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.8);
          border-radius: 50%;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .social-link:hover {
          background: var(--primary-blue);
          color: white;
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .footer-main {
            padding: 3rem 0 1.5rem;
          }

          .footer-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .footer-brand {
            flex-direction: column;
            text-align: center;
            gap: 0.5rem;
          }

          .footer-bottom-content {
            flex-direction: column;
            text-align: center;
            gap: 1.5rem;
          }

          .contact-item {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;