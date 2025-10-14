import React from 'react';

const ProgressBar = ({ progress = 0 }) => {
  return (
    <>
      <style>
        {`
          .loader {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            gap: 5px;
            width: full;
            margin-top: 50px;
          }

          .loading-text {
            color: black;
            font-size: 17pt;
            font-weight: 700;
            margin-left: 10px;
          }

          .dot {
            margin-left: 3px;
            animation: blink 1.5s infinite;
          }

          .dot:nth-child(2) {
            animation-delay: 0.3s;
          }

          .dot:nth-child(3) {
            animation-delay: 0.6s;
          }

          .loading-bar-background {
            --height: 30px;
            display: flex;
            align-items: center;
            box-sizing: border-box;
            padding: 5px;
            width: 200px;
            height: var(--height);
            background-color: #333;
            box-shadow: #0c0c0c -2px 2px 4px 0px inset;
          }

          .loading-bar {
            position: relative;
            display: flex;
            justify-content: center;
            flex-direction: column;
            --height: 20px;
            width: ${progress}%;
            height: var(--height);
            overflow: hidden;
            background: rgb(54, 162, 235);
            background: linear-gradient(
              0deg,
              rgba(54, 162, 235, 1) 0%,
              rgba(74, 144, 226, 1) 100%
            );
            
            animation: loading 4s ease-out infinite;
          }

          .white-bars-container {
            position: absolute;
            display: flex;
            align-items: center;
            gap: 18px;
          }

          .white-bar {
            background: rgb(255, 255, 255);
            background: linear-gradient(
              -45deg,
              rgba(255, 255, 255, 1) 0%,
              rgba(255, 255, 255, 0) 70%
            );
            width: 10px;
            height: 45px;
            opacity: 0.3;
            transform: rotate(45deg);
          }

          @keyframes loading {
            0% {
              width: 0;
            }
            80% {
              width: 100%;
            }
            100% {
              width: 100%;
            }
          }

          @keyframes blink {
            0%, 100% {
              opacity: 0;
            }
            50% {
              opacity: 1;
            }
          }
        `}
      </style>

      <div className="loader">
        <div className="loading-text">
          Loading<span className="dot">.</span><span className="dot">.</span><span className="dot">.</span>
        </div>
        <div className="loading-bar-background">
          <div className="loading-bar">
            <div className="white-bars-container">
              <div className="white-bar"></div>
              <div className="white-bar"></div>
              <div className="white-bar"></div>
              <div className="white-bar"></div>
              <div className="white-bar"></div>
              <div className="white-bar"></div>
              <div className="white-bar"></div>
              <div className="white-bar"></div>
              <div className="white-bar"></div>
              <div className="white-bar"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProgressBar;
