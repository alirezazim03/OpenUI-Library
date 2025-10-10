import React, { useState } from 'react';
import { FaGoogle, FaGithub, FaFacebook, FaSpinner } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

// Custom component for the social login buttons
const ProviderButton = ({ providerName, Icon, onClick, isLoading }) => (
  <button
    onClick={onClick}
    disabled={isLoading}
    className="w-full flex items-center justify-center space-x-3 p-3 text-lg font-medium text-gray-700 bg-white border border-gray-300 rounded-xl shadow-sm hover:bg-gray-50 transition duration-150 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  >
    {isLoading ? (
      <FaSpinner className="w-5 h-5 animate-spin" />
    ) : (
      <Icon className="w-5 h-5 text-gray-600" />
    )}
    <span>{isLoading ? `Signing up...` : `Sign up with ${providerName}`}</span>
  </button>
);

// The main Social Login Card component
const LoginCard = () => {
  const [loadingProvider, setLoadingProvider] = useState(null);
  const [error, setError] = useState('');

  // Placeholder function for the actual authentication logic
  const handleSocialSignUp = async (provider) => {
    setError('');
    setLoadingProvider(provider);
    console.log(`Attempting sign-up with ${provider}...`);

    try {
      // --- Placeholder for actual Firebase/OAuth/Supabase logic ---
      // Example: await signInWithProvider(provider);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log(`${provider} sign-up successful!`);
      // In a real app, this would likely cause a redirect or state change
      
    } catch (err) {
      setError(`Failed to sign up with ${provider}. Please try again.`);
      console.error(err);
    } finally {
      setLoadingProvider(null);
    }
  };

  const providers = [
    { name: 'Google', icon: FaGoogle, handler: () => handleSocialSignUp('Google') },
    { name: 'GitHub', icon: FaGithub, handler: () => handleSocialSignUp('GitHub') },
    { name: 'Facebook', icon: FaFacebook, handler: () => handleSocialSignUp('Facebook') },
    { name: 'Email/Password', icon: MdEmail, handler: () => handleSocialSignUp('Email/Password') },
  ];

  return (
    <div className="w-full max-w-sm p-6 bg-white shadow-2xl rounded-3xl border border-gray-100">
      <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-2">
        Join the Community
      </h2>
      <p className="text-gray-500 text-center mb-6">
        Choose a method to quickly create your account.
      </p>

      {error && (
        <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
          {error}
        </div>
      )}

      <div className="space-y-4">
        {providers.map((provider) => (
          <ProviderButton
            key={provider.name}
            providerName={provider.name}
            Icon={provider.icon}
            onClick={provider.handler}
            isLoading={loadingProvider === provider.name}
          />
        ))}
      </div>

      <div className="mt-6 text-center text-sm text-gray-500">
        By signing up, you agree to our <a href="#" className="text-indigo-600 hover:text-indigo-500 font-semibold">Terms of Service</a> and <a href="#" className="text-indigo-600 hover:text-indigo-500 font-semibold">Privacy Policy</a>.
      </div>
    </div>
  );
};

// Main App component to set up the container and Tailwind context
const App = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
    <LoginCard />
  </div>
);

export default App;
