import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import WelcomeHeader from './components/WelcomeHeader';
import LoginForm from './components/LoginForm';
import SocialLoginButton from './components/SocialLoginButton';
import AuthFooter from './components/AuthFooter';

const LoginScreen = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (formData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Login successful:', formData);
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setIsLoading(true);
    try {
      // Simulate social login
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log(`${provider} login initiated`);
    } catch (error) {
      console.error(`${provider} login failed:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign In - Blog Writer</title>
        <meta name="description" content="Sign in to your Blog Writer account to access your content management dashboard and continue creating amazing blog posts." />
        <meta name="keywords" content="blog writer, sign in, login, content management, blog platform" />
        <meta property="og:title" content="Sign In - Blog Writer" />
        <meta property="og:description" content="Access your Blog Writer account to manage and create blog content." />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <WelcomeHeader
            title="Welcome Back"
            subtitle="Sign in to your account to continue creating and managing your blog content."
          />
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-card py-8 px-4 shadow-editorial-lg sm:rounded-lg sm:px-10 border border-border">
            {/* Login Form */}
            <LoginForm onSubmit={handleLogin} isLoading={isLoading} />

            {/* Divider */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border-muted" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-card text-text-muted font-caption">
                    Or continue with
                  </span>
                </div>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="mt-6 space-y-3">
              <SocialLoginButton
                provider="Google"
                onClick={() => handleSocialLogin('Google')}
                disabled={isLoading}
              />
              <SocialLoginButton
                provider="Facebook"
                onClick={() => handleSocialLogin('Facebook')}
                disabled={isLoading}
              />
            </div>

            {/* Loading Overlay */}
            {isLoading && (
              <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                  <span className="text-text-secondary font-medium">Signing you in...</span>
                </div>
              </div>
            )}
          </div>

          <AuthFooter />
        </div>

        {/* Background Decoration */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-72 h-72 bg-accent-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
        </div>
      </div>
    </>
  );
};

export default LoginScreen;