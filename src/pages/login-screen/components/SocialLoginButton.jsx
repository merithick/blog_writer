import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SocialLoginButton = ({ provider, onClick, disabled = false }) => {
  const getProviderConfig = (provider) => {
    switch (provider.toLowerCase()) {
      case 'google':
        return {
          icon: 'Chrome',
          label: 'Continue with Google',
          bgColor: 'bg-white hover:bg-gray-50',
          textColor: 'text-gray-700',
          borderColor: 'border-gray-300'
        };
      case 'facebook':
        return {
          icon: 'Facebook',
          label: 'Continue with Facebook',
          bgColor: 'bg-blue-600 hover:bg-blue-700',
          textColor: 'text-white',
          borderColor: 'border-blue-600'
        };
      default:
        return {
          icon: 'User',
          label: `Continue with ${provider}`,
          bgColor: 'bg-gray-100 hover:bg-gray-200',
          textColor: 'text-gray-700',
          borderColor: 'border-gray-300'
        };
    }
  };

  const config = getProviderConfig(provider);

  return (
    <Button
      variant="ghost"
      onClick={onClick}
      disabled={disabled}
      fullWidth
      className={`${config.bgColor} ${config.textColor} border ${config.borderColor} transition-editorial`}
    >
      <div className="flex items-center justify-center space-x-3">
        <Icon name={config.icon} size={20} />
        <span className="font-medium">{config.label}</span>
      </div>
    </Button>
  );
};

export default SocialLoginButton;