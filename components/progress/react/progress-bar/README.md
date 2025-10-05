# ProgressBar Component

A sleek and animated progress bar component built with React and Tailwind CSS, designed for modern web applications. Features smooth animations, customizable colors and sizes, and responsive design.

## 📸 Preview

### Determinate Progress Bar

**Example with Label:**
<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 10px 0;">
  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; font-size: 14px; color: #374151;">
    <span style="font-weight: 500;">Progress</span>
    <span style="font-weight: 500;">75%</span>
  </div>
  <div style="width: 100%; height: 8px; background: #e5e7eb; border-radius: 9999px; overflow: hidden;">
    <div style="width: 75%; height: 100%; background: #3b82f6; border-radius: 9999px; transition: all 0.5s ease-out;">
      <div style="position: absolute; inset: 0; background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%); background-size: 40px 100%; animation: shimmer 1.5s ease-in-out infinite;"></div>
    </div>
  </div>
</div>

```jsx
<ProgressBar value={75} color="blue" size="md" animated={true} showLabel={true} />
```

**Example without Label:**
<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 10px 0;">
  <div style="width: 100%; height: 8px; background: #e5e7eb; border-radius: 9999px; overflow: hidden;">
    <div style="width: 45%; height: 100%; background: #10b981; border-radius: 9999px; transition: all 0.5s ease-out;"></div>
  </div>
</div>

```jsx
<ProgressBar value={45} color="green" size="md" animated={true} />
```

### Indeterminate Progress Bar

**Loading Animation:**
<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 10px 0; position: relative;">
  <div style="width: 100%; height: 8px; background: #e5e7eb; border-radius: 9999px; overflow: hidden;">
    <div style="width: 30%; height: 100%; background: #8b5cf6; border-radius: 9999px; position: absolute; animation: indeterminate 1.5s ease-in-out infinite;"></div>
  </div>
</div>

```jsx
<ProgressBar indeterminate={true} color="purple" animated={true} />
```

<style>
@keyframes indeterminate {
  0% { left: -30%; }
  50% { left: 50%; }
  100% { left: 100%; }
}
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
</style>

## ✨ Features

- **Determinate & Indeterminate Modes**: Supports both known progress values and unknown loading states
- **Smooth Animations**: Fluid transitions when progress value changes with shimmer effects
- **Customizable Colors**: Multiple color options including blue, green, red, and more
- **Flexible Sizing**: Small, medium, and large size variants
- **Progress Labels**: Optional label display showing progress percentage
- **Responsive Design**: Adapts seamlessly to different screen sizes
- **Tailwind Integration**: Fully styled with Tailwind CSS classes
- **Modern Design**: Rounded corners and clean aesthetics for UI/UX friendly experience

## 🚀 Quick Start

### 1. Include Dependencies

Ensure your project has React and Tailwind CSS set up:

```bash
npm install react tailwindcss
```

### 2. Copy the Component

Copy the `ProgressBar.jsx` component into your project.

### 3. Import and Use

```jsx
import ProgressBar from './ProgressBar';

function App() {
  return (
    <div className="p-4 space-y-4">
      {/* Determinate progress */}
      <ProgressBar value={60} color="green" size="md" animated={true} showLabel={true} />

      {/* Indeterminate loading */}
      <ProgressBar indeterminate={true} color="blue" animated={true} />
    </div>
  );
}
```

## 📋 API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | `0` | Progress value between 0 and 100 for determinate mode |
| `indeterminate` | `boolean` | `false` | Whether to show indeterminate loading animation |
| `color` | `string` | `'blue'` | Color of the progress bar: 'blue', 'green', 'red', 'yellow', 'purple', 'pink', 'indigo', 'gray' |
| `size` | `string` | `'md'` | Size of the progress bar: 'sm', 'md', 'lg' |
| `showLabel` | `boolean` | `false` | Whether to display the progress label and percentage |
| `animated` | `boolean` | `true` | Whether to enable animations |

## 🎨 Customization

### Custom Colors

Use predefined color options or extend with custom Tailwind classes:

