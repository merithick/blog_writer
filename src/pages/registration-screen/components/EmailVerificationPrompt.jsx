import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const EmailVerificationPrompt = ({ email, onResendEmail }) => {
  const navigate = useNavigate();
  const [isResending, setIsResending] = useState(false);
  const [resendCount, setResendCount] = useState(0);
  const [lastResendTime, setLastResendTime] = useState(null);

  const handleResendEmail = async () => {
    if (resendCount >= 3) {
      return;
    }

    setIsResending(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setResendCount(prev => prev + 1);
      setLastResendTime(new Date());
      onResendEmail?.(email);
    } catch (error) {
      console.error('Failed to resend email:', error);
    } finally {
      setIsResending(false);
    }
  };

  const handleContinueToDashboard = () => {
    navigate('/dashboard');
  };

  const canResend = resendCount < 3 && !isResending;
  const timeRemaining = lastResendTime ? 
    Math.max(0, 60 - Math.floor((Date.now() - lastResendTime.getTime()) / 1000)) : 0;

  return (
    <div className="text-center space-y-6">
      {/* Success Icon */}
      <div className="mx-auto w-16 h-16 bg-success-50 rounded-full flex items-center justify-center">
        <Icon name="Mail" size={32} className="text-success" />
      </div>

      {/* Heading */}
      <div>
        <h2 className="text-2xl font-heading font-semibold text-text-primary mb-2">
          Check your email
        </h2>
        <p className="text-text-secondary">
          We've sent a verification link to
        </p>
        <p className="font-medium text-text-primary mt-1">
          {email}
        </p>
      </div>

      {/* Instructions */}
      <div className="bg-primary-50 border border-primary-100 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-primary mt-0.5" />
          <div className="text-left">
            <h3 className="font-medium text-primary mb-2">Next steps:</h3>
            <ol className="text-sm text-text-secondary space-y-1 list-decimal list-inside">
              <li>Check your email inbox (and spam folder)</li>
              <li>Click the verification link in the email</li>
              <li>Return here to access your account</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Resend Options */}
      <div className="space-y-4">
        <p className="text-sm text-text-secondary">
          Didn't receive the email?
        </p>
        
        {canResend ? (
          <Button
            variant="outline"
            onClick={handleResendEmail}
            loading={isResending}
            disabled={timeRemaining > 0}
            iconName="RefreshCw"
            iconPosition="left"
          >
            {timeRemaining > 0 
              ? `Resend in ${timeRemaining}s` 
              : isResending 
                ? 'Sending...' :'Resend verification email'
            }
          </Button>
        ) : (
          <div className="text-sm text-text-muted">
            <Icon name="Clock" size={16} className="inline mr-1" />
            Maximum resend attempts reached. Please contact support if needed.
          </div>
        )}

        {resendCount > 0 && (
          <p className="text-xs text-success">
            <Icon name="CheckCircle" size={14} className="inline mr-1" />
            Verification email sent successfully ({resendCount}/3)
          </p>
        )}
      </div>

      {/* Alternative Actions */}
      <div className="border-t border-border-muted pt-6 space-y-3">
        <Button
          variant="primary"
          onClick={handleContinueToDashboard}
          fullWidth
          iconName="ArrowRight"
          iconPosition="right"
        >
          Continue to Dashboard
        </Button>
        
        <div className="text-sm text-text-muted">
          <p>You can verify your email later from your account settings</p>
        </div>
      </div>

      {/* Help Links */}
      <div className="flex justify-center space-x-6 text-sm">
        <button className="text-text-secondary hover:text-text-primary transition-editorial">
          Change email address
        </button>
        <button className="text-text-secondary hover:text-text-primary transition-editorial">
          Contact support
        </button>
      </div>
    </div>
  );
};

export default EmailVerificationPrompt;