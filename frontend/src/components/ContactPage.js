import React from 'react';
import { Phone, Mail, MapPin, Clock, Globe, Users, MessageCircle, ExternalLink } from 'lucide-react';

const ContactPage = () => {
  const contactInfo = {
    canada: {
      title: "Canada Office",
      address: "200 Bay Street South Apartment, 814 Hamilton, Ontario L8P 4S4, Canada",
      role: "Headquarters & Administration"
    },
    nigeria: {
      title: "Nigeria Study Centre",
      address: "Life Giving Word Mission Inc., 37 Amuri Road Achakpa, Abakpa, Enugu State",
      role: "West Africa Operations"
    }
  };

  const departments = [
    {
      name: "Admissions Office",
      description: "Student registration, application processing, and enrollment inquiries",
      email: "admissions@wohibc.edu",
      phone: "+234 904 252 0176",
      hours: "Mon-Fri: 8:00 AM - 5:00 PM"
    },
    {
      name: "Academic Affairs",
      description: "Curriculum information, academic programs, and faculty matters",
      email: "academics@wohibc.edu", 
      phone: "+234 915 778 8318",
      hours: "Mon-Fri: 9:00 AM - 4:00 PM"
    },
    {
      name: "Partnership Development",
      description: "Partnership opportunities, sponsorships, and collaborative programs",
      email: "partnerships@wohibc.edu",
      phone: "+234 904 252 0176",
      hours: "Mon-Fri: 8:00 AM - 5:00 PM"
    },
    {
      name: "General Inquiries",
      description: "General information, directions, and other inquiries",
      email: "wohibc2025@gmail.com",
      phone: "+234 915 778 8318",
      hours: "Mon-Sat: 8:00 AM - 6:00 PM"
    }
  ];

  const faqs = [
    {
      question: "What are the admission requirements?",
      answer: "Basic requirements include completed high school education, valid ID, passport photograph, personal statement of faith, and two character references. Advanced programs may require additional qualifications."
    },
    {
      question: "Are online programs available?",
      answer: "Yes, we offer online, on-campus, and hybrid study modes for most of our programs to accommodate different student needs and circumstances."
    },
    {
      question: "What is the duration of programs?",
      answer: "Program duration varies: Certificate programs (3-6 months), Diploma programs (1-2 years), Master's programs (2 years), and PhD programs (3-5 years)."
    },
    {
      question: "Is WHIBC accredited?",
      answer: "Yes, WHIBC is affiliated with Triumphant Christian University of America, ensuring our programs meet international standards for Christian higher education."
    },
    {
      question: "How can I apply for partnership?",
      answer: "You can submit a partnership application through our Partnership page or contact our Partnership Development department directly."
    }
  ];

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <div className="contact-hero-content">
            <h1 className="page-title">Contact Us</h1>
            <p className="hero-description">
              We're here to help you on your journey toward excellence in academic and character. 
              Reach out to us through any of the channels below.
            </p>
            <div className="hero-highlight">
              <MessageCircle className="w-6 h-6" />
              <span>Ready to answer your questions and support your goals</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact */}
      <section className="quick-contact section">
        <div className="container">
          <div className="quick-contact-grid">
            <div className="contact-card card">
              <div className="card-content text-center">
                <Phone className="w-12 h-12 text-primary mx-auto mb-3" />
                <h3>Call Us</h3>
                <div className="contact-details">
                  <a href="tel:+2349042520176" className="contact-link">
                    +234 904 252 0176
                  </a>
                  <a href="tel:+2349157788318" className="contact-link">
                    +234 915 778 8318
                  </a>
                </div>
                <p className="contact-description">
                  Speak directly with our team for immediate assistance
                </p>
              </div>
            </div>

            <div className="contact-card card">
              <div className="card-content text-center">
                <Mail className="w-12 h-12 text-secondary mx-auto mb-3" />
                <h3>Email Us</h3>
                <div className="contact-details">
                  <a href="mailto:wohibc2025@gmail.com" className="contact-link">
                    wohibc2025@gmail.com
                  </a>
                </div>
                <p className="contact-description">
                  Send us detailed inquiries and we'll respond promptly
                </p>
              </div>
            </div>

            <div className="contact-card card">
              <div className="card-content text-center">
                <Globe className="w-12 h-12 text-accent mx-auto mb-3" />
                <h3>Visit Us</h3>
                <div className="contact-details">
                  <span>Canada & Nigeria</span>
                </div>
                <p className="contact-description">
                  Two international locations to serve you better
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="locations-section section section-light">
        <div className="container">
          <div className="section-header text-center">
            <h2>Our Locations</h2>
            <p>International presence with local accessibility</p>
          </div>

          <div className="grid grid-2">
            <div className="location-card card">
              <div className="card-content">
                <div className="location-header">
                  <MapPin className="w-8 h-8 text-primary" />
                  <div>
                    <h3>{contactInfo.canada.title}</h3>
                    <span className="location-role">{contactInfo.canada.role}</span>
                  </div>
                </div>
                
                <div className="location-details">
                  <div className="location-address">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span>{contactInfo.canada.address}</span>
                  </div>
                  
                  <div className="location-info">
                    <div className="info-item">
                      <Phone className="w-4 h-4" />
                      <span>Primary: +234 904 252 0176</span>
                    </div>
                    <div className="info-item">
                      <Mail className="w-4 h-4" />
                      <span>wohibc2025@gmail.com</span>
                    </div>
                    <div className="info-item">
                      <Clock className="w-4 h-4" />
                      <span>Mon-Fri: 8:00 AM - 5:00 PM (EST)</span>
                    </div>
                  </div>
                </div>

                <div className="map-placeholder">
                  <div className="map-content">
                    <MapPin className="w-8 h-8 text-primary" />
                    <span>Hamilton, Ontario, Canada</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="location-card card">
              <div className="card-content">
                <div className="location-header">
                  <MapPin className="w-8 h-8 text-secondary" />
                  <div>
                    <h3>{contactInfo.nigeria.title}</h3>
                    <span className="location-role">{contactInfo.nigeria.role}</span>
                  </div>
                </div>
                
                <div className="location-details">
                  <div className="location-address">
                    <MapPin className="w-5 h-5 text-secondary" />
                    <span>{contactInfo.nigeria.address}</span>
                  </div>
                  
                  <div className="location-info">
                    <div className="info-item">
                      <Phone className="w-4 h-4" />
                      <span>Primary: +234 915 778 8318</span>
                    </div>
                    <div className="info-item">
                      <Mail className="w-4 h-4" />
                      <span>wohibc2025@gmail.com</span>
                    </div>
                    <div className="info-item">
                      <Clock className="w-4 h-4" />
                      <span>Mon-Sat: 8:00 AM - 6:00 PM (WAT)</span>
                    </div>
                  </div>
                </div>

                <div className="map-placeholder">
                  <div className="map-content">
                    <MapPin className="w-8 h-8 text-secondary" />
                    <span>Enugu State, Nigeria</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="departments-section section">
        <div className="container">
          <div className="section-header text-center">
            <h2>Contact by Department</h2>
            <p>Get in touch with the right department for faster assistance</p>
          </div>

          <div className="departments-grid">
            {departments.map((department, index) => (
              <div key={index} className="department-card card">
                <div className="card-content">
                  <h4>{department.name}</h4>
                  <p className="department-description">{department.description}</p>
                  
                  <div className="department-contact">
                    <div className="contact-item">
                      <Mail className="w-4 h-4" />
                      <a href={`mailto:${department.email}`} className="contact-link">
                        {department.email}
                      </a>
                    </div>
                    <div className="contact-item">
                      <Phone className="w-4 h-4" />
                      <a href={`tel:${department.phone}`} className="contact-link">
                        {department.phone}
                      </a>
                    </div>
                    <div className="contact-item">
                      <Clock className="w-4 h-4" />
                      <span>{department.hours}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section section section-light">
        <div className="container">
          <div className="section-header text-center">
            <h2>Frequently Asked Questions</h2>
            <p>Quick answers to common questions</p>
          </div>

          <div className="faq-container">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item card">
                <div className="card-content">
                  <h4 className="faq-question">{faq.question}</h4>
                  <p className="faq-answer">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="contact-cta">
        <div className="container">
          <div className="cta-content text-center">
            <Users className="w-16 h-16 text-white mx-auto mb-4" />
            <h2>Still Have Questions?</h2>
            <p>
              Our friendly team is ready to help you with any questions about our programs, 
              admissions process, or partnership opportunities.
            </p>
            <div className="cta-actions">
              <a href="tel:+2349042520176" className="btn btn-primary">
                <Phone className="w-5 h-5" />
                Call Now
              </a>
              <a href="mailto:wohibc2025@gmail.com" className="btn btn-outline">
                Send Email
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .contact-page {
          margin-top: 80px;
        }

        .contact-hero {
          background: linear-gradient(135deg, var(--primary-blue) 0%, var(--secondary-green) 100%);
          color: white;
          padding: 6rem 0;
        }

        .contact-hero-content {
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
        }

        .page-title {
          color: white;
          font-size: 3rem;
          margin-bottom: 2rem;
          font-weight: 700;
        }

        .hero-description {
          font-size: 1.25rem;
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.7;
          margin-bottom: 2rem;
        }

        .hero-highlight {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          padding: 1rem 2rem;
          border-radius: 50px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          font-weight: 600;
        }

        .quick-contact-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .contact-card {
          text-align: center;
          transition: all 0.3s ease;
        }

        .contact-card:hover {
          transform: translateY(-8px);
        }

        .contact-details {
          margin: 1.5rem 0;
        }

        .contact-link {
          display: block;
          color: var(--primary-blue);
          text-decoration: none;
          font-weight: 600;
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
          transition: color 0.3s ease;
        }

        .contact-link:hover {
          color: var(--secondary-green);
        }

        .contact-description {
          color: var(--text-medium);
          font-size: 0.95rem;
        }

        .location-card {
          height: fit-content;
        }

        .location-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .location-header h3 {
          color: var(--primary-blue);
          margin: 0;
        }

        .location-role {
          color: var(--secondary-green);
          font-weight: 500;
          font-size: 0.9rem;
        }

        .location-address {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          margin-bottom: 2rem;
          padding: 1rem;
          background: var(--gray-50);
          border-radius: 10px;
        }

        .location-address svg {
          margin-top: 2px;
          flex-shrink: 0;
        }

        .location-info {
          margin-bottom: 2rem;
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
          color: var(--text-medium);
          font-size: 0.95rem;
        }

        .info-item svg {
          color: var(--accent-gold);
          flex-shrink: 0;
        }

        .map-placeholder {
          background: var(--light-blue);
          border-radius: 10px;
          padding: 2rem;
          text-align: center;
          border: 2px dashed var(--primary-blue);
        }

        .map-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          color: var(--primary-blue);
          font-weight: 600;
        }

        .departments-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .department-card {
          transition: all 0.3s ease;
        }

        .department-card:hover {
          transform: translateY(-5px);
        }

        .department-card h4 {
          color: var(--primary-blue);
          margin-bottom: 1rem;
        }

        .department-description {
          color: var(--text-medium);
          margin-bottom: 1.5rem;
          font-size: 0.95rem;
          line-height: 1.6;
        }

        .department-contact {
          border-top: 1px solid var(--gray-200);
          padding-top: 1rem;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
          font-size: 0.9rem;
        }

        .contact-item svg {
          color: var(--secondary-green);
          flex-shrink: 0;
        }

        .contact-item .contact-link {
          font-size: 0.9rem;
          margin: 0;
        }

        .faq-container {
          max-width: 800px;
          margin: 0 auto;
        }

        .faq-item {
          margin-bottom: 1rem;
        }

        .faq-question {
          color: var(--primary-blue);
          margin-bottom: 1rem;
          font-size: 1.1rem;
        }

        .faq-answer {
          color: var(--text-medium);
          line-height: 1.6;
        }

        .contact-cta {
          background: linear-gradient(135deg, var(--secondary-green) 0%, var(--primary-blue) 100%);
          color: white;
          padding: 5rem 0;
        }

        .contact-cta h2 {
          color: white;
          margin-bottom: 1rem;
        }

        .contact-cta p {
          color: rgba(255, 255, 255, 0.9);
          font-size: 1.1rem;
          margin-bottom: 2rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .cta-actions {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        @media (max-width: 768px) {
          .page-title {
            font-size: 2.5rem;
          }

          .quick-contact-grid {
            grid-template-columns: 1fr;
          }

          .location-header {
            flex-direction: column;
            text-align: center;
            gap: 0.5rem;
          }

          .departments-grid {
            grid-template-columns: 1fr;
          }

          .cta-actions {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </div>
  );
};

export default ContactPage;