import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, BookOpen, Award, Users, GraduationCap, ArrowRight, Filter } from 'lucide-react';

const ProgramsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Programs' },
    { id: 'certificate', name: 'Certificate' },
    { id: 'diploma', name: 'Diploma' },
    { id: 'advanced', name: 'Advanced Degrees' },
    { id: 'skill', name: 'Skill Acquisition' }
  ];

  const programs = [
    // Certificate Programs (3-6 months)
    {
      id: 1,
      title: "Certificate in Biblical Studies",
      category: "certificate",
      duration: "3-6 months",
      mode: ["On-campus", "Online", "Hybrid"],
      description: "Foundational study of Scripture, biblical interpretation, and Christian doctrine.",
      image: "https://images.unsplash.com/photo-1576506542790-51244b486a6b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwxfHxiaWJsZSUyMHN0dWR5fGVufDB8fHx8MTc1Nzc2MTE2M3ww&ixlib=rb-4.1.0&q=85",
      highlights: ["Scripture Study", "Biblical Interpretation", "Christian Doctrine", "Prayer & Spirituality"]
    },
    {
      id: 2,
      title: "Certificate in Christian Ministry",
      category: "certificate",
      duration: "3-6 months",
      mode: ["On-campus", "Online", "Hybrid"],
      description: "Practical ministry skills for church leadership and community service.",
      image: "https://images.unsplash.com/photo-1610050731641-f855ccdaf3f6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwzfHxiaWJsZSUyMHN0dWR5fGVufDB8fHx8MTc1Nzc2MTE2M3ww&ixlib=rb-4.1.0&q=85",
      highlights: ["Ministry Leadership", "Pastoral Care", "Evangelism", "Church Administration"]
    },
    {
      id: 3,
      title: "Certificate in Theology",
      category: "certificate",
      duration: "4-6 months",
      mode: ["On-campus", "Online", "Hybrid"],
      description: "Systematic study of Christian theology and doctrinal foundations.",
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwyfHxncmFkdWF0aW9uJTIwY2VyZW1vbnl8ZW58MHx8fHwxNzU3NzQ1NDY0fDA&ixlib=rb-4.1.0&q=85",
      highlights: ["Systematic Theology", "Church History", "Comparative Religion", "Ethics"]
    },
    {
      id: 4,
      title: "Certificate in Leadership & Management",
      category: "certificate",
      duration: "3-6 months",
      mode: ["On-campus", "Online", "Hybrid"],
      description: "Leadership principles for Christian organizations and ministry contexts.",
      image: "https://images.unsplash.com/photo-1533854775446-95c4609da544?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHw0fHxncmFkdWF0aW9uJTIwY2VyZW1vbnl8ZW58MHx8fHwxNzU3NzQ1NDY0fDA&ixlib=rb-4.1.0&q=85",
      highlights: ["Christian Leadership", "Strategic Planning", "Team Management", "Organizational Behavior"]
    },

    // Diploma Programs (1-2 years)
    {
      id: 5,
      title: "Diploma in Theology",
      category: "diploma",
      duration: "1-2 years",
      mode: ["On-campus", "Online", "Hybrid"],
      description: "Comprehensive theological education covering major areas of Christian doctrine and practice.",
      image: "https://images.unsplash.com/photo-1576506542790-51244b486a6b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwxfHxiaWJsZSUyMHN0dWR5fGVufDB8fHx8MTc1Nzc2MTE2M3ww&ixlib=rb-4.1.0&q=85",
      highlights: ["Advanced Theology", "Biblical Languages", "Preaching", "Research Methods"]
    },
    {
      id: 6,
      title: "Diploma in Pastoral Ministry",
      category: "diploma",
      duration: "1-2 years",
      mode: ["On-campus", "Online", "Hybrid"],
      description: "Comprehensive preparation for pastoral leadership and church ministry.",
      image: "https://images.unsplash.com/photo-1610050731641-f855ccdaf3f6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwzfHxiaWJsZSUyMHN0dWR5fGVufDB8fHx8MTc1Nzc2MTE2M3ww&ixlib=rb-4.1.0&q=85",
      highlights: ["Pastoral Theology", "Counseling", "Worship Leadership", "Ministry Administration"]
    },
    {
      id: 7,
      title: "Diploma in Evangelism & Missions",
      category: "diploma",
      duration: "1-2 years",
      mode: ["On-campus", "Online", "Hybrid"],
      description: "Training for effective evangelism and cross-cultural missions work.",
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwyfHxncmFkdWF0aW9uJTIwY2VyZW1vbnl8ZW58MHx8fHwxNzU3NzQ1NDY0fDA&ixlib=rb-4.1.0&q=85",
      highlights: ["Mission Strategy", "Cross-cultural Ministry", "Church Planting", "Apologetics"]
    },

    // Advanced Degrees (2-5 years)
    {
      id: 8,
      title: "Master of Arts in Theology",
      category: "advanced",
      duration: "2 years",
      mode: ["On-campus", "Hybrid"],
      description: "Advanced theological study with research focus and ministry application.",
      image: "https://images.unsplash.com/photo-1533854775446-95c4609da544?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHw0fHxncmFkdWF0aW9uJTIwY2VyZW1vbnl8ZW58MHx8fHwxNzU3NzQ1NDY0fDA&ixlib=rb-4.1.0&q=85",
      highlights: ["Advanced Research", "Thesis Writing", "Theological Reflection", "Ministry Practicum"]
    },
    {
      id: 9,
      title: "Master of Arts in Leadership",
      category: "advanced",
      duration: "2 years",
      mode: ["On-campus", "Hybrid"],
      description: "Strategic leadership development for Christian organizations and ministries.",
      image: "https://images.unsplash.com/photo-1576506542790-51244b486a6b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwxfHxiaWJsZSUyMHN0dWR5fGVufDB8fHx8MTc1Nzc2MTE2M3ww&ixlib=rb-4.1.0&q=85",
      highlights: ["Strategic Leadership", "Organizational Development", "Change Management", "Leadership Coaching"]
    },
    {
      id: 10,
      title: "PhD in Theology",
      category: "advanced",
      duration: "3-5 years",
      mode: ["On-campus", "Hybrid"],
      description: "Doctoral research in specialized theological fields with original contribution to scholarship.",
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwyfHxncmFkdWF0aW9uJTIwY2VyZW1vbnl8ZW58MHx8fHwxNzU3NzQ1NDY0fDA&ixlib=rb-4.1.0&q=85",
      highlights: ["Original Research", "Dissertation", "Academic Writing", "Teaching Qualification"]
    },
    {
      id: 11,
      title: "PhD in Christian Security & Safety Management",
      category: "advanced",
      duration: "3-5 years",
      mode: ["On-campus", "Hybrid"],
      description: "Specialized doctoral program in security management for Christian organizations.",
      image: "https://images.unsplash.com/photo-1533854775446-95c4609da544?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHw0fHxncmFkdWF0aW9uJTIwY2VyZW1vbnl8ZW58MHx8fHwxNzU3NzQ1NDY0fDA&ixlib=rb-4.1.0&q=85",
      highlights: ["Security Management", "Risk Assessment", "Crisis Response", "Policy Development"]
    },

    // Skill Acquisition Programs
    {
      id: 12,
      title: "Catering & Hospitality Skills",
      category: "skill",
      duration: "6 months - 1 year",
      mode: ["On-campus"],
      description: "Practical training in culinary arts and hospitality management.",
      image: "https://images.unsplash.com/photo-1610050731641-f855ccdaf3f6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwzfHxiaWJsZSUyMHN0dWR5fGVufDB8fHx8MTc1Nzc2MTE2M3ww&ixlib=rb-4.1.0&q=85",
      highlights: ["Culinary Arts", "Food Safety", "Event Planning", "Business Management"]
    },
    {
      id: 13,
      title: "ICT & Digital Skills",
      category: "skill",
      duration: "6 months - 1 year",
      mode: ["On-campus", "Online"],
      description: "Technology skills for modern ministry and professional development.",
      image: "https://images.unsplash.com/photo-1576506542790-51244b486a6b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwxfHxiaWJsZSUyMHN0dWR5fGVufDB8fHx8MTc1Nzc2MTE2M3ww&ixlib=rb-4.1.0&q=85",
      highlights: ["Computer Skills", "Digital Media", "Web Design", "Ministry Technology"]
    }
  ];

  const filteredPrograms = selectedCategory === 'all' 
    ? programs 
    : programs.filter(program => program.category === selectedCategory);

  return (
    <div className="programs-page">
      {/* Hero Section */}
      <section className="programs-hero">
        <div className="container">
          <div className="programs-hero-content">
            <h1 className="page-title">Academic Programs</h1>
            <p className="hero-description">
              Comprehensive Christian education from Certificate to PhD levels, designed to equip leaders 
              for effective ministry and professional excellence in today's world.
            </p>
          </div>
        </div>
      </section>

      {/* Program Categories Filter */}
      <section className="filter-section">
        <div className="container">
          <div className="filter-container">
            <div className="filter-header">
              <Filter className="w-5 h-5" />
              <span>Filter by Category:</span>
            </div>
            <div className="filter-buttons">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="programs-grid section">
        <div className="container">
          <div className="grid grid-3">
            {filteredPrograms.map(program => (
              <div key={program.id} className="program-card card">
                <div className="program-image-container">
                  <img src={program.image} alt={program.title} className="program-image" />
                  <div className="program-duration-badge">
                    <Clock size={16} />
                    {program.duration}
                  </div>
                </div>
                
                <div className="card-content">
                  <h3 className="program-title">{program.title}</h3>
                  <p className="program-description">{program.description}</p>
                  
                  <div className="program-modes">
                    <div className="mode-label">
                      <Users size={16} />
                      Study Modes:
                    </div>
                    <div className="mode-tags">
                      {program.mode.map((mode, index) => (
                        <span key={index} className="mode-tag">{mode}</span>
                      ))}
                    </div>
                  </div>

                  <div className="program-highlights">
                    <h5>Program Highlights:</h5>
                    <ul>
                      {program.highlights.map((highlight, index) => (
                        <li key={index}>{highlight}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="program-actions">
                    <Link to="/admissions" className="btn btn-primary">
                      <GraduationCap size={16} />
                      Apply Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredPrograms.length === 0 && (
            <div className="no-results">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3>No programs found</h3>
              <p>Try selecting a different category to view available programs.</p>
            </div>
          )}
        </div>
      </section>

      {/* Program Features */}
      <section className="program-features section section-light">
        <div className="container">
          <div className="section-header text-center">
            <h2>Why Our Programs Stand Out</h2>
            <p>Excellence in every aspect of Christian education</p>
          </div>

          <div className="grid grid-4">
            <div className="feature-item text-center">
              <Award className="w-12 h-12 text-primary mx-auto mb-3" />
              <h4>Accredited</h4>
              <p>All programs affiliated with Triumphant Christian University of America</p>
            </div>
            <div className="feature-item text-center">
              <Users className="w-12 h-12 text-secondary mx-auto mb-3" />
              <h4>Expert Faculty</h4>
              <p>Learn from experienced theologians and ministry practitioners</p>
            </div>
            <div className="feature-item text-center">
              <BookOpen className="w-12 h-12 text-primary mx-auto mb-3" />
              <h4>Comprehensive</h4>
              <p>Balanced curriculum combining theory with practical application</p>
            </div>
            <div className="feature-item text-center">
              <GraduationCap className="w-12 h-12 text-secondary mx-auto mb-3" />
              <h4>Flexible</h4>
              <p>Multiple study modes to fit your schedule and circumstances</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="programs-cta">
        <div className="container">
          <div className="cta-content text-center">
            <h2>Ready to Start Your Academic Journey?</h2>
            <p>Choose from our comprehensive range of programs and begin your transformation today.</p>
            <div className="cta-actions">
              <Link to="/admissions" className="btn btn-primary">
                <GraduationCap size={20} />
                Start Application
              </Link>
              <Link to="/contact" className="btn btn-outline">
                Get Information
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .programs-page {
          margin-top: 80px;
        }

        .programs-hero {
          background: linear-gradient(135deg, var(--primary-blue) 0%, var(--secondary-green) 100%);
          color: white;
          padding: 6rem 0;
        }

        .programs-hero-content {
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
        }

        .filter-section {
          background: var(--gray-50);
          padding: 2rem 0;
          border-bottom: 1px solid var(--gray-200);
        }

        .filter-container {
          display: flex;
          align-items: center;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .filter-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          color: var(--text-dark);
        }

        .filter-buttons {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .filter-btn {
          padding: 0.75rem 1.5rem;
          border: 2px solid var(--gray-200);
          background: white;
          color: var(--text-dark);
          border-radius: 25px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .filter-btn:hover,
        .filter-btn.active {
          border-color: var(--primary-blue);
          background: var(--primary-blue);
          color: white;
        }

        .program-card {
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .program-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        .program-image-container {
          position: relative;
        }

        .program-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }

        .program-duration-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(30, 74, 114, 0.9);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .program-title {
          color: var(--primary-blue);
          margin-bottom: 1rem;
          font-size: 1.3rem;
        }

        .program-description {
          color: var(--text-medium);
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }

        .program-modes {
          margin-bottom: 1.5rem;
          padding: 1rem;
          background: var(--gray-50);
          border-radius: 8px;
        }

        .mode-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          color: var(--text-dark);
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
        }

        .mode-tags {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .mode-tag {
          background: var(--primary-blue);
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 15px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .program-highlights {
          margin-bottom: 2rem;
        }

        .program-highlights h5 {
          color: var(--text-dark);
          margin-bottom: 0.75rem;
          font-size: 0.95rem;
          font-weight: 600;
        }

        .program-highlights ul {
          list-style: none;
          padding: 0;
        }

        .program-highlights li {
          padding: 0.25rem 0;
          color: var(--text-medium);
          font-size: 0.9rem;
          position: relative;
          padding-left: 1rem;
        }

        .program-highlights li::before {
          content: '•';
          color: var(--secondary-green);
          position: absolute;
          left: 0;
          font-weight: bold;
        }

        .program-actions {
          margin-top: auto;
        }

        .no-results {
          text-align: center;
          padding: 4rem 2rem;
          color: var(--text-medium);
        }

        .no-results h3 {
          color: var(--text-dark);
          margin-bottom: 1rem;
        }

        .feature-item {
          padding: 2rem 1rem;
        }

        .programs-cta {
          background: linear-gradient(135deg, var(--secondary-green) 0%, var(--primary-blue) 100%);
          color: white;
          padding: 5rem 0;
        }

        .programs-cta h2 {
          color: white;
          margin-bottom: 1rem;
        }

        .programs-cta p {
          color: rgba(255, 255, 255, 0.9);
          font-size: 1.1rem;
          margin-bottom: 2rem;
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
          
          .filter-container {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          
          .filter-buttons {
            width: 100%;
            justify-content: center;
          }
          
          .program-duration-badge {
            position: static;
            margin-top: 1rem;
            align-self: flex-start;
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

export default ProgramsPage;