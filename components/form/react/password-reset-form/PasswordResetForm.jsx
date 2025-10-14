import React, { useState } from 'react';

const PasswordResetForm = ({
  onSubmit = () => {},
  className = '',
}) => {
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validatePasswordStrength = (password) => {
    const criteria = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      symbol: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
    };

    const metCriteria = Object.values(criteria).filter(Boolean).length;

    let strength = 'Weak';
    if (metCriteria >= 4) strength = 'Strong';
    else if (metCriteria >= 3) strength = 'Good';
    else if (metCriteria >= 2) strength = 'Fair';

    return { criteria, strength, metCriteria };
  };

  const getStrengthColor = (strength) => {
    switch (strength) {
      case 'Weak': return 'bg-red-500';
      case 'Fair': return 'bg-yellow-500';
      case 'Good': return 'bg-blue-500';
      case 'Strong': return 'bg-green-500';
      default: return 'bg-gray-300';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Real-time validation
    if (name === 'newPassword') {
      const { strength } = validatePasswordStrength(value);
      setErrors(prev => ({
        ...prev,
        newPassword: value && strength === 'Weak' ? 'Password is too weak' : '',
      }));
    } else if (name === 'confirmPassword') {
      setErrors(prev => ({
        ...prev,
        confirmPassword: value && value !== formData.newPassword ? 'Passwords do not match' : '',
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    const { strength, metCriteria } = validatePasswordStrength(formData.newPassword);
    if (metCriteria < 4) {
      newErrors.newPassword = 'Password must meet at least 4 criteria';
    }
    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm password is required';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmit({ newPassword: formData.newPassword });
    }
  };

  const { criteria, strength } = validatePasswordStrength(formData.newPassword);

  return (
    <div className={`max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg ${className}`}>
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Reset Password</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
            New Password
          </label>
          <div className="relative">
            <input
              type={showNewPassword ? 'text' : 'password'}
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 bg-white text-black border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                errors.newPassword ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter new password"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              aria-label={showNewPassword ? 'Hide password' : 'Show password'}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
            >
              {showNewPassword ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
          {errors.newPassword && <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>}

          {/* Password Strength Meter */}
          {formData.newPassword && (
            <div className="mt-2">
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>Password Strength</span>
                <span className={`font-medium ${strength === 'Weak' ? 'text-red-500' : strength === 'Fair' ? 'text-yellow-500' : strength === 'Good' ? 'text-blue-500' : 'text-green-500'}`}>
                  {strength}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor(strength)}`}
                  style={{ width: `${(Object.values(criteria).filter(Boolean).length / 5) * 100}%` }}
                ></div>
              </div>
              <div className="grid grid-cols-2 gap-1 mt-2 text-xs">
                <div className={`flex items-center ${criteria.length ? 'text-green-600' : 'text-gray-400'}`}>
                  <span className="mr-1">✓</span> 8+ characters
                </div>
                <div className={`flex items-center ${criteria.uppercase ? 'text-green-600' : 'text-gray-400'}`}>
                  <span className="mr-1">✓</span> Uppercase
                </div>
                <div className={`flex items-center ${criteria.lowercase ? 'text-green-600' : 'text-gray-400'}`}>
                  <span className="mr-1">✓</span> Lowercase
                </div>
                <div className={`flex items-center ${criteria.number ? 'text-green-600' : 'text-gray-400'}`}>
                  <span className="mr-1">✓</span> Number
                </div>
                <div className={`flex items-center ${criteria.symbol ? 'text-green-600' : 'text-gray-400'}`}>
                  <span className="mr-1">✓</span> Symbol
                </div>
              </div>
            </div>
          )}
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 bg-white text-black border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Confirm new password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
            >
              {showConfirmPassword ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
          {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors transform hover:scale-105"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default PasswordResetForm;
