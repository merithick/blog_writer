import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const LoginForm = ({ onSubmit, isLoading = false }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Mock credentials for demonstration
  const mockCredentials = {
    email: 'admin@blogwriter.com',
    password: 'BlogWriter123!'
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Check mock credentials
    if (formData.email === mockCredentials.email && formData.password === mockCredentials.password) {
      onSubmit?.(formData);
      navigate('/dashboard');
    } else {
      setErrors({
        general: `Invalid credentials. Use: ${mockCredentials.email} / ${mockCredentials.password}`
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* General Error Message */}
      {errors.general && (
        <div className="bg-error-50 border border-error-200 rounded-md p-4">
          <div className="flex items-center space-x-2">
            <Icon name="AlertCircle" size={16} className="text-error-600" />
            <p className="text-sm text-error-700">{errors.general}</p>
          </div>
        </div>
      )}

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
          Email Address
        </label>
        <div className="relative">
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email address"
            className={`pl-10 ${errors.email ? 'border-error-300 focus:border-error-500 focus:ring-error-500' : ''}`}
            disabled={isLoading}
            required
          />
          <Icon
            name="Mail"
            size={16}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted"
          />
        </div>
        {errors.email && (
          <p className="mt-1 text-sm text-error-600 flex items-center space-x-1">
            <Icon name="AlertCircle" size={14} />
            <span>{errors.email}</span>
          </p>
        )}
      </div>

      {/* Password Field */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-2">
          Password
        </label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
            className={`pl-10 pr-10 ${errors.password ? 'border-error-300 focus:border-error-500 focus:ring-error-500' : ''}`}
            disabled={isLoading}
            required
          />
          <Icon
            name="Lock"
            size={16}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted hover:text-text-primary transition-editorial"
            disabled={isLoading}
          >
            <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={16} />
          </button>
        </div>
        {errors.password && (
          <p className="mt-1 text-sm text-error-600 flex items-center space-x-1">
            <Icon name="AlertCircle" size={14} />
            <span>{errors.password}</span>
          </p>
        )}
      </div>

      {/* Remember Me & Forgot Password */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Input
            id="rememberMe"
            name="rememberMe"
            type="checkbox"
            checked={formData.rememberMe}
            onChange={handleInputChange}
            className="w-4 h-4"
            disabled={isLoading}
          />
          <label htmlFor="rememberMe" className="text-sm text-text-secondary">
            Remember me
          </label>
        </div>
        <button
          type="button"
          className="text-sm text-primary-600 hover:text-primary-700 font-medium transition-editorial"
          disabled={isLoading}
        >
          Forgot password?
        </button>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        fullWidth
        disabled={isLoading}
        loading={isLoading}
        iconName={isLoading ? undefined : 'LogIn'}
        iconPosition="left"
        size="lg"
      >
        {isLoading ? 'Signing In...' : 'Sign In'}
      </Button>
    </form>
  );
};

export default LoginForm;