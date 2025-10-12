import React, { useState, useEffect, useRef } from 'react';

const OTPVerificationForm = ({
  length = 6,
  onSubmit = () => {},
  onResend = () => {},
  timerDuration = 60,
  className = '',
}) => {
  const [otp, setOtp] = useState(new Array(length).fill(''));
  const [timer, setTimer] = useState(timerDuration);
  const [isComplete, setIsComplete] = useState(false);
  const inputsRef = useRef([]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleInputChange = (e, index) => {
    const value = e.target.value;
    if (/^\d$/.test(value) || value === '') {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < length - 1) {
        inputsRef.current[index + 1].focus();
      }
      if (newOtp.every(d => d !== '')) {
        setIsComplete(true);
        onSubmit(newOtp.join(''));
      } else {
        setIsComplete(false);
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData('text').slice(0, length);
    const newOtp = [...otp];
    paste.split('').forEach((char, i) => {
      if (i < length && /^\d$/.test(char)) {
        newOtp[i] = char;
      }
    });
    setOtp(newOtp);
    if (newOtp.every(d => d !== '')) {
      setIsComplete(true);
      onSubmit(newOtp.join(''));
    }
  };

  const handleResend = () => {
    if (timer === 0) {
      setTimer(timerDuration);
      onResend();
    }
  };

  return (
    <div className={`max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg ${className}`}>
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Verify OTP</h2>
      <div className="flex justify-center space-x-2 mb-6">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={el => inputsRef.current[index] = el}
            type="text"
            value={digit}
            onChange={e => handleInputChange(e, index)}
            onKeyDown={e => handleKeyDown(e, index)}
            onPaste={handlePaste}
            className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-md focus:border-blue-500 focus:outline-none transition-colors"
            maxLength={1}
          />
        ))}
      </div>
      {isComplete && (
        <div className="text-center mb-4">
          <p className="text-green-600 font-semibold">OTP Verified Successfully!</p>
        </div>
      )}
      {!isComplete && (
        <div className="text-center">
          <button
            onClick={handleResend}
            disabled={timer > 0}
            className={`px-4 py-2 rounded-md transition-colors ${timer > 0 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
          >
            {timer > 0 ? `Resend OTP in ${timer}s` : 'Resend OTP'}
          </button>
        </div>
      )}
    </div>
  );
};

export default OTPVerificationForm;
