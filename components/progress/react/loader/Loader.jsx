import React from 'react';

const Loader = ({ color = '#333', size = '10px' }) => {
  return (
    <>
      <style>
        {`
          @keyframes bounce {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
          }
          .dot {
            width: ${size};
            height: ${size};
            border-radius: 50%;
            background-color: ${color};
            animation: bounce 0.6s infinite ease-in-out;
            margin: 0 4px;
          }
          .dot:nth-child(2) {
            animation-delay: 0.15s;
          }
          .dot:nth-child(3) {
            animation-delay: 0.3s;
          }
          .loader-container {
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .loader-wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100px;
            padding: 20px;
          }
        `}
      </style>
      <div className="loader-wrapper">
        <div className="loader-container">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </div>
    </>
  );
};

export default Loader;