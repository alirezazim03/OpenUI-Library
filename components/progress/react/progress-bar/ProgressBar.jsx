import React, { useState, useEffect } from 'react';

// Demo component to showcase different progress bar states
const ProgressBarDemo = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => (prev + 5) % 105);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6 p-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Determinate Progress (Animated)</h3>
        <ProgressBar value={progress} animated={true} showLabel={true} />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Indeterminate Progress</h3>
        <ProgressBar indeterminate={true} animated={true} />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Different Colors</h3>
        <div className="space-y-2">
          <ProgressBar value={75} color="green" />
          <ProgressBar value={60} color="red" />
          <ProgressBar value={45} color="purple" />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Different Sizes</h3>
        <div className="space-y-2">
          <ProgressBar value={80} size="sm" />
          <ProgressBar value={80} size="md" />
          <ProgressBar value={80} size="lg" />
        </div>
      </div>
    </div>
  );
};

const ProgressBar = ({
  value = 0,
  indeterminate = false,
  color = 'blue',
  size = 'md',
  showLabel = false,
  animated = true
}) => {
  // Clamp value between 0 and 100 for determinate mode
  const clampedValue = Math.min(100, Math.max(0, value));

  // Color mapping
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    red: 'bg-red-500',
    yellow: 'bg-yellow-500',
    purple: 'bg-purple-500',
    pink: 'bg-pink-500',
    indigo: 'bg-indigo-500',
    gray: 'bg-gray-500'
  };

  const fillColor = colorClasses[color] || colorClasses.blue;

  // Size mapping
  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3'
  };

  const barHeight = sizeClasses[size] || sizeClasses.md;

  // Animation classes
  const animationClass = animated && !indeterminate ? 'transition-all duration-500 ease-out' : '';

  return (
    <div className="w-full">
      {showLabel && !indeterminate && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm font-medium text-gray-700">{Math.round(clampedValue)}%</span>
        </div>
      )}
      <div className={`w-full ${barHeight} bg-gray-200 rounded-full overflow-hidden relative`}>
        {indeterminate ? (
          <div
            className={`${fillColor} rounded-full h-full ${animated ? 'animate-pulse' : ''}`}
            style={{
              width: '30%',
              position: 'absolute',
              left: '100%',
              transform: 'translateX(-100%)'
            }}
          />
        ) : (
          <div
            className={`${fillColor} rounded-full h-full ${animationClass}`}
            style={{ width: `${clampedValue}%` }}
          />
        )}
      </div>
    </div>
  );
};

export default ProgressBarDemo;
export { ProgressBar };