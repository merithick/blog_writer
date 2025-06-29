import React, { useState } from 'react';
import AuthenticationLayout from '../../components/ui/AuthenticationLayout';
import RegistrationForm from './components/RegistrationForm';
import EmailVerificationPrompt from './components/EmailVerificationPrompt';

const RegistrationScreen = () => {
  const [registrationStep, setRegistrationStep] = useState('form'); // 'form' | 'verification'
  const [userEmail, setUserEmail] = useState('');

  const handleRegistrationSuccess = (email) => {
    setUserEmail(email);
    setRegistrationStep('verification');
  };

  const handleResendEmail = (email) => {
    console.log('Resending verification email to:', email);
    // Mock email resend logic
  };

  const renderContent = () => {
    switch (registrationStep) {
      case 'verification':
        return (
          <EmailVerificationPrompt
            email={userEmail}
            onResendEmail={handleResendEmail}
          />
        );
      default:
        return <RegistrationForm onSuccess={handleRegistrationSuccess} />;
    }
  };

  return (
    <AuthenticationLayout
      title={registrationStep === 'form' ? 'Create your account' : 'Welcome to Blog Writer!'}
      subtitle={
        registrationStep === 'form'
          ? 'Join our community of writers and start sharing your stories with the world.' :'Your account has been created successfully.'
      }
      showLogo={true}
    >
      {renderContent()}
    </AuthenticationLayout>
  );
};

export default RegistrationScreen;