import React, { useRef, useState } from 'react';

const Interactive3DCard = ({
  width = '300px',
  height = '400px',
  image = 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg',
  title = 'Interactive 3D Card',
  description = 'This is a demo description for the interactive card with 3D tilt effects.',
  tags = ['Demo', 'Interactive'],
  actions = <a href="https://github.com/Ashish-Pandey62" target="_blank" rel="noopener noreferrer" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm inline-block">Learn More</a>,
  children
}) => {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState('none');
  const [parallax, setParallax] = useState('none');

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = e.clientX - centerX;
    const y = e.clientY - centerY;
    const rotateX = (y / (rect.height / 2)) * 15;
    const rotateY = -(x / (rect.width / 2)) * 15;
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`);
    setParallax(`translateX(${x * 0.02}px) translateY(${y * 0.02}px)`);
  };

  const handleMouseLeave = () => {
    setTransform('none');
    setParallax('none');
  };

  return (
    <div
      ref={cardRef}
      className="relative rounded-2xl shadow-lg hover:shadow-xl border border-gray-300/20 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 mx-auto"
      style={{ width, height, transform, transition: 'transform 0.2s ease-out', transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-black/10 pointer-events-none"></div>
      <div className="relative z-10 p-4 h-full flex flex-col" style={{ transform: parallax, transition: 'transform 0.2s ease-out' }}>
        {image && (
          <div className="h-3/5 mb-4">
            <img src={image} alt={title || 'Card image'} className="w-full h-full object-cover rounded-lg" />
          </div>
        )}
        <div className="flex-1 flex flex-col justify-center">
          {title && <h2 className="text-lg font-semibold mb-2">{title}</h2>}
          {description && <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{description}</p>}
        </div>
        {(tags || actions) && (
          <div className="flex justify-between items-center mt-auto">
            {tags && (
              <div className="flex gap-2 flex-wrap">
                {tags.map(tag => <span key={tag} className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">{tag}</span>)}
              </div>
            )}
            {actions && <div>{actions}</div>}
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default Interactive3DCard;