import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const WelcomeHeader = ({ showLogo = true, title, subtitle }) => {
  return (
    <div className="text-center mb-8">
      {showLogo && (
        <div className="flex justify-center mb-6">
          <Link to="/" className="flex items-center space-x-3 hover-scale">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-editorial">
              <Icon name="PenTool" size={24} color="white" />
            </div>
            <div className="text-left">
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

      <div className="space-y-2">
        <h2 className="font-heading text-3xl font-semibold text-text-primary">
          {title || 'Welcome Back'}
        </h2>
        <p className="text-text-secondary font-body max-w-md mx-auto">
          {subtitle || 'Sign in to your account to continue creating and managing your blog content.'}
        </p>
      </div>
    </div>
  );
};

export default WelcomeHeader;