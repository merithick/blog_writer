import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';

const AuthenticationLayout = ({ children, title, subtitle, showLogo = true }) => {
  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {showLogo && (
          <div className="flex justify-center mb-8">
            <Link to="/" className="flex items-center space-x-3 hover-scale">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-editorial">
                <Icon name="PenTool" size={24} color="white" />
              </div>
              <div className="text-center">
                <h1 className="font-heading font-bold text-2xl text-text-primary">
                  Blog Writer
                </h1>
                <p className="text-sm text-text-secondary font-caption">
                  Professional Content Management
                </p>
              </div>
            </Link>
          </div>
        )}

        {title && (
          <div className="text-center mb-8">
            <h2 className="font-heading text-3xl font-semibold text-text-primary">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-2 text-text-secondary font-body">
                {subtitle}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-card py-8 px-4 shadow-editorial-lg sm:rounded-lg sm:px-10 border border-border">
          {children}
        </div>
      </div>

      {/* Footer Links */}
      <div className="mt-8 text-center">
        <div className="flex justify-center space-x-6 text-sm">
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
        <p className="mt-4 text-xs text-text-muted font-caption">
          © 2024 Blog Writer. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AuthenticationLayout;