import React from 'react';
import { Award, Users, Globe, BookOpen, Target, Heart, CheckCircle } from 'lucide-react';

const AboutPage = () => {
  const milestones = [
    {
      year: "1999",
      title: "Founded",
      description: "Word of Hope International Bible College was established with a vision for excellence"
    },
    {
      year: "2005",
      title: "Accreditation",
      description: "Affiliated with Triumphant Christian University of America"
    },
    {
      year: "2010",
      title: "International Expansion",
      description: "Opened Nigeria Study Centre to serve African students"
    },
    {
      year: "2025",
      title: "New Academic Year",
      description: "Launching enhanced programs and digital learning initiatives"
    }
  ];

  const values = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Academic Excellence",
      description: "Commitment to highest standards in theological education and research"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Character Development",
      description: "Nurturing spiritual growth alongside intellectual development"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Vision",
      description: "Training leaders for worldwide Christian ministry and service"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community Impact",
      description: "Equipping graduates to transform their communities"
    }
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="about-hero-content">
            <h1 className="page-title">About Word of Hope International Bible College</h1>
            <p className="hero-description">
              For over two decades, WHIBC has been at the forefront of Christian theological education, 
              training leaders who impact nations and transform communities through the power of God's Word.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="vision-mission section">
        <div className="container">
          <div className="grid grid-2">
            <div className="vision-card card">
              <div className="card-content">
                <div className="card-icon">
                  <Target className="w-12 h-12 text-primary" />
                </div>
                <h3>Our Vision</h3>
                <p>
                  To be the leading international Christian university, producing world-class graduates 
                  who will impact their generation and beyond through excellence in academic achievement 
                  and character development.
                </p>
              </div>
            </div>

            <div className="mission-card card">
              <div className="card-content">
                <div className="card-icon">
                  <Award className="w-12 h-12 text-secondary" />
                </div>
                <h3>Our Mission</h3>
                <p>
                  To provide comprehensive Christian education that combines academic excellence with 
                  character formation, advanced research capabilities, and practical ministry training 
                  for leaders at national and global levels.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="values-section section section-light">
        <div className="container">
          <div className="section-header text-center">
            <h2>Our Core Values</h2>
            <p>The principles that guide everything we do</p>
          </div>

          <div className="grid grid-4">
            {values.map((value, index) => (
              <div key={index} className="value-card card">
                <div className="card-content text-center">
                  <div className="value-icon text-primary mb-3">
                    {value.icon}
                  </div>
                  <h4>{value.title}</h4>
                  <p>{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="leadership-section section">
        <div className="container">
          <div className="section-header text-center">
            <h2>Our Leadership Team</h2>
            <p>Experienced leaders committed to excellence in Christian education</p>
          </div>

          <div className="leadership-grid">
            <div className="leader-profile card">
              <div className="leader-image-container">
                <img 
                  src="/images/about/about1.jpeg" 
                  alt="Apostle Sandra Ross" 
                  className="leader-image"
                />
              </div>
              <div className="card-content">
                <h3>Apostle Sandra Ross</h3>
                <div className="leader-title">President/Founder</div>
                <div className="leader-location">Canada</div>
                
                <div className="leader-bio">
                  <p>
                    Apostle Sandra Ross is the visionary founder and President of Word of Hope International 
                    Bible College. With decades of experience in Christian ministry and education, she has 
                    dedicated her life to raising up the next generation of Christian leaders.
                  </p>
                  
                  <div className="leader-highlights">
                    <h5>Leadership Highlights:</h5>
                    <ul>
                      <li><CheckCircle size={16} /> Founded WHIBC with a vision for global impact</li>
                      <li><CheckCircle size={16} /> Established international partnerships</li>
                      <li><CheckCircle size={16} /> Developed innovative Christian education programs</li>
                      <li><CheckCircle size={16} /> Mentored thousands of ministry leaders worldwide</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="leader-profile card">
              <div className="leader-image-container">
                <img 
                  src="/images/about/about2.jpeg" 
                  alt="Apostle Dr. Lawyer Isiwekpeni Ekpah" 
                  className="leader-image"
                />
              </div>
              <div className="card-content">
                <h3>Apostle Dr. Lawyer Isiwekpeni Ekpah</h3>
                <div className="leader-title">Vice President/Rector (Bishop-Elect)</div>
                <div className="leader-location">PhD, Nigeria & Canada</div>
                
                <div className="leader-bio">
                  <p>
                    <strong>Early Life & Salvation:</strong> Born into an Anglican family, Apostle Dr. Lawyer Isiwekpeni Ekpah was transformed in 1997 from chronic unbelief to powerful faith when God revealed Himself personally. Married to Chidinma Bridget Isiwekpeni with four children, he serves as the only surviving son of his father, preserved by God's grace.
                  </p>

                  <p>
                    <strong>Military & Medical Service:</strong> Served with honor in the Nigerian Air Force (1996-2021) as a Nurse Medic in various hospitals and international peacekeeping operations in Northern Sudan. While on foreign mission in Engelina, Northern Sudan (2011), he assisted in planting churches and baptizing new believers.
                  </p>

                  <p>
                    <strong>Ministry Calling:</strong> Founder and Senior Pastor of Life Giving Word Mission Inc (City of Solution Church, Enugu State, Nigeria) - an international evangelical movement dedicated to preaching the Gospel of Jesus Christ and meeting human needs without discrimination.
                  </p>
                  
                  <div className="leader-highlights">
                    <h5>Academic & Professional Qualifications:</h5>
                    <ul>
                      <li><CheckCircle size={16} /> PhD in Theology - Shiloh Spiritual Defence Academy</li>
                      <li><CheckCircle size={16} /> M.Th. in Theology (2021)</li>
                      <li><CheckCircle size={16} /> B.A. in Theology - International Christian University, Lagos</li>
                      <li><CheckCircle size={16} /> Honorary Doctor of Divinity (2022)</li>
                      <li><CheckCircle size={16} /> Nigerian Army School of Nursing & Midwifery Graduate</li>
                      <li><CheckCircle size={16} /> UN Diplomas in Peace, Conflict Resolution & Humanitarian Law</li>
                    </ul>
                  </div>

                  <div className="leader-highlights">
                    <h5>Ministry & Publications:</h5>
                    <ul>
                      <li><CheckCircle size={16} /> Author: "The Secret of a Successful Christian Marriage" (2015)</li>
                      <li><CheckCircle size={16} /> Writer: "The Voice of Grace Devotional"</li>
                      <li><CheckCircle size={16} /> Marriage Counselor & Bible School Lecturer</li>
                      <li><CheckCircle size={16} /> International Minister - ordained worldwide</li>
                    </ul>
                  </div>

                  <div className="leader-highlights">
                    <h5>Ministry Vision & Mission:</h5>
                    <ul>
                      <li><CheckCircle size={16} /> Preach the Gospel to all nations</li>
                      <li><CheckCircle size={16} /> Serve through Medical Mission Outreach</li>
                      <li><CheckCircle size={16} /> Train, ordain, and license candidates for ministry</li>
                      <li><CheckCircle size={16} /> Make education accessible through nonprofit institutions</li>
                      <li><CheckCircle size={16} /> Partner with mission-minded ministries worldwide</li>
                    </ul>
                  </div>

                  <div className="contact-info">
                    <h5>Ministry Contact:</h5>
                    <p><strong>Email:</strong> lifegivingwordmission@gmail.com</p>
                    <p><strong>YouTube:</strong> Lifegivingwordmission</p>
                    <p><strong>Facebook:</strong> Lifegivingwordmission</p>
                    <p><strong>Mandate:</strong> Matthew 28:19-20 - "Go ye therefore, and teach all nations..."</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* History & Milestones */}
      <section className="history-section section section-light">
        <div className="container">
          <div className="section-header text-center">
            <h2>Our Journey</h2>
            <p>Key milestones in our commitment to excellence</p>
          </div>

          <div className="timeline">
            {milestones.map((milestone, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-marker">
                  <div className="timeline-year">{milestone.year}</div>
                </div>
                <div className="timeline-content card">
                  <div className="card-content">
                    <h4>{milestone.title}</h4>
                    <p>{milestone.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accreditation */}
      <section className="accreditation-section section">
        <div className="container">
          <div className="accreditation-content text-center">
            <Award className="w-16 h-16 text-accent mx-auto mb-4" />
            <h2>Accreditation & Affiliation</h2>
            <p className="lead">
              Word of Hope International Bible College is proudly affiliated with 
              <strong> Triumphant Christian University of America</strong>, ensuring our programs 
              meet the highest international standards for Christian higher education.
            </p>
            
            <div className="accreditation-details">
              <div className="accreditation-address">
                <h4>Triumphant Christian University of America</h4>
                <p>1600, Golf Road, Corporate Center, Suite 1200<br />Rolling Meadows, IL 6000B</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .about-page {
          margin-top: 80px;
        }

        .about-hero {
          background: linear-gradient(135deg, var(--primary-blue) 0%, var(--secondary-green) 100%);
          color: white;
          padding: 6rem 0;
        }

        .about-hero-content {
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

        .card-icon {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 80px;
          height: 80px;
          background: var(--light-blue);
          border-radius: 50%;
          margin: 0 auto 1.5rem;
        }

        .value-icon {
          display: inline-flex;
          padding: 1rem;
          background: var(--light-blue);
          border-radius: 50%;
        }

        .leadership-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 3rem;
          max-width: 1000px;
          margin: 0 auto;
        }

        .leader-profile {
          text-align: center;
        }

        .leader-image-container {
          position: relative;
          margin-bottom: 2rem;
        }

        .leader-image {
          width: 200px;
          height: 200px;
          border-radius: 50%;
          object-fit: cover;
          margin: 0 auto;
          border: 5px solid var(--light-blue);
        }

        .leader-title {
          color: var(--primary-blue);
          font-weight: 600;
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
        }

        .leader-location {
          color: var(--secondary-green);
          font-weight: 500;
          margin-bottom: 1.5rem;
        }

        .leader-bio {
          text-align: left;
        }

        .leader-highlights {
          margin-top: 2rem;
          padding: 1.5rem;
          background: var(--gray-50);
          border-radius: 10px;
        }

        .leader-highlights h5 {
          color: var(--primary-blue);
          margin-bottom: 1rem;
          font-weight: 600;
        }

        .leader-highlights ul {
          list-style: none;
          padding: 0;
        }

        .leader-highlights li {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
          color: var(--text-medium);
        }

        .leader-highlights svg {
          color: var(--secondary-green);
          flex-shrink: 0;
        }

        .contact-info {
          margin-top: 2rem;
          padding: 1.5rem;
          background: var(--light-green);
          border-radius: 10px;
          border-left: 4px solid var(--secondary-green);
        }

        .contact-info h5 {
          color: var(--secondary-green);
          margin-bottom: 1rem;
          font-weight: 600;
        }

        .contact-info p {
          color: var(--text-dark);
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
        }

        .leader-bio p {
          margin-bottom: 1.5rem;
          line-height: 1.7;
        }

        .leader-bio p strong {
          color: var(--primary-blue);
          font-weight: 600;
        }

        .timeline {
          max-width: 800px;
          margin: 0 auto;
          position: relative;
        }

        .timeline::before {
          content: '';
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 2px;
          background: var(--primary-blue);
          transform: translateX(-50%);
        }

        .timeline-item {
          display: flex;
          align-items: center;
          margin-bottom: 3rem;
          position: relative;
        }

        .timeline-item:nth-child(odd) {
          flex-direction: row;
        }

        .timeline-item:nth-child(even) {
          flex-direction: row-reverse;
        }

        .timeline-marker {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          z-index: 2;
        }

        .timeline-year {
          background: var(--primary-blue);
          color: white;
          padding: 1rem 1.5rem;
          border-radius: 50px;
          font-weight: 700;
          font-size: 1.1rem;
          white-space: nowrap;
        }

        .timeline-content {
          flex: 1;
          max-width: 45%;
          margin: 0 2rem;
        }

        .timeline-item:nth-child(odd) .timeline-content {
          margin-right: auto;
          margin-left: 2rem;
        }

        .timeline-item:nth-child(even) .timeline-content {
          margin-left: auto;
          margin-right: 2rem;
        }

        .accreditation-content {
          max-width: 800px;
          margin: 0 auto;
        }

        .lead {
          font-size: 1.25rem;
          line-height: 1.7;
          margin-bottom: 2rem;
        }

        .accreditation-details {
          background: var(--light-blue);
          padding: 2rem;
          border-radius: 15px;
          margin-top: 3rem;
        }

        .accreditation-address h4 {
          color: var(--primary-blue);
          margin-bottom: 1rem;
        }

        @media (max-width: 768px) {
          .page-title {
            font-size: 2.5rem;
          }

          .leadership-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .leader-image {
            width: 150px;
            height: 150px;
          }

          .timeline::before {
            left: 30px;
          }

          .timeline-item {
            flex-direction: row !important;
          }

          .timeline-marker {
            left: 30px;
          }

          .timeline-content {
            max-width: none;
            margin-left: 80px !important;
            margin-right: 0 !important;
          }

          .value-card {
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
};

export default AboutPage;