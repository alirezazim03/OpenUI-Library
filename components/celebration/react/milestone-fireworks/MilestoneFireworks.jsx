import React, { useEffect, useRef, useState } from 'react'

const MilestoneFireworks = ({
  isActive,
  milestone = 10000,
  regions,
  duration = 5000,
  onComplete = () => {},
  className = '',
  theme = 'dark'
}) => {
  // Default demo behavior when no props provided
  const isDemoMode = isActive === undefined && (!regions || regions.length === 0)
  const demoActive = isDemoMode ? true : (isActive || false)
  const demoRegions = isDemoMode ? [
    { x: 200, y: 150, intensity: 0.8 },
    { x: 400, y: 200, intensity: 0.6 },
    { x: 300, y: 300, intensity: 0.4 }
  ] : (regions || [])
  const demoMilestone = isDemoMode ? 10000 : milestone
  const containerRef = useRef(null)
  const [fireworks, setFireworks] = useState([])
  const animationRef = useRef(null)

  // Firework colors based on theme
  const fireworkColors = theme === 'dark'
    ? ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8']
    : ['#FF8C00', '#FF4500', '#32CD32', '#1E90FF', '#9370DB', '#FF69B4', '#00CED1', '#FFA500']

  // Create a single firework burst
  const createFirework = (x, y, intensity = 1) => {
    const particleCount = Math.floor(20 + intensity * 30) // 20-50 particles based on intensity
    const particles = []

    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount + Math.random() * 0.5
      const velocity = 2 + Math.random() * 3
      const size = 2 + Math.random() * 4
      const color = fireworkColors[Math.floor(Math.random() * fireworkColors.length)]

      particles.push({
        id: `particle-${Date.now()}-${i}`,
        x,
        y,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        life: 1,
        maxLife: 60 + Math.random() * 40, // 60-100 frames
        size,
        color,
        gravity: 0.05 + Math.random() * 0.05
      })
    }

    return particles
  }

  // Animation loop
  const animate = () => {
    setFireworks(prevFireworks => {
      const updatedFireworks = prevFireworks.map(firework => ({
        ...firework,
        particles: firework.particles.map(particle => {
          // Update particle position
          particle.x += particle.vx
          particle.y += particle.vy

          // Apply gravity
          particle.vy += particle.gravity

          // Update life
          particle.life = Math.max(0, particle.life - 1 / particle.maxLife)

          return particle
        }).filter(particle => particle.life > 0)
      })).filter(firework => firework.particles.length > 0)

      return updatedFireworks
    })

    if (fireworks.length > 0 || demoActive) {
      animationRef.current = requestAnimationFrame(animate)
    }
  }

  // Start fireworks animation
  useEffect(() => {
    if (demoActive && demoRegions.length > 0) {
      // Start animation loop immediately
      animationRef.current = requestAnimationFrame(animate)

      // Trigger first firework immediately
      const particles1 = createFirework(demoRegions[0].x, demoRegions[0].y, demoRegions[0].intensity)
      setFireworks(prev => [...prev, {
        id: `firework-${Date.now()}-0`,
        particles: particles1,
        region: demoRegions[0]
      }])

      // Trigger second firework after delay
      setTimeout(() => {
        const particles2 = createFirework(demoRegions[1].x, demoRegions[1].y, demoRegions[1].intensity)
        setFireworks(prev => [...prev, {
          id: `firework-${Date.now()}-1`,
          particles: particles2,
          region: demoRegions[1]
        }])
      }, 1000)

      // Trigger third firework after longer delay
      setTimeout(() => {
        const particles3 = createFirework(demoRegions[2].x, demoRegions[2].y, demoRegions[2].intensity)
        setFireworks(prev => [...prev, {
          id: `firework-${Date.now()}-2`,
          particles: particles3,
          region: demoRegions[2]
        }])
      }, 2000)

      // Complete callback
      const completeTimeout = setTimeout(() => {
        onComplete()
      }, duration)

      return () => {
        clearTimeout(completeTimeout)
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
        }
      }
    } else if (!demoActive) {
      setFireworks([])
    }
  }, [demoActive, demoRegions, duration, onComplete])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  // For demo mode, show a contained preview instead of full screen
  if (isDemoMode) {
    return (
      <div className={`relative w-full h-64 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 rounded-lg overflow-hidden ${className}`}>
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-red-500/20 animate-pulse"></div>

        {/* Fireworks container */}
        <div
          ref={containerRef}
          className="relative w-full h-full"
          style={{
            background: 'transparent'
          }}
        >
          {fireworks.map(firework =>
            firework.particles.map(particle => (
              <div
                key={particle.id}
                className="absolute rounded-full"
                style={{
                  left: `${particle.x}px`,
                  top: `${particle.y}px`,
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  backgroundColor: particle.color,
                  opacity: particle.life,
                  transform: `scale(${particle.life})`,
                  boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
                  transition: 'none'
                }}
              />
            ))
          )}

          {/* Milestone text overlay */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10">
            <div
              className="text-4xl font-bold text-white animate-bounce"
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

        <style jsx>{`
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
        `}</style>
      </div>
    )
  }

  // Full screen version for actual use - only show when active
  if (!demoActive) {
    return null
  }

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 pointer-events-none z-50 ${className}`}
      style={{
        background: 'transparent',
        mixBlendMode: theme === 'dark' ? 'screen' : 'multiply'
      }}
    >
      {fireworks.map(firework =>
        firework.particles.map(particle => (
          <div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              opacity: particle.life,
              transform: `scale(${particle.life})`,
              boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
              transition: 'none'
            }}
          />
        ))
      )}

      {/* Milestone text overlay */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <div
          className={`text-6xl font-bold animate-pulse ${
            theme === 'dark' ? 'text-white' : 'text-gray-800'
          }`}
          style={{
            textShadow: theme === 'dark'
              ? '0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.6)'
              : '0 0 20px rgba(0, 0, 0, 0.8), 0 0 40px rgba(0, 0, 0, 0.6)',
            animation: 'milestonePulse 2s ease-in-out infinite'
          }}
        >
          {demoMilestone.toLocaleString()}
        </div>
        <div
          className={`text-xl mt-2 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}
          style={{
            textShadow: theme === 'dark'
              ? '0 0 10px rgba(255, 255, 255, 0.5)'
              : '0 0 10px rgba(0, 0, 0, 0.5)'
          }}
        >
          Users Reached! 🎉
        </div>
      </div>

      <style jsx>{`
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
      `}</style>
    </div>
  )
}

export default MilestoneFireworks
