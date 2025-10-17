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

  const onSubmit = async (data) => {
    setIsLoading(true);
    setLoginError('');

    // REAL CREDENTIALS FROM BACKEND
    const validUsername = 'admin';
    const validPassword = 'whibc2025';
    const validSuperadmin = 'superadmin';
    const validSuperadminPassword = 'whibc@admin2025';

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if ((data.username === validUsername && data.password === validPassword) ||
        (data.username === validSuperadmin && data.password === validSuperadminPassword)) {
      
      // Store mock token and admin info
      localStorage.setItem('admin_token', 'mock_jwt_token_' + Date.now());
      localStorage.setItem('admin_info', JSON.stringify({
        id: 1,
        username: data.username,
        email: data.username + '@wordofhopebibleinstitute.com',
        role: data.username === 'superadmin' ? 'super_admin' : 'admin'
      }));
      
      toast.success('Login successful! Welcome to Word of Hope Bible Institute Admin Dashboard.');
      
      // Call the success callback
      onLoginSuccess({
        access_token: 'mock_jwt_token_' + Date.now(),
        admin_info: {
          id: 1,
          username: data.username,
          email: data.username + '@wordofhopebibleinstitute.com',
          role: data.username === 'superadmin' ? 'super_admin' : 'admin'
        }
      });
      
      reset();
    } else {
      setLoginError('Invalid credentials. Use: admin/whibc2025 or superadmin/whibc@admin2025');
      toast.error('Login failed. Please check your credentials.');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Portal</h1>
          <p className="text-gray-600 mt-2">Word of Hope Bible Institute</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                {...register('username', { required: 'Username is required' })}
                type="text"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter username"
              />
            </div>
            {errors.username && (
              <p className="text-red-600 text-sm mt-1 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                {...register('password', { required: 'Password is required' })}
                type={showPassword ? 'text' : 'password'}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-600 text-sm mt-1 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.password.message}
              </p>
            )}
          </div>

          {loginError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700 text-sm flex items-center">
                <AlertCircle className="w-4 h-4 mr-2" />
                {loginError}
              </p>
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-700 text-sm">
              <strong>Admin Credentials:</strong><br />
              Username: <code>admin</code> | Password: <code>whibc2025</code><br />
              Username: <code>superadmin</code> | Password: <code>whibc@admin2025</code>
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <Loader className="w-5 h-5 mr-2 animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5 mr-2" />
                Sign In
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
