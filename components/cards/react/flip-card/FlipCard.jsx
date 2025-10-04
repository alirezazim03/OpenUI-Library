import React, { useState } from 'react';

const FlipCard = ({
  frontImage,
  frontTitle,
  backContent,
  buttons = [],
  iconLinks = [],
  flipDirection = 'horizontal',
  gradient = false
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => setIsFlipped((s) => !s);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleFlip();
    }
  };

  // rotation axis
  const isVertical = flipDirection === 'vertical';

  const cardClasses = `relative w-full h-64 cursor-pointer transition-transform duration-700 hover:scale-105 ${gradient ? 'bg-gradient-to-br from-blue-500 to-purple-600' : 'bg-blue-500'} text-white rounded-lg shadow-lg overflow-hidden`;

  // Inline styles for 3D transform handling. We rotate the inner "flipper" container.
  const flipperStyle = {
    transformStyle: 'preserve-3d',
    transition: 'transform 0.7s',
    transform: isFlipped ? (isVertical ? 'rotateX(180deg)' : 'rotateY(180deg)') : 'none'
  };

  const faceBase = 'absolute inset-0 w-full h-full flex flex-col items-center justify-center p-4';

  const frontFaceStyle = {
    backfaceVisibility: 'hidden'
  };

  const backFaceStyle = {
    backfaceVisibility: 'hidden',
    transform: isVertical ? 'rotateX(180deg)' : 'rotateY(180deg)'
  };

  return (
    <div
      className={cardClasses}
      style={{ perspective: '1000px' }}
      onClick={handleFlip}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-pressed={isFlipped}
    >
      <div style={flipperStyle} className="relative w-full h-full">
        {/* Front Side */}
        <div
          className={`${faceBase}`}
          style={frontFaceStyle}
        >
          {frontImage ? (
            <img
              src={frontImage}
              alt={frontTitle}
              className="w-20 h-20 rounded-full mb-4 object-cover"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-white bg-opacity-20 mb-4 flex items-center justify-center">
              {/* placeholder icon area */}
              <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
          )}

          {frontTitle && (
            <h3 className="text-xl font-bold text-center">{frontTitle}</h3>
          )}
        </div>

        {/* Back Side */}
        <div
          className={`${faceBase} bg-gray-100 text-gray-800`}
          style={backFaceStyle}
        >
          <div className="text-center mb-4 px-2">
            {backContent}
          </div>

          {buttons.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {buttons.map((button, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    button.onClick && button.onClick();
                  }}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  {button.text}
                </button>
              ))}
            </div>
          )}

          {iconLinks.length > 0 && (
            <div className="flex justify-center gap-4">
              {iconLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-gray-600 hover:text-blue-500 transition-colors"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
