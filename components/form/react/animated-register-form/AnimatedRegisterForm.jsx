import React from 'react';

const AnimatedRegisterForm = ({ title = "Register", className = "" }) => {
  return (
    <form
      className={`max-w-md mx-auto p-8 bg-white rounded-2xl shadow-xl ${className} transition-all duration-500`}
    >
      <h2 className="text-3xl font-light text-gray-800 mb-8 text-center">
        {title}
      </h2>

      <div className="mb-6">
        <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-800 focus:ring-1 focus:ring-gray-800 transition duration-300 placeholder-gray-400"
          placeholder="seu@email.com"
          required
        />
      </div>

      <div className="mb-6">
        <label htmlFor="username" className="block text-sm font-medium text-gray-600 mb-2">
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-800 focus:ring-1 focus:ring-gray-800 transition duration-300 placeholder-gray-400"
          placeholder="Seu Nome de Usuário"
          required
        />
      </div>

      <div className="mb-6">
        <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-2">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-800 focus:ring-1 focus:ring-gray-800 transition duration-300 placeholder-gray-400"
          placeholder="Sua senha secreta"
          required
        />
      </div>

      <div className="flex justify-center mt-8">
        <button
          type="submit"
          className="w-full px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg transition-all duration-300 hover:bg-gray-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          {title}
        </button>
      </div>
    </form>
  );
};

export default AnimatedRegisterForm;