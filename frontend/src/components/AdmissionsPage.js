import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { GraduationCap, User, Mail, Phone, MapPin, Calendar, BookOpen, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { toast } from 'sonner';

const AdmissionsPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const programs = [
    'Certificate in Biblical Studies',
    'Certificate in Christian Ministry',
    'Certificate in Theology',
    'Certificate in Leadership & Management',
    'Certificate in Evangelism & Missions',
    'Diploma in Theology',
    'Diploma in Pastoral Ministry',
    'Diploma in Evangelism & Missions',
    'Diploma in Leadership & Management',
    'Advanced Diploma in Theology',
    'Postgraduate Diploma in Theology',
    'Master of Arts in Theology',
    'Master of Arts in Leadership',
    'Master of Arts in Peace & Conflict Resolution',
    'PhD in Theology',
    'PhD in Christian Leadership & Management',
    'PhD in Christian Security & Safety Management',
    'Catering & Hospitality Skills',
    'ICT & Digital Skills'
  ];

  const studyModes = [
    'On-campus',
    'Online',
    'Hybrid'
  ];

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL;
      const response = await fetch(`${backendUrl}/api/register-student`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: result.message
        });
        toast.success('Registration submitted successfully! Check your email for confirmation.');
        reset();
      } else {
        throw new Error(result.detail || 'Registration failed');
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: error.message || 'Registration failed. Please try again.'
      });
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const requirements = [
    'Completed high school education or equivalent',
    'Valid identification document',
    'Passport photograph',
    'Personal statement of faith',
    'Two character references',
    'Academic transcripts (for advanced programs)'
  ];

  const steps = [
    {
      number: 1,
      title: 'Complete Application',
      description: 'Fill out the online registration form with accurate information'
    },
    {
      number: 2,
      title: 'Email Confirmation',
      description: 'Receive confirmation email with next steps and requirements'
    },
    {
      number: 3,
      title: 'Document Submission',
      description: 'Submit required documents as outlined in confirmation email'
    },
    {
      number: 4,
      title: 'Review Process',
      description: 'Admissions team reviews application within 5-7 business days'
    },
    {
      number: 5,
      title: 'Acceptance',
      description: 'Receive acceptance letter and enrollment instructions'
    }
  ];

  return (
    <div className="admissions-page">
      {/* Hero Section */}
      <section className="admissions-hero">
        <div className="container">
          <div className="admissions-hero-content">
            <h1 className="page-title">Admissions & Registration</h1>
            <p className="hero-description">
              Begin your journey of academic excellence and character development. 
              Apply now for the 2025-2026 academic year starting September.
            </p>
            <div className="hero-highlight">
              <CheckCircle className="w-6 h-6" />
              <span>Applications now open for September 2025 intake</span>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Process */}
      <section className="process-section section">
        <div className="container">
          <div className="section-header text-center">
            <h2>Registration Process</h2>
            <p>Simple steps to begin your academic journey</p>
          </div>

          <div className="steps-container">
            {steps.map((step, index) => (
              <div key={index} className="step-item">
                <div className="step-number">{step.number}</div>
                <div className="step-content">
                  <h4>{step.title}</h4>
                  <p>{step.description}</p>
                </div>
                {index < steps.length - 1 && <div className="step-connector"></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="registration-form-section section section-light">
        <div className="container">
          <div className="form-container">
            <div className="form-header text-center">
              <GraduationCap className="w-16 h-16 text-primary mx-auto mb-4" />
              <h2>Student Registration Form</h2>
              <p>Complete this form to begin your application process</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="registration-form">
              <div className="form-grid">
                {/* Personal Information */}
                <div className="form-section">
                  <h3 className="form-section-title">
                    <User className="w-5 h-5" />
                    Personal Information
                  </h3>

                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Enter your full name"
                      {...register('full_name', { 
                        required: 'Full name is required',
                        minLength: { value: 2, message: 'Name must be at least 2 characters' }
                      })}
                    />
                    {errors.full_name && (
                      <span className="error-message">{errors.full_name.message}</span>
                    )}
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Date of Birth *</label>
                      <input
                        type="date"
                        className="form-input"
                        {...register('date_of_birth', { required: 'Date of birth is required' })}
                      />
                      {errors.date_of_birth && (
                        <span className="error-message">{errors.date_of_birth.message}</span>
                      )}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Gender *</label>
                      <select
                        className="form-select"
                        {...register('gender', { required: 'Gender is required' })}
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                      {errors.gender && (
                        <span className="error-message">{errors.gender.message}</span>
                      )}
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Address *</label>
                    <textarea
                      className="form-textarea"
                      placeholder="Enter your full address"
                      rows="3"
                      {...register('address', { required: 'Address is required' })}
                    />
                    {errors.address && (
                      <span className="error-message">{errors.address.message}</span>
                    )}
                  </div>
                </div>

                {/* Contact Information */}
                <div className="form-section">
                  <h3 className="form-section-title">
                    <Phone className="w-5 h-5" />
                    Contact Information
                  </h3>

                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input
                      type="email"
                      className="form-input"
                      placeholder="your.email@example.com"
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

                {/* Academic Information */}
                <div className="form-section">
                  <h3 className="form-section-title">
                    <BookOpen className="w-5 h-5" />
                    Academic Information
                  </h3>

                  <div className="form-group">
                    <label className="form-label">Educational Background *</label>
                    <textarea
                      className="form-textarea"
                      placeholder="Describe your educational background (schools attended, qualifications obtained)"
                      rows="4"
                      {...register('educational_background', { required: 'Educational background is required' })}
                    />
                    {errors.educational_background && (
                      <span className="error-message">{errors.educational_background.message}</span>
                    )}
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Program Applied For *</label>
                      <select
                        className="form-select"
                        {...register('program_applied', { required: 'Program selection is required' })}
                      >
                        <option value="">Select Program</option>
                        {programs.map((program, index) => (
                          <option key={index} value={program}>{program}</option>
                        ))}
                      </select>
                      {errors.program_applied && (
                        <span className="error-message">{errors.program_applied.message}</span>
                      )}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Preferred Study Mode *</label>
                      <select
                        className="form-select"
                        {...register('study_mode', { required: 'Study mode is required' })}
                      >
                        <option value="">Select Study Mode</option>
                        {studyModes.map((mode, index) => (
                          <option key={index} value={mode}>{mode}</option>
                        ))}
                      </select>
                      {errors.study_mode && (
                        <span className="error-message">{errors.study_mode.message}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="form-submit">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary submit-btn"
                >
                  {isSubmitting ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Submitting Application...
                    </>
                  ) : (
                    <>
                      <GraduationCap className="w-5 h-5" />
                      Submit Registration
                    </>
                  )}
                </button>
              </div>

              {/* Status Message */}
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

      {/* Requirements Section */}
      <section className="requirements-section section">
        <div className="container">
          <div className="grid grid-2">
            <div className="requirements-content">
              <h2>Admission Requirements</h2>
              <p>Ensure you meet the following requirements before applying:</p>
              
              <ul className="requirements-list">
                {requirements.map((requirement, index) => (
                  <li key={index}>
                    <CheckCircle className="w-5 h-5 text-secondary" />
                    <span>{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="info-cards">
              <div className="info-card card">
                <div className="card-content">
                  <Calendar className="w-8 h-8 text-primary mb-3" />
                  <h4>Important Dates</h4>
                  <ul>
                    <li>Application Deadline: August 31, 2025</li>
                    <li>Classes Begin: September 2025</li>
                    <li>Orientation: First week of September</li>
                  </ul>
                </div>
              </div>

              <div className="info-card card">
                <div className="card-content">
                  <Mail className="w-8 h-8 text-secondary mb-3" />
                  <h4>Need Help?</h4>
                  <p>Contact our admissions office:</p>
                  <ul>
                    <li>Email: wohibc2025@gmail.com</li>
                    <li>Phone: +234 904 252 0176</li>
                    <li>Phone: +234 915 778 8318</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .admissions-page {
          margin-top: 80px;
        }

        .admissions-hero {
          background: linear-gradient(135deg, var(--primary-blue) 0%, var(--secondary-green) 100%);
          color: white;
          padding: 6rem 0;
        }

        .admissions-hero-content {
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

        .steps-container {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          position: relative;
          margin: 4rem 0;
        }

        .step-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          flex: 1;
          position: relative;
          max-width: 200px;
        }

        .step-number {
          width: 60px;
          height: 60px;
          background: var(--primary-blue);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          box-shadow: 0 4px 15px rgba(30, 74, 114, 0.3);
        }

        .step-content h4 {
          color: var(--primary-blue);
          margin-bottom: 0.5rem;
          font-size: 1.1rem;
        }

        .step-content p {
          color: var(--text-medium);
          font-size: 0.9rem;
          line-height: 1.5;
        }

        .step-connector {
          position: absolute;
          top: 30px;
          left: 60px;
          right: -60px;
          height: 2px;
          background: var(--gray-200);
          z-index: -1;
        }

        .step-item:last-child .step-connector {
          display: none;
        }

        .form-container {
          max-width: 1000px;
          margin: 0 auto;
        }

        .form-header {
          margin-bottom: 3rem;
        }

        .form-header h2 {
          color: var(--primary-blue);
          margin-bottom: 1rem;
        }

        .registration-form {
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
          color: var(--primary-blue);
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid var(--primary-blue);
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
          border-color: var(--primary-blue);
          box-shadow: 0 0 0 3px rgba(30, 74, 114, 0.1);
        }

        .form-textarea {
          resize: vertical;
          min-height: 100px;
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
          min-width: 250px;
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

        .requirements-list {
          list-style: none;
          padding: 0;
        }

        .requirements-list li {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          margin-bottom: 1rem;
          padding: 0.5rem 0;
        }

        .requirements-list svg {
          margin-top: 2px;
          flex-shrink: 0;
        }

        .info-cards {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .info-card .card-content {
          text-align: center;
        }

        .info-card h4 {
          color: var(--primary-blue);
          margin-bottom: 1rem;
        }

        .info-card ul {
          list-style: none;
          padding: 0;
          text-align: left;
        }

        .info-card li {
          padding: 0.25rem 0;
          color: var(--text-medium);
          font-size: 0.95rem;
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

          .steps-container {
            flex-direction: column;
            gap: 2rem;
          }

          .step-connector {
            display: none;
          }

          .registration-form {
            padding: 2rem;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .form-section {
            padding: 1.5rem;
          }

          .submit-btn {
            min-width: 200px;
          }
        }
      `}</style>
    </div>
  );
};

export default AdmissionsPage;