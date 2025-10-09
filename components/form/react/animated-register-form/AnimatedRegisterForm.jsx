import React from 'react';

const AnimatedRegisterForm = ({ title = "Register", className = "" }) => {
  return (
    <form className={`max-w-md mx-auto p-6 bg-white rounded-xl shadow-md ${className}`}>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        {title}
      </h2>

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter your email"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter your username"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter your password"
          required
        />
      </div>

      <div className="flex justify-center mt-6">
        <button
          type="submit"
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-lg transition-all duration-200 hover:bg-blue-600 focus:outline-none"
        >
          Register
        </button>
      </div>
    </form>
  );
};

export default AnimatedRegisterForm;
