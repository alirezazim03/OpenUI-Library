import React from 'react'

// Demo Component
const AvatarDemo = () => {
  return (
    <div className="p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Avatar Component Demo</h1>
        </div>

        {/* 3 Avatar Types */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">Avatar Types</h2>
          <div className="flex items-center justify-center gap-12">
            <div className="text-center">
              <Avatar
                type="image"
                src="https://i.pravatar.cc/150?img=8"
                name="John Doe"
                size="xl"
              />
              <p className="text-sm text-gray-600 mt-3">Image Avatar</p>
            </div>

            <div className="text-center">
              <Avatar
                type="placeholder"
                name="Anonymous"
                size="xl"
                bgColor="#6366f1"
              />
              <p className="text-sm text-gray-600 mt-3">Placeholder</p>
            </div>

            <div className="text-center">
              <Avatar
                type="initials"
                name="Glen Fonseca"
                size="xl"
                bgColor="#10b981"
              />
              <p className="text-sm text-gray-600 mt-3">Initials</p>
            </div>
          </div>
        </div>

        {/* Different Sizes */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">Sizes</h2>
          <div className="flex items-end justify-center gap-6">
            <div className="text-center">
              <Avatar type="initials" name="XS" size="xs" bgColor="#8b5cf6" />
              <p className="text-xs text-gray-600 mt-2">xs</p>
            </div>

            <div className="text-center">
              <Avatar type="initials" name="SM" size="sm" bgColor="#8b5cf6" />
              <p className="text-xs text-gray-600 mt-2">sm</p>
            </div>

            <div className="text-center">
              <Avatar type="initials" name="MD" size="md" bgColor="#8b5cf6" />
              <p className="text-xs text-gray-600 mt-2">md</p>
            </div>

            <div className="text-center">
              <Avatar type="initials" name="LG" size="lg" bgColor="#8b5cf6" />
              <p className="text-xs text-gray-600 mt-2">lg</p>
            </div>

            <div className="text-center">
              <Avatar type="initials" name="XL" size="xl" bgColor="#8b5cf6" />
              <p className="text-xs text-gray-600 mt-2">xl</p>
            </div>

            <div className="text-center">
              <Avatar type="initials" name="2X" size="2xl" bgColor="#8b5cf6" />
              <p className="text-xs text-gray-600 mt-2">2xl</p>
            </div>
          </div>
        </div>

        {/* Shapes and Colors */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">Shapes & Colors</h2>
          <div className="flex items-center justify-center gap-8">
            <div className="text-center">
              <Avatar
                type="initials"
                name="Circle"
                size="xl"
                shape="circle"
                bgColor="#ef4444"
              />
              <p className="text-sm text-gray-600 mt-3">Circle Red</p>
            </div>

            <div className="text-center">
              <Avatar
                type="initials"
                name="Rounded"
                size="xl"
                shape="rounded"
                bgColor="#3b82f6"
              />
              <p className="text-sm text-gray-600 mt-3">Rounded Blue</p>
            </div>

            <div className="text-center">
              <Avatar
                type="initials"
                name="Square"
                size="xl"
                shape="square"
                bgColor="#10b981"
              />
              <p className="text-sm text-gray-600 mt-3">Square Green</p>
            </div>

            <div className="text-center">
              <Avatar
                type="initials"
                name="Orange"
                size="xl"
                shape="circle"
                bgColor="#f59e0b"
              />
              <p className="text-sm text-gray-600 mt-3">Circle Orange</p>
            </div>

            <div className="text-center">
              <Avatar
                type="initials"
                name="Purple"
                size="xl"
                shape="rounded"
                bgColor="#8b5cf6"
              />
              <p className="text-sm text-gray-600 mt-3">Rounded Purple</p>
            </div>

            <div className="text-center">
              <Avatar
                type="initials"
                name="Pink"
                size="xl"
                shape="square"
                bgColor="#ec4899"
              />
              <p className="text-sm text-gray-600 mt-3">Square Pink</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Avatar = ({
  type = 'placeholder',
  src = '',
  name = 'User',
  size = 'md',
  alt = '',
  className = '',
  bgColor = '#6366f1',
  textColor = '#ffffff',
  shape = 'circle',
  onError = null
}) => {
  const [imageError, setImageError] = React.useState(false)

  const sizeClasses = {
    xs: 'w-8 h-8 text-xs',
    sm: 'w-10 h-10 text-sm',
    md: 'w-12 h-12 text-base',
    lg: 'w-16 h-16 text-xl',
    xl: 'w-20 h-20 text-2xl',
    '2xl': 'w-24 h-24 text-3xl'
  }

  const shapeClasses = {
    circle: 'rounded-full',
    square: 'rounded-none',
    rounded: 'rounded-lg'
  }

  const getInitials = (name) => {
    if (!name) return 'U'
    const nameParts = name.trim().split(' ')
    if (nameParts.length === 1) {
      return nameParts[0].charAt(0).toUpperCase()
    }
    return (
      nameParts[0].charAt(0).toUpperCase() +
      nameParts[nameParts.length - 1].charAt(0).toUpperCase()
    )
  }

  const handleImageError = () => {
    setImageError(true)
    if (onError) onError()
  }

  const baseClasses = `inline-flex items-center justify-center font-semibold overflow-hidden ${sizeClasses[size]} ${shapeClasses[shape]} ${className}`

  if (type === 'image' && src && !imageError) {
    return (
      <div className={baseClasses}>
        <img
          src={src}
          alt={alt || name}
          className="w-full h-full object-cover"
          onError={handleImageError}
        />
      </div>
    )
  }

  if (type === 'initials' || (type === 'image' && imageError)) {
    return (
      <div
        className={baseClasses}
        style={{ backgroundColor: bgColor, color: textColor }}
        role="img"
        aria-label={alt || name}
      >
        {getInitials(name)}
      </div>
    )
  }

  return (
    <div
      className={baseClasses}
      style={{ backgroundColor: bgColor }}
      role="img"
      aria-label={alt || 'User avatar'}
    >
      <svg
        className="w-3/5 h-3/5"
        fill={textColor}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
      </svg>
    </div>
  )
}

export default AvatarDemo;
export {Avatar}
