import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const getPasswordStrengthLabel = (strength) => {
    switch (strength) {
      case 0:
      case 1:
        return { label: 'Very Weak', color: 'bg-error' };
      case 2:
        return { label: 'Weak', color: 'bg-warning' };
      case 3:
        return { label: 'Fair', color: 'bg-accent' };
      case 4:
        return { label: 'Good', color: 'bg-success' };
      case 5:
        return { label: 'Strong', color: 'bg-success' };
      default:
        return { label: '', color: '' };
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!acceptTerms) {
      newErrors.terms = 'You must accept the Terms of Service';
    }

    if (!acceptPrivacy) {
      newErrors.privacy = 'You must accept the Privacy Policy';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Mock registration process
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful registration
      console.log('Registration successful:', formData);
      navigate('/dashboard');
    } catch (error) {
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthLogin = (provider) => {
    console.log(`OAuth login with ${provider}`);
    // Mock OAuth process
    setTimeout(() => {
      navigate('/dashboard');
    }, 1000);
  };

  const passwordStrength = getPasswordStrength(formData.password);
  const strengthInfo = getPasswordStrengthLabel(passwordStrength);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Full Name */}
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-text-primary mb-2">
          Full Name
        </label>
        <Input
          id="fullName"
          type="text"
          placeholder="Enter your full name"
          value={formData.fullName}
          onChange={(e) => handleInputChange('fullName', e.target.value)}
          className={errors.fullName ? 'border-error' : ''}
        />
        {errors.fullName && (
          <p className="mt-1 text-sm text-error flex items-center">
            <Icon name="AlertCircle" size={16} className="mr-1" />
            {errors.fullName}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
          Email Address
        </label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email address"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          className={errors.email ? 'border-error' : ''}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-error flex items-center">
            <Icon name="AlertCircle" size={16} className="mr-1" />
            {errors.email}
          </p>
        )}
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-2">
          Password
        </label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Create a strong password"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            className={errors.password ? 'border-error pr-10' : 'pr-10'}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted hover:text-text-primary transition-editorial"
          >
            <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={16} />
          </button>
        </div>
        
        {/* Password Strength Meter */}
        {formData.password && (
          <div className="mt-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-text-secondary">Password strength</span>
              <span className={`text-xs font-medium ${
                strengthInfo.color === 'bg-error' ? 'text-error' :
                strengthInfo.color === 'bg-warning' ? 'text-warning' :
                strengthInfo.color === 'bg-accent'? 'text-accent' : 'text-success'
              }`}>
                {strengthInfo.label}
              </span>
            </div>
            <div className="w-full bg-secondary-100 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${strengthInfo.color}`}
                style={{ width: `${(passwordStrength / 5) * 100}%` }}
              ></div>
            </div>
          </div>
        )}
        
        {errors.password && (
          <p className="mt-1 text-sm text-error flex items-center">
            <Icon name="AlertCircle" size={16} className="mr-1" />
            {errors.password}
          </p>
        )}
        
        <div className="mt-2 text-xs text-text-muted">
          <p>Password must contain:</p>
          <ul className="list-disc list-inside mt-1 space-y-1">
            <li className={formData.password.length >= 8 ? 'text-success' : ''}>
              At least 8 characters
            </li>
            <li className={/[A-Z]/.test(formData.password) ? 'text-success' : ''}>
              One uppercase letter
            </li>
            <li className={/[a-z]/.test(formData.password) ? 'text-success' : ''}>
              One lowercase letter
            </li>
            <li className={/[0-9]/.test(formData.password) ? 'text-success' : ''}>
              One number
            </li>
          </ul>
        </div>
      </div>

      {/* Confirm Password */}
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-primary mb-2">
          Confirm Password
        </label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
            className={errors.confirmPassword ? 'border-error pr-10' : 'pr-10'}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted hover:text-text-primary transition-editorial"
          >
            <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={16} />
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-error flex items-center">
            <Icon name="AlertCircle" size={16} className="mr-1" />
            {errors.confirmPassword}
          </p>
        )}
        {formData.confirmPassword && formData.password === formData.confirmPassword && (
          <p className="mt-1 text-sm text-success flex items-center">
            <Icon name="CheckCircle" size={16} className="mr-1" />
            Passwords match
          </p>
        )}
      </div>

      {/* Terms and Privacy */}
      <div className="space-y-3">
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="terms"
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
            className="mt-1 w-4 h-4 text-primary border-border rounded focus-ring"
          />
          <label htmlFor="terms" className="text-sm text-text-secondary">
            I agree to the{' '}
            <Link to="/terms" className="text-primary hover:text-primary-700 underline">
              Terms of Service
            </Link>
          </label>
        </div>
        {errors.terms && (
          <p className="text-sm text-error flex items-center">
            <Icon name="AlertCircle" size={16} className="mr-1" />
            {errors.terms}
          </p>
        )}

        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="privacy"
            checked={acceptPrivacy}
            onChange={(e) => setAcceptPrivacy(e.target.checked)}
            className="mt-1 w-4 h-4 text-primary border-border rounded focus-ring"
          />
          <label htmlFor="privacy" className="text-sm text-text-secondary">
            I agree to the{' '}
            <Link to="/privacy" className="text-primary hover:text-primary-700 underline">
              Privacy Policy
            </Link>
          </label>
        </div>
        {errors.privacy && (
          <p className="text-sm text-error flex items-center">
            <Icon name="AlertCircle" size={16} className="mr-1" />
            {errors.privacy}
          </p>
        )}
      </div>

      {/* Submit Error */}
      {errors.submit && (
        <div className="bg-error-50 border border-error-100 rounded-md p-3">
          <p className="text-sm text-error flex items-center">
            <Icon name="AlertCircle" size={16} className="mr-2" />
            {errors.submit}
          </p>
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        fullWidth
        loading={isLoading}
        disabled={isLoading}
        className="h-12"
      >
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </Button>

      {/* OAuth Options */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border-muted"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-card text-text-muted">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => handleOAuthLogin('Google')}
          className="h-12"
        >
          <Icon name="Chrome" size={18} className="mr-2" />
          Google
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => handleOAuthLogin('Facebook')}
          className="h-12"
        >
          <Icon name="Facebook" size={18} className="mr-2" />
          Facebook
        </Button>
      </div>

      {/* Sign In Link */}
      <div className="text-center">
        <p className="text-sm text-text-secondary">
          Already have an account?{' '}
          <Link
            to="/login-screen"
            className="font-medium text-primary hover:text-primary-700 transition-editorial"
          >
            Sign in here
          </Link>
        </p>
      </div>
    </form>
  );
};

export default RegistrationForm;