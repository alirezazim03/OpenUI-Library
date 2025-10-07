import React from 'react'

const MilestoneFireworks = ({
  isActive,
  milestone = 10000,
  regions,
  duration = 5000,
  onComplete = () => {},
  className = '',
  theme = 'dark'
}) => {
  // Simplified demo mode detection for preview compatibility
  const isDemoMode = isActive === undefined && (!regions || regions.length === 0) ||
                     isActive === null || isActive === false

  const demoMilestone = isDemoMode ? 10000 : milestone

  // Static firework particles for preview (no animation to prevent crashes)
  const staticParticles = [
    // Firework 1 - center left
    { x: 180, y: 130, size: 3, color: '#FFD700', opacity: 0.8 },
    { x: 220, y: 110, size: 2, color: '#FF6B6B', opacity: 0.6 },
    { x: 160, y: 150, size: 4, color: '#4ECDC4', opacity: 1 },
    { x: 200, y: 170, size: 2, color: '#45B7D1', opacity: 0.7 },
    { x: 240, y: 140, size: 3, color: '#96CEB4', opacity: 0.9 },

    // Firework 2 - center right
    { x: 380, y: 180, size: 3, color: '#FFEAA7', opacity: 0.8 },
    { x: 420, y: 160, size: 2, color: '#DDA0DD', opacity: 0.6 },
    { x: 360, y: 200, size: 4, color: '#98D8C8', opacity: 1 },
    { x: 400, y: 220, size: 2, color: '#FFD700', opacity: 0.7 },
    { x: 440, y: 190, size: 3, color: '#FF6B6B', opacity: 0.9 },

    // Firework 3 - bottom center
    { x: 280, y: 280, size: 3, color: '#4ECDC4', opacity: 0.8 },
    { x: 320, y: 260, size: 2, color: '#45B7D1', opacity: 0.6 },
    { x: 260, y: 300, size: 4, color: '#96CEB4', opacity: 1 },
    { x: 300, y: 320, size: 2, color: '#FFEAA7', opacity: 0.7 },
    { x: 340, y: 290, size: 3, color: '#DDA0DD', opacity: 0.9 },
  ]

  // Always show demo mode for preview compatibility
  return (
    <div className={`relative w-full h-64 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 rounded-lg overflow-hidden ${className}`}>
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-red-500/20 animate-pulse"></div>

      {/* Fireworks container with static particles */}
      <div
        className="relative w-full h-full"
        style={{
          background: 'transparent'
        }}
      >
        {staticParticles.map((particle, index) => (
          <div
            key={`particle-${index}`}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              opacity: particle.opacity,
              boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
            }}
          />
        ))}

        {/* Milestone text overlay */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10">
          <div
            className="text-4xl font-bold text-white"
            style={{
              textShadow: '0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.6)',
              animation: 'milestonePulse 2s ease-in-out infinite'
            }}
          >
            {demoMilestone.toLocaleString()}
          </div>
          <div
            className="text-lg mt-2 text-yellow-300"
            style={{
              textShadow: '0 0 10px rgba(255, 255, 0, 0.8)'
            }}
          >
            Users Reached! 🎉
          </div>
        </div>

        {/* Demo info */}
        <div className="absolute bottom-4 left-4 right-4 text-center">
          <div className="text-white/80 text-sm bg-black/30 rounded-lg px-3 py-2 backdrop-blur-sm">
            🎆 Milestone Fireworks Animation Preview
          </div>
        </div>
      </div>

      {/* Inline styles for better preview compatibility */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes milestonePulse {
            0%, 100% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.1);
              opacity: 0.8;
            }
          }
        `
      }} />
    </div>
  )
}

export default MilestoneFireworks
