import React from 'react';
import { Link } from 'react-router-dom';

const AuthFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="mt-8 space-y-6">
      {/* Registration Link */}
      <div className="text-center">
        <p className="text-text-secondary font-body">
          Don't have an account?{' '}
          <Link
            to="/registration-screen"
            className="text-primary-600 hover:text-primary-700 font-medium transition-editorial"
          >
            Sign up here
          </Link>
        </p>
      </div>

      {/* Footer Links */}
      <div className="text-center">
        <div className="flex justify-center space-x-6 text-sm mb-4">
          <Link
            to="/help"
            className="text-text-secondary hover:text-text-primary transition-editorial font-caption"
          >
            Help Center
          </Link>
          <Link
            to="/privacy"
            className="text-text-secondary hover:text-text-primary transition-editorial font-caption"
          >
            Privacy Policy
          </Link>
          <Link
            to="/terms"
            className="text-text-secondary hover:text-text-primary transition-editorial font-caption"
          >
            Terms of Service
          </Link>
        </div>
        <p className="text-xs text-text-muted font-caption">
          © {currentYear} Blog Writer. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AuthFooter;