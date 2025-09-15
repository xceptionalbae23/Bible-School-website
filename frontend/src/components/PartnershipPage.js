import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Heart, Users, Building2, DollarSign, BookOpen, CheckCircle, AlertCircle, Loader, Handshake, Target, Globe } from 'lucide-react';
import { toast } from 'sonner';

const PartnershipPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const partnershipTypes = [
    'Scholarship Funding',
    'Infrastructure Development',
    'Internship Programs',
    'Ministry Support',
    'Research Grants',
    'Faculty Exchange',
    'Library Resources',
    'Technology Support',
    'Event Sponsorship',
    'General Partnership'
  ];

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File size must be less than 10MB');
        return;
      }
      
      // Check file type
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        toast.error('Please upload PDF, Word document, or image files only');
        return;
      }
      
      setSelectedFile(file);
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL;
      
      // Create FormData for file upload
      const formData = new FormData();
      Object.keys(data).forEach(key => {
        formData.append(key, data[key]);
      });
      
      // Add file if selected
      if (selectedFile) {
        formData.append('document', selectedFile);
      }

      const response = await fetch(`${backendUrl}/api/submit-partnership`, {
        method: 'POST',
        body: formData, // Don't set Content-Type header for FormData
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: result.message
        });
        toast.success('Partnership application submitted successfully!');
        reset();
        setSelectedFile(null);
        // Reset file input
        const fileInput = document.getElementById('partnership-document-upload');
        if (fileInput) fileInput.value = '';
      } else {
        throw new Error(result.detail || 'Partnership submission failed');
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: error.message || 'Partnership submission failed. Please try again.'
      });
      toast.error('Partnership submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const partnershipOpportunities = [
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Scholarship Funding",
      description: "Support deserving students by providing scholarships for tuition and living expenses.",
      impact: "Direct impact on student lives and ministry preparation"
    },
    {
      icon: <Building2 className="w-8 h-8" />,
      title: "Infrastructure Development",
      description: "Partner with us in building classrooms, libraries, and student facilities.",
      impact: "Long-term improvement in educational infrastructure"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Internship Programs",
      description: "Provide practical training opportunities for our students in your organization.",
      impact: "Professional development and real-world experience"
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Ministry Support",
      description: "Support our mission through ministry partnerships and collaborative programs.",
      impact: "Expansion of Christian education and leadership training"
    }
  ];

  const benefits = [
    "Recognition as official partner of WHIBC",
    "Annual partnership appreciation events",
    "Regular updates on institutional progress",
    "Opportunity to address students and faculty",
    "Access to graduate talent pool for recruitment",
    "Joint research and publication opportunities",
    "Prayer partnership and spiritual fellowship",
    "Legacy building in Christian education"
  ];

  const testimonials = [
    {
      name: "Grace Foundation",
      type: "Scholarship Partner",
      message: "Partnering with WHIBC has been incredibly rewarding. We've seen our scholarship recipients become effective ministry leaders across Africa."
    },
    {
      name: "Life Church International",
      type: "Ministry Partner",
      message: "The partnership has enriched our ministry through the excellent graduates who have joined our team. Their theological foundation is outstanding."
    }
  ];

  return (
    <div className="partnership-page">
      {/* Hero Section */}
      <section className="partnership-hero">
        <div className="container">
          <div className="partnership-hero-content">
            <h1 className="page-title">Partnership Opportunities</h1>
            <p className="hero-description">
              Join us in shaping the future of Christian leadership. Together, we can impact nations 
              and transform communities through excellence in theological education.
            </p>
            <div className="hero-stats">
              <div className="stat-item">
                <Globe className="w-6 h-6" />
                <span>Global Impact</span>
              </div>
              <div className="stat-item">
                <Target className="w-6 h-6" />
                <span>Strategic Vision</span>
              </div>
              <div className="stat-item">
                <Heart className="w-6 h-6" />
                <span>Kingdom Purpose</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Vision */}
      <section className="vision-section section">
        <div className="container">
          <div className="vision-content text-center">
            <Handshake className="w-16 h-16 text-primary mx-auto mb-4" />
            <h2>Our Partnership Vision</h2>
            <p className="lead">
              We believe in the power of strategic partnerships to advance God's kingdom. 
              By joining forces with like-minded organizations, churches, and individuals, 
              we multiply our impact in training Christian leaders who will shape nations.
            </p>
          </div>
        </div>
      </section>

      {/* Partnership Opportunities */}
      <section className="opportunities-section section section-light">
        <div className="container">
          <div className="section-header text-center">
            <h2>Partnership Opportunities</h2>
            <p>Multiple ways to partner with us in advancing Christian education</p>
          </div>

          <div className="grid grid-2">
            {partnershipOpportunities.map((opportunity, index) => (
              <div key={index} className="opportunity-card card">
                <div className="card-content">
                  <div className="opportunity-icon text-primary mb-3">
                    {opportunity.icon}
                  </div>
                  <h3>{opportunity.title}</h3>
                  <p className="opportunity-description">{opportunity.description}</p>
                  <div className="opportunity-impact">
                    <strong>Impact:</strong> {opportunity.impact}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Form */}
      <section className="partnership-form-section section">
        <div className="container">
          <div className="form-container">
            <div className="form-header text-center">
              <Heart className="w-16 h-16 text-secondary mx-auto mb-4" />
              <h2>Partnership Application Form</h2>
              <p>Begin your partnership journey with WHIBC</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="partnership-form">
              <div className="form-grid">
                <div className="form-section">
                  <h3 className="form-section-title">
                    <Building2 className="w-5 h-5" />
                    Organization Information
                  </h3>

                  <div className="form-group">
                    <label className="form-label">Organization/Individual Name *</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Enter organization or individual name"
                      {...register('organization_name', { 
                        required: 'Organization/Individual name is required',
                        minLength: { value: 2, message: 'Name must be at least 2 characters' }
                      })}
                    />
                    {errors.organization_name && (
                      <span className="error-message">{errors.organization_name.message}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Contact Person *</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Name of primary contact person"
                      {...register('contact_person', { 
                        required: 'Contact person is required',
                        minLength: { value: 2, message: 'Name must be at least 2 characters' }
                      })}
                    />
                    {errors.contact_person && (
                      <span className="error-message">{errors.contact_person.message}</span>
                    )}
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Email Address *</label>
                      <input
                        type="email"
                        className="form-input"
                        placeholder="contact@organization.com"
                        {...register('email', { 
                          required: 'Email is required',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address'
                          }
                        })}
                      />
                      {errors.email && (
                        <span className="error-message">{errors.email.message}</span>
                      )}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Phone Number *</label>
                      <input
                        type="tel"
                        className="form-input"
                        placeholder="+234 XXX XXX XXXX"
                        {...register('phone_number', { 
                          required: 'Phone number is required',
                          minLength: { value: 10, message: 'Phone number must be at least 10 digits' }
                        })}
                      />
                      {errors.phone_number && (
                        <span className="error-message">{errors.phone_number.message}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h3 className="form-section-title">
                    <Handshake className="w-5 h-5" />
                    Partnership Details
                  </h3>

                  <div className="form-group">
                    <label className="form-label">Type of Partnership *</label>
                    <select
                      className="form-select"
                      {...register('partnership_type', { required: 'Partnership type is required' })}
                    >
                      <option value="">Select Partnership Type</option>
                      {partnershipTypes.map((type, index) => (
                        <option key={index} value={type}>{type}</option>
                      ))}
                    </select>
                    {errors.partnership_type && (
                      <span className="error-message">{errors.partnership_type.message}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Message & Partnership Vision *</label>
                    <textarea
                      className="form-textarea"
                      placeholder="Tell us about your organization and how you envision partnering with WHIBC. What motivates you to support Christian education?"
                      rows="6"
                      {...register('message', { 
                        required: 'Message is required',
                        minLength: { value: 50, message: 'Please provide more details (minimum 50 characters)' }
                      })}
                    />
                    {errors.message && (
                      <span className="error-message">{errors.message.message}</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="form-submit">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-secondary submit-btn"
                >
                  {isSubmitting ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Submitting Application...
                    </>
                  ) : (
                    <>
                      <Heart className="w-5 h-5" />
                      Submit Partnership Application
                    </>
                  )}
                </button>
              </div>

              {submitStatus && (
                <div className={`status-message ${submitStatus.type === 'success' ? 'status-success' : 'status-error'}`}>
                  {submitStatus.type === 'success' ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <AlertCircle className="w-5 h-5" />
                  )}
                  <span>{submitStatus.message}</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Partnership Benefits */}
      <section className="benefits-section section section-light">
        <div className="container">
          <div className="grid grid-2">
            <div className="benefits-content">
              <h2>Partnership Benefits</h2>
              <p>When you partner with WHIBC, you become part of a global movement for Christian excellence.</p>
              
              <ul className="benefits-list">
                {benefits.map((benefit, index) => (
                  <li key={index}>
                    <CheckCircle className="w-5 h-5 text-secondary" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="testimonials">
              <h3>Partner Testimonials</h3>
              {testimonials.map((testimonial, index) => (
                <div key={index} className="testimonial-card card">
                  <div className="card-content">
                    <p>"{testimonial.message}"</p>
                    <div className="testimonial-author">
                      <strong>{testimonial.name}</strong>
                      <span>{testimonial.type}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .partnership-page {
          margin-top: 80px;
        }

        .partnership-hero {
          background: linear-gradient(135deg, var(--secondary-green) 0%, var(--primary-blue) 100%);
          color: white;
          padding: 6rem 0;
        }

        .partnership-hero-content {
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
          margin-bottom: 3rem;
        }

        .hero-stats {
          display: flex;
          justify-content: center;
          gap: 3rem;
          flex-wrap: wrap;
        }

        .stat-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          padding: 1rem 2rem;
          border-radius: 50px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          font-weight: 600;
        }

        .vision-content {
          max-width: 800px;
          margin: 0 auto;
        }

        .lead {
          font-size: 1.25rem;
          line-height: 1.7;
          color: var(--text-medium);
        }

        .opportunity-card {
          text-align: center;
          transition: all 0.3s ease;
        }

        .opportunity-card:hover {
          transform: translateY(-8px);
        }

        .opportunity-icon {
          display: inline-flex;
          padding: 1rem;
          background: var(--light-blue);
          border-radius: 50%;
        }

        .opportunity-description {
          margin-bottom: 1rem;
          color: var(--text-medium);
        }

        .opportunity-impact {
          padding: 1rem;
          background: var(--light-green);
          border-radius: 8px;
          color: var(--secondary-green);
          font-size: 0.9rem;
        }

        .form-container {
          max-width: 900px;
          margin: 0 auto;
        }

        .form-header {
          margin-bottom: 3rem;
        }

        .form-header h2 {
          color: var(--primary-blue);
          margin-bottom: 1rem;
        }

        .partnership-form {
          background: white;
          padding: 3rem;
          border-radius: 20px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
        }

        .form-grid {
          display: grid;
          gap: 3rem;
        }

        .form-section {
          padding: 2rem;
          border: 1px solid var(--gray-200);
          border-radius: 15px;
          background: var(--gray-50);
        }

        .form-section-title {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: var(--secondary-green);
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid var(--secondary-green);
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: var(--text-dark);
        }

        .form-input,
        .form-select,
        .form-textarea {
          width: 100%;
          padding: 1rem;
          border: 2px solid var(--gray-200);
          border-radius: 10px;
          font-family: 'Source Sans Pro', sans-serif;
          transition: all 0.3s ease;
          background: white;
        }

        .form-input:focus,
        .form-select:focus,
        .form-textarea:focus {
          outline: none;
          border-color: var(--secondary-green);
          box-shadow: 0 0 0 3px rgba(46, 125, 50, 0.1);
        }

        .form-textarea {
          resize: vertical;
          min-height: 120px;
        }

        .error-message {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #dc3545;
          font-size: 0.85rem;
          margin-top: 0.5rem;
        }

        .form-submit {
          text-align: center;
          margin-top: 2rem;
        }

        .submit-btn {
          min-width: 300px;
          padding: 1rem 2rem;
          font-size: 1.1rem;
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .status-message {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem;
          border-radius: 10px;
          margin-top: 1rem;
          font-weight: 500;
        }

        .benefits-list {
          list-style: none;
          padding: 0;
        }

        .benefits-list li {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          margin-bottom: 1rem;
          padding: 0.5rem 0;
        }

        .benefits-list svg {
          margin-top: 2px;
          flex-shrink: 0;
        }

        .testimonials h3 {
          color: var(--primary-blue);
          margin-bottom: 2rem;
        }

        .testimonial-card {
          margin-bottom: 2rem;
        }

        .testimonial-card p {
          font-style: italic;
          color: var(--text-medium);
          margin-bottom: 1rem;
        }

        .testimonial-author strong {
          display: block;
          color: var(--primary-blue);
          font-weight: 600;
        }

        .testimonial-author span {
          color: var(--secondary-green);
          font-size: 0.9rem;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }

        @media (max-width: 768px) {
          .page-title {
            font-size: 2.5rem;
          }

          .hero-stats {
            gap: 1.5rem;
          }

          .stat-item {
            padding: 0.75rem 1.5rem;
            font-size: 0.9rem;
          }

          .partnership-form {
            padding: 2rem;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .form-section {
            padding: 1.5rem;
          }

          .submit-btn {
            min-width: 250px;
          }
        }
      `}</style>
    </div>
  );
};

export default PartnershipPage;