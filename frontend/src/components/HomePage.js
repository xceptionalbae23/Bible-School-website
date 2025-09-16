import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Users, Award, Globe, BookOpen, Heart, ArrowRight, Phone, Mail, MapPin, Facebook, Youtube } from 'lucide-react';

const HomePage = () => {
  const features = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Academic Excellence",
      description: "Advanced research, policy formation, and comprehensive Christian education from Certificate to PhD levels."
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Reach",
      description: "International perspective with campuses in Canada and Nigeria, training leaders worldwide."
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Accredited Programs",
      description: "Affiliated with Triumphant Christian University of America, ensuring quality education standards."
    }
  ];

  const programs = [
    {
      title: "Certificate Programs",
      duration: "3-6 months",
      description: "Biblical Studies, Christian Ministry, Theology, Leadership & Management",
      image: "https://images.unsplash.com/photo-1576506542790-51244b486a6b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwxfHxiaWJsZSUyMHN0dWR5fGVufDB8fHx8MTc1Nzc2MTE2M3ww&ixlib=rb-4.1.0&q=85"
    },
    {
      title: "Diploma Programs",
      duration: "1-2 years",
      description: "Pastoral Ministry, Evangelism & Missions, Christian Leadership",
      image: "https://images.unsplash.com/photo-1610050731641-f855ccdaf3f6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwzfHxiaWJsZSUyMHN0dWR5fGVufDB8fHx8MTc1Nzc2MTE2M3ww&ixlib=rb-4.1.0&q=85"
    },
    {
      title: "Advanced Degrees",
      duration: "2-5 years",
      description: "Master's, PhD programs in Theology, Leadership, Peace & Conflict Resolution",
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwyfHxncmFkdWF0aW9uJTIwY2VyZW1vbnl8ZW58MHx8fHwxNzU3NzQ1NDY0fDA&ixlib=rb-4.1.0&q=85"
    }
  ];

  const stats = [
    { number: "15+", label: "Academic Programs" },
    { number: "2", label: "International Campuses" },
    { number: "1000+", label: "Students Trained" },
    { number: "25+", label: "Years of Excellence" }
  ];

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <img 
            src="https://images.unsplash.com/photo-1626815097810-7e54a9ecad96?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwxfHxjaHJpc3RpYW4lMjB1bml2ZXJzaXR5JTIwY2FtcHVzfGVufDB8fHx8MTc1Nzc2MTEzMXww&ixlib=rb-4.1.0&q=85" 
            alt="WHIBC Campus" 
            className="hero-image"
          />
          <div className="hero-overlay"></div>
        </div>
        
        <div className="container hero-content">
          <div className="hero-text">
            <h1 className="hero-title fade-in">
              Word of Hope International Bible College
            </h1>
            <p className="hero-subtitle slide-up">
              Excellence in Academic and Character
            </p>
            <p className="hero-description slide-up">
              Empowering Christian leaders through advanced research, policy formation, and comprehensive theological education. Join our global community of scholars and ministry professionals.
            </p>
            
            <div className="hero-actions slide-up">
              <Link to="/admissions" className="btn btn-primary">
                <GraduationCap size={20} />
                Register Now
              </Link>
              <Link to="/programs" className="btn btn-outline">
                View Programs
                <ArrowRight size={18} />
              </Link>
            </div>

            <div className="hero-announcement">
              <div className="announcement-badge">
                <span className="announcement-text">
                  🎓 2025-2026 Classes commence September onwards
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section section">
        <div className="container">
          <div className="section-header text-center">
            <h2>Why Choose WHIBC?</h2>
            <p>Discover what makes us a leader in Christian theological education</p>
          </div>
          
          <div className="grid grid-3">
            {features.map((feature, index) => (
              <div key={index} className="feature-card card">
                <div className="card-content text-center">
                  <div className="feature-icon text-primary mb-3">
                    {feature.icon}
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="programs-section section section-light">
        <div className="container">
          <div className="section-header text-center">
            <h2>Our Academic Programs</h2>
            <p>From foundational studies to advanced research degrees</p>
          </div>
          
          <div className="grid grid-3">
            {programs.map((program, index) => (
              <div key={index} className="program-card card">
                <img src={program.image} alt={program.title} className="card-image" />
                <div className="card-content">
                  <div className="program-duration">{program.duration}</div>
                  <h3>{program.title}</h3>
                  <p>{program.description}</p>
                  <Link to="/programs" className="btn btn-outline">
                    Learn More
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-5">
            <Link to="/programs" className="btn btn-primary">
              View All Programs
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="leadership-section section">
        <div className="container">
          <div className="section-header text-center">
            <h2>Our Leadership</h2>
            <p>Experienced leaders guiding our academic vision</p>
          </div>
          
          <div className="grid grid-2">
            <div className="leader-card card">
              <div className="card-content text-center">
                <img 
                  src="https://customer-assets.emergentagent.com/job_whibc-portal/artifacts/f4xxl94c_WhatsApp%20Image%202025-09-13%20at%2008.07.04.jpeg" 
                  alt="Apostle Sandra Ross" 
                  className="leader-image"
                />
                <h3>Apostle Sandra Ross</h3>
                <div className="leader-title">President/Founder</div>
                <div className="leader-location">Canada</div>
                <p>Leading the vision of excellence in Christian education with global impact and transformational leadership development.</p>
              </div>
            </div>
            
            <div className="leader-card card">
              <div className="card-content text-center">
                <img 
                  src="https://customer-assets.emergentagent.com/job_whibc-portal/artifacts/yynai5yu_WhatsApp%20Image%202025-09-13%20at%2011.51.07.jpeg" 
                  alt="Dr. Lawyer Istwekpeni" 
                  className="leader-image"
                />
                <h3>Dr. Lawyer Istwekpeni</h3>
                <div className="leader-title">Vice President</div>
                <div className="leader-location">PhD (Nigeria)</div>
                <p>Overseeing academic excellence and research initiatives, bringing extensive experience in theological education and leadership.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content text-center">
            <h2>Ready to Begin Your Journey?</h2>
            <p>Join thousands of students who have transformed their lives through quality Christian education</p>
            
            <div className="cta-actions">
              <Link to="/admissions" className="btn btn-primary">
                <GraduationCap size={20} />
                Start Registration
              </Link>
              <Link to="/partnership" className="btn btn-secondary">
                <Heart size={20} />
                Partner With Us
              </Link>
            </div>

            <div className="cta-contact">
              <div className="contact-items">
                <div className="contact-item">
                  <Phone size={16} />
                  <span>+234 904 252 0176</span>
                </div>
                <div className="contact-item">
                  <Mail size={16} />
                  <span>wohibc2025@gmail.com</span>
                </div>
              </div>
            </div>

            <div className="social-media-links">
              <h3>Follow Us</h3>
              <div className="social-links">
                <a 
                  href="https://facebook.com/groups/1249228856399823/" 
                  className="social-link facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook Group"
                >
                  <Facebook size={24} />
                </a>
                <a 
                  href="https://youtube.com/@wohiministriesworldwide?si=Fn-_FtPOVtJl-_kO" 
                  className="social-link youtube"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube Channel"
                >
                  <Youtube size={24} />
                </a>
                <a 
                  href="https://wa.me/2349042520176" 
                  className="social-link whatsapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp Contact"
                >
                  <Phone size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .homepage {
          margin-top: 80px;
        }

        /* Hero Section */
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          overflow: hidden;
        }

        .hero-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: -2;
        }

        .hero-image {
          width: 100%;
          height: 100vh;
          object-fit: cover;
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(30, 74, 114, 0.8) 0%, rgba(46, 125, 50, 0.6) 100%);
          z-index: -1;
        }

        .hero-content {
          position: relative;
          z-index: 1;
        }

        .hero-text {
          max-width: 600px;
        }

        .hero-title {
          color: white;
          font-size: 3.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }

        .hero-subtitle {
          color: var(--accent-gold);
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
        }

        .hero-description {
          color: rgba(255, 255, 255, 0.9);
          font-size: 1.1rem;
          margin-bottom: 2rem;
          line-height: 1.7;
        }

        .hero-actions {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .hero-announcement {
          animation: pulse 2s infinite;
        }

        .announcement-badge {
          display: inline-block;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          padding: 0.75rem 1.5rem;
          border-radius: 50px;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .announcement-text {
          color: white;
          font-weight: 600;
          font-size: 0.9rem;
        }

        /* Stats Section */
        .stats-section {
          background: var(--primary-blue);
          color: white;
          padding: 4rem 0;
          margin-top: -2px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          text-align: center;
        }

        .stat-number {
          font-size: 3rem;
          font-weight: 700;
          color: var(--accent-gold);
          font-family: 'Playfair Display', serif;
        }

        .stat-label {
          font-size: 1rem;
          font-weight: 500;
          margin-top: 0.5rem;
        }

        /* Features Section */
        .feature-card {
          text-align: center;
          transition: all 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-10px);
        }

        .feature-icon {
          display: inline-flex;
          padding: 1rem;
          background: var(--light-blue);
          border-radius: 50%;
          margin-bottom: 1rem;
        }

        /* Programs Section */
        .program-card .card-content {
          position: relative;
        }

        .program-duration {
          position: absolute;
          top: -20px;
          right: 1rem;
          background: var(--secondary-green);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        /* Leadership Section */
        .leader-card {
          text-align: center;
        }

        .leader-image {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          object-fit: cover;
          margin-bottom: 1rem;
          border: 4px solid var(--light-blue);
        }

        .leader-title {
          color: var(--primary-blue);
          font-weight: 600;
          font-size: 1rem;
        }

        .leader-location {
          color: var(--secondary-green);
          font-weight: 500;
          font-size: 0.9rem;
          margin-bottom: 1rem;
        }

        /* CTA Section */
        .cta-section {
          background: linear-gradient(135deg, var(--primary-blue) 0%, var(--secondary-green) 100%);
          color: white;
          padding: 5rem 0;
        }

        .cta-content h2 {
          color: white;
          margin-bottom: 1rem;
        }

        .cta-content p {
          color: rgba(255, 255, 255, 0.9);
          font-size: 1.1rem;
          margin-bottom: 2rem;
        }

        .cta-actions {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .cta-contact {
          margin-top: 2rem;
        }

        .contact-items {
          display: flex;
          justify-content: center;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 500;
        }

        .social-media-links {
          margin-top: 3rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.2);
        }

        .social-media-links h3 {
          color: white;
          margin-bottom: 1.5rem;
          font-size: 1.25rem;
        }

        .social-links {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
        }

        .social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          color: white;
          text-decoration: none;
          transition: all 0.3s ease;
          border: 2px solid rgba(255, 255, 255, 0.3);
        }

        .social-link:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
        }

        .social-link.facebook {
          background: #1877f2;
          border-color: #1877f2;
        }

        .social-link.youtube {
          background: #ff0000;
          border-color: #ff0000;
        }

        .social-link.whatsapp {
          background: #25d366;
          border-color: #25d366;
        }

        .social-link.facebook:hover {
          background: #145dbf;
        }

        .social-link.youtube:hover {
          background: #cc0000;
        }

        .social-link.whatsapp:hover {
          background: #1da851;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }
          
          .hero-actions {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .contact-items {
            flex-direction: column;
            gap: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default HomePage;