```jsx
// Using predefined colors
<ProgressBar value={80} color="red" />
<ProgressBar value={45} color="purple" />

// Custom color (would require extending the component)
<ProgressBar value={60} color="teal" /> // Note: Add to colorClasses mapping
```

### Size Variations

```jsx
// Small progress bar
<ProgressBar value={30} size="sm" />

// Medium progress bar (default)
<ProgressBar value={50} size="md" />

// Large progress bar
<ProgressBar value={70} size="lg" />
```

### Animation Control

```jsx
// Animated with shimmer effect
<ProgressBar value={85} animated={true} />

// Static progress bar
<ProgressBar value={85} animated={false} />
```

### Label Display

```jsx
// Show progress label
<ProgressBar value={92} showLabel={true} />

// Hide progress label (default)
<ProgressBar value={92} showLabel={false} />
```

## 🔧 Component Code

```jsx
import React from 'react';

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
            className={`${fillColor} rounded-full h-full`}
            style={{
              width: '30%',
              position: 'absolute',
              animation: animated ? 'indeterminate 1.5s ease-in-out infinite' : 'none'
            }}
          />
        ) : (
          <div
            className={`${fillColor} rounded-full h-full ${animationClass}`}
            style={{ width: `${clampedValue}%` }}
          >
            {animated && (
              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full"
                style={{
                  backgroundSize: '20px 100%',
                  animation: 'shimmer 1.5s ease-in-out infinite'
                }}
              />
            )}
          </div>
        )}
      </div>
      <style jsx>{`
        @keyframes indeterminate {
          0% { left: -30%; }
          50% { left: 50%; }
          100% { left: 100%; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default ProgressBar;
```

## 💡 Example Usage

### File Upload Progress

```jsx
import React, { useState, useEffect } from 'react';
import ProgressBar from './ProgressBar';

const FileUpload = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-2">Uploading file...</h3>
      <ProgressBar value={progress} color="blue" size="md" animated={true} showLabel={true} />
      <p className="text-sm text-gray-600 mt-2">{progress}% complete</p>
    </div>
  );
};
```

### Multi-Step Form Progress

```jsx
const MultiStepForm = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="mb-6">
      <div className="flex justify-between text-sm text-gray-600 mb-2">
        <span>Step {currentStep} of {totalSteps}</span>
        <span>{Math.round(progress)}% complete</span>
      </div>
      <ProgressBar value={progress} color="green" size="sm" animated={true} />
    </div>
  );
};
```

### Loading States

```jsx
const LoadingComponent = ({ isLoading, progress }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Loading...</h3>
        <ProgressBar value={progress} color="purple" size="lg" animated={true} showLabel={true} />
      </div>
    </div>
  );
};
```

### Indeterminate Loading

```jsx
const DataFetching = ({ isFetching }) => {
  if (!isFetching) return null;

  return (
    <div className="flex items-center space-x-4">
      <span className="text-gray-600">Fetching data...</span>
      <ProgressBar indeterminate={true} color="blue" animated={true} />
    </div>
  );
};
```

## 🎯 Use Cases

### File Operations
- Upload progress indicators
- Download status bars
- Data processing feedback

### Form Completion
- Multi-step form progress
- Registration wizard steps
- Checkout process tracking

### Loading States
- Page loading indicators
- API request progress
- Data fetching feedback

### Task Progress
- Project completion tracking
- Goal achievement meters
- Performance metrics display

### User Onboarding
- Tutorial step progress
- Feature introduction flow
- User engagement tracking

## ♿ Accessibility Features

- **Screen Reader Support**: Progress value announced to assistive technologies
- **ARIA Attributes**: Proper labeling and state communication
- **Keyboard Navigation**: No keyboard interaction needed, but accessible
- **Color Contrast**: High contrast colors for visibility
- **Motion Preferences**: Respects user motion preferences

## 🛠️ Browser Support

- Chrome 36+
- Firefox 16+
- Safari 9+
- Edge 12+

## 📝 License

MIT License - feel free to use in personal and commercial projects.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and enhancement requests.

---

**Version:** 1.0.0
**Author:** Ashish-Pandey62
**Framework:** React + Tailwind CSS