import React, { useState } from 'react';
import { FaGoogle, FaGithub, FaSpinner } from 'react-icons/fa';
import { FiEye, FiEyeOff } from 'react-icons/fi';


// Reusable ProviderButton for social logins
const ProviderButton = ({ providerName, Icon, onClick, isLoading }) => (
  <button
    onClick={onClick}
    disabled={isLoading}
    className="w-full flex items-center justify-center space-x-3 p-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition duration-150 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  >
    {isLoading ? (
      <FaSpinner className="w-4 h-4 animate-spin" />
    ) : (
      <Icon className="w-4 h-4 text-gray-600" />
    )}
    <span>{isLoading ? `Signing in...` : `Sign in with ${providerName}`}</span>
  </button>
);

const SplitLoginCard = () => {
  const [isLoginMode, setIsLoginMode] = useState(true); // Toggle between Login and Sign Up
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loadingProvider, setLoadingProvider] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [error, setError] = useState('');

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoadingAuth(true);
    console.log(`${isLoginMode ? 'Logging in' : 'Signing up'} with:`, { email, password });

    try {
      // --- Placeholder for actual Email/Password authentication logic ---
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      console.log(`${isLoginMode ? 'Login' : 'Sign Up'} successful!`);
      // Redirect or update app state on success
    } catch (err) {
      setError(`Failed to ${isLoginMode ? 'login' : 'sign up'}. Please check your credentials.`);
      console.error(err);
    } finally {
      setLoadingAuth(false);
    }
  };

  const handleSocialAuth = async (provider) => {
    setError('');
    setLoadingProvider(provider);
    console.log(`Attempting social auth with ${provider}...`);
    try {
      // --- Placeholder for actual social authentication logic ---
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      console.log(`${provider} auth successful!`);
      // Redirect or update app state on success
    } catch (err) {
      setError(`Failed to sign in with ${provider}. Please try again.`);
      console.error(err);
    } finally {
      setLoadingProvider(null);
    }
  };

  const socialProviders = [
    { name: 'Google', icon: FaGoogle, handler: () => handleSocialAuth('Google') },
    { name: 'GitHub', icon: FaGithub, handler: () => handleSocialAuth('GitHub') },
    // You can add more or fewer providers here
  ];

  return (
    <div className="relative flex min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row w-full max-w-5xl h-auto md:h-[600px] transform transition-all duration-300 scale-95 md:scale-100">

        {/* Left Half: Company Image / Branding */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-indigo-600 to-purple-700 flex flex-col items-center justify-center p-8 text-white relative overflow-hidden md:rounded-l-3xl rounded-t-3xl md:rounded-tr-none">
          {/* Decorative shapes */}
          <div className="absolute top-0 -left-10 w-48 h-48 bg-white opacity-5 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 -right-10 w-64 h-64 bg-white opacity-5 rounded-full filter blur-3xl"></div>
          
          <img 
            src="https://images.unsplash.com/photo-1620283517176-464a933f7c5e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            alt="Company Showcase" 
            className="w-full h-48 md:h-64 object-cover object-center rounded-xl shadow-lg mb-6 filter brightness-90 hover:brightness-100 transition-all duration-300"
          />
          <h1 className="text-4xl font-extrabold text-center leading-tight mb-3">
            Welcome to <br/> Our Platform
          </h1>
          <p className="text-lg text-center opacity-90 max-w-sm">
            Discover a world of possibilities. Connect, create, and achieve more.
          </p>
        </div>

        {/* Right Half: Login/Signup Form */}
        <div className="w-full md:w-1/2 p-8 lg:p-12 flex flex-col justify-center bg-white md:rounded-r-3xl rounded-b-3xl md:rounded-bl-none">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">
            {isLoginMode ? 'Sign In' : 'Sign Up'}
          </h2>

          {error && (
            <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg text-center" role="alert">
              {error}
            </div>
          )}

          {/* Social Login Options */}
          <div className="space-y-3 mb-6">
            {socialProviders.slice(0, 2).map((provider) => ( // Limiting to 2 social providers
              <ProviderButton
                key={provider.name}
                providerName={provider.name}
                Icon={provider.icon}
                onClick={provider.handler}
                isLoading={loadingProvider === provider.name}
              />
            ))}
          </div>

          <div className="relative flex items-center justify-center py-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-500 text-sm">Or continue with</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Email and Password Form */}
          <form onSubmit={handleAuthSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
                placeholder="Email address"
              />
            </div>
            
            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 sr-only">Password</label>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete={isLoginMode ? 'current-password' : 'new-password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm pr-10 transition duration-150 ease-in-out"
                placeholder="Password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showPassword ? (
                  <FiEyeOff className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <FiEye className="h-5 w-5" aria-hidden="true" />
                )}
              </button>
            </div>

            <div className="flex items-center justify-between">
              {!isLoginMode && ( // Show "I accept terms" only for Sign Up
                <div className="flex items-center">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    required
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                    I accept the <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Terms</a>
                  </label>
                </div>
              )}
              {isLoginMode && (
                <div className="text-sm">
                  <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Forgot your password?
                  </a>
                </div>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={loadingAuth}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed transition duration-150 ease-in-out"
              >
                {loadingAuth ? (
                  <FaSpinner className="w-5 h-5 animate-spin mr-2" />
                ) : (
                  isLoginMode ? 'Sign In' : 'Sign Up'
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            {isLoginMode ? (
              <>
                Don't have an account?{' '}
                <button
                  onClick={() => { setIsLoginMode(false); setError(''); }}
                  className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  onClick={() => { setIsLoginMode(true); setError(''); }}
                  className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none"
                >
                  Sign in
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App component to set up the container and Tailwind context
const App = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center font-sans">
    <SplitLoginCard />
  </div>
);

export default App;
