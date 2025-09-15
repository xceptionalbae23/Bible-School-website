import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Lock, User, Eye, EyeOff, Shield, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { toast } from 'sonner';

const AdminLogin = ({ onLoginSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const onSubmit = async (data) => {
    setIsLoading(true);
    setLoginError('');

    try {
      const response = await fetch(`${backendUrl}/api/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        // Store token in localStorage
        localStorage.setItem('admin_token', result.access_token);
        localStorage.setItem('admin_info', JSON.stringify(result.admin_info));
        
        toast.success('Login successful! Welcome to WHIBC Admin Dashboard.');
        
        // Call the success callback
        onLoginSuccess(result);
        
        reset();
      } else {
        setLoginError(result.detail || 'Login failed. Please check your credentials.');
        toast.error('Login failed. Please check your credentials.');
      }
    } catch (error) {
      setLoginError('Login failed. Please try again.');
      toast.error('Login failed. Please try again.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-login">
      <div className="login-container">
        <div className="login-header">
          <Shield className="w-16 h-16 text-primary mx-auto mb-4" />
          <h1>WHIBC Admin Login</h1>
          <p>Access the administrative dashboard</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
          <div className="form-group">
            <label className="form-label">
              <User className="w-5 h-5" />
              Username
            </label>
            <input
              type="text"
              className="form-input"
              placeholder="Enter your username"
              {...register('username', { 
                required: 'Username is required',
                minLength: { value: 3, message: 'Username must be at least 3 characters' }
              })}
            />
            {errors.username && (
              <span className="error-message">
                <AlertCircle className="w-4 h-4" />
                {errors.username.message}
              </span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">
              <Lock className="w-5 h-5" />
              Password
            </label>
            <div className="password-input-container">
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-input"
                placeholder="Enter your password"
                {...register('password', { 
                  required: 'Password is required',
                  minLength: { value: 6, message: 'Password must be at least 6 characters' }
                })}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && (
              <span className="error-message">
                <AlertCircle className="w-4 h-4" />
                {errors.password.message}
              </span>
            )}
          </div>

          {loginError && (
            <div className="login-error">
              <AlertCircle className="w-5 h-5" />
              <span>{loginError}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary login-btn"
          >
            {isLoading ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                Logging in...
              </>
            ) : (
              <>
                <Shield className="w-5 h-5" />
                Login to Dashboard
              </>
            )}
          </button>
        </form>

        <div className="login-info">
          <div className="info-card">
            <h4>Admin Access</h4>
            <p>This dashboard provides access to:</p>
            <ul>
              <li><CheckCircle className="w-4 h-4" /> Student registrations</li>
              <li><CheckCircle className="w-4 h-4" /> Partnership applications</li>
              <li><CheckCircle className="w-4 h-4" /> Gallery management</li>
              <li><CheckCircle className="w-4 h-4" /> System statistics</li>
            </ul>
          </div>

          <div className="demo-credentials">
            <h5>Demo Credentials:</h5>
            <div className="credential-item">
              <strong>Username:</strong> admin<br />
              <strong>Password:</strong> whibc2025
            </div>
            <div className="credential-item">
              <strong>Username:</strong> superadmin<br />
              <strong>Password:</strong> whibc@admin2025
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .admin-login {
          min-height: 100vh;
          background: linear-gradient(135deg, var(--primary-blue) 0%, var(--secondary-green) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .login-container {
          background: white;
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
          overflow: hidden;
          width: 100%;
          max-width: 500px;
        }

        .login-header {
          background: linear-gradient(135deg, var(--primary-blue) 0%, var(--secondary-green) 100%);
          color: white;
          padding: 3rem 2rem;
          text-align: center;
        }

        .login-header h1 {
          color: white;
          font-size: 2rem;
          margin-bottom: 0.5rem;
          font-weight: 700;
        }

        .login-header p {
          color: rgba(255, 255, 255, 0.9);
          margin: 0;
        }

        .login-form {
          padding: 3rem 2rem;
        }

        .form-group {
          margin-bottom: 2rem;
        }

        .form-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
          font-weight: 600;
          color: var(--text-dark);
        }

        .form-input {
          width: 100%;
          padding: 1rem;
          border: 2px solid var(--gray-200);
          border-radius: 10px;
          font-family: 'Source Sans Pro', sans-serif;
          transition: all 0.3s ease;
          background: white;
        }

        .form-input:focus {
          outline: none;
          border-color: var(--primary-blue);
          box-shadow: 0 0 0 3px rgba(30, 74, 114, 0.1);
        }

        .password-input-container {
          position: relative;
        }

        .password-toggle {
          position: absolute;
          right: 1rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: var(--text-medium);
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 5px;
          transition: all 0.3s ease;
        }

        .password-toggle:hover {
          color: var(--primary-blue);
          background: var(--light-blue);
        }

        .error-message {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #dc3545;
          font-size: 0.85rem;
          margin-top: 0.5rem;
        }

        .login-error {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem;
          background: #ffebee;
          color: #c62828;
          border: 1px solid #c62828;
          border-radius: 10px;
          margin-bottom: 2rem;
          font-weight: 500;
        }

        .login-btn {
          width: 100%;
          padding: 1rem 2rem;
          font-size: 1.1rem;
          font-weight: 600;
        }

        .login-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .login-info {
          background: var(--gray-50);
          padding: 2rem;
          border-top: 1px solid var(--gray-200);
        }

        .info-card {
          margin-bottom: 2rem;
        }

        .info-card h4 {
          color: var(--primary-blue);
          margin-bottom: 1rem;
        }

        .info-card p {
          color: var(--text-medium);
          margin-bottom: 1rem;
        }

        .info-card ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .info-card li {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 0;
          color: var(--text-medium);
          font-size: 0.9rem;
        }

        .info-card li svg {
          color: var(--secondary-green);
        }

        .demo-credentials {
          padding: 1.5rem;
          background: white;
          border-radius: 10px;
          border: 1px solid var(--gray-200);
        }

        .demo-credentials h5 {
          color: var(--primary-blue);
          margin-bottom: 1rem;
          font-size: 1rem;
        }

        .credential-item {
          background: var(--light-blue);
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 1rem;
          font-size: 0.9rem;
          line-height: 1.5;
        }

        .credential-item:last-child {
          margin-bottom: 0;
        }

        .credential-item strong {
          color: var(--primary-blue);
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
          .admin-login {
            padding: 1rem;
          }

          .login-header {
            padding: 2rem 1.5rem;
          }

          .login-header h1 {
            font-size: 1.75rem;
          }

          .login-form {
            padding: 2rem 1.5rem;
          }

          .login-info {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminLogin;