import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, GraduationCap } from 'lucide-react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/programs', label: 'Programs' },
    { path: '/admissions', label: 'Admissions' },
    { path: '/partnership', label: 'Partnership' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/contact', label: 'Contact' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <img 
            src="https://customer-assets.emergentagent.com/job_whibc-portal/artifacts/tock7csa_WhatsApp%20Image%202025-09-13%20at%2008.29.05.jpeg" 
            alt="WHIBC Logo" 
            className="logo-img"
          />
          <div className="brand-text">
            <span className="brand-name">WHIBC</span>
            <span className="brand-subtitle">Excellence in Academic and Character</span>
          </div>
        </Link>

        <div className={`navbar-menu ${isMenuOpen ? 'is-active' : ''}`}>
          <div className="navbar-nav">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="navbar-actions">
            <Link to="/admissions" className="btn btn-primary" onClick={() => setIsMenuOpen(false)}>
              <GraduationCap size={18} />
              Register Now
            </Link>
          </div>
        </div>

        <button
          className="navbar-burger"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <style jsx>{`
        .navbar {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(30, 74, 114, 0.1);
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          transition: all 0.3s ease;
        }

        .navbar .container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .navbar-brand {
          display: flex;
          align-items: center;
          gap: 1rem;
          text-decoration: none;
          color: var(--text-dark);
        }

        .logo-img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          object-fit: cover;
        }

        .brand-text {
          display: flex;
          flex-direction: column;
        }

        .brand-name {
          font-family: 'Playfair Display', serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--primary-blue);
          line-height: 1;
        }

        .brand-subtitle {
          font-size: 0.75rem;
          color: var(--text-medium);
          font-weight: 500;
        }

        .navbar-menu {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .navbar-nav {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .nav-link {
          text-decoration: none;
          color: var(--text-dark);
          font-weight: 500;
          padding: 0.5rem 0;
          position: relative;
          transition: all 0.3s ease;
        }

        .nav-link:hover,
        .nav-link.active {
          color: var(--primary-blue);
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--primary-blue);
          transition: width 0.3s ease;
        }

        .nav-link:hover::after,
        .nav-link.active::after {
          width: 100%;
        }

        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .navbar-burger {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          color: var(--text-dark);
        }

        @media (max-width: 768px) {
          .navbar-burger {
            display: block;
          }

          .navbar-menu {
            position: fixed;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(12px);
            flex-direction: column;
            padding: 2rem;
            gap: 1rem;
            transform: translateY(-100vh);
            transition: transform 0.3s ease;
            border-top: 1px solid rgba(30, 74, 114, 0.1);
          }

          .navbar-menu.is-active {
            transform: translateY(0);
          }

          .navbar-nav {
            flex-direction: column;
            width: 100%;
            gap: 1rem;
          }

          .nav-link {
            padding: 1rem 0;
            width: 100%;
            text-align: center;
            border-bottom: 1px solid rgba(30, 74, 114, 0.1);
          }

          .navbar-actions {
            width: 100%;
            justify-content: center;
          }

          .brand-subtitle {
            display: none;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navigation;