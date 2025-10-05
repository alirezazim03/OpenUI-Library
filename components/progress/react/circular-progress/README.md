# Circular Progress Component

A beautiful circular progress indicator with percentage display, built with React and Tailwind CSS. Perfect for displaying loading status, completion percentages, or any progress-based information in a visually appealing way.

## 📸 Preview

### Determinate Circular Progress

**With Percentage Display:**

<div style="display: flex; justify-content: center; padding: 20px; background: #f8f9fa; border-radius: 8px; margin: 10px 0;">
  <div style="position: relative; width: 100px; height: 100px;">
    <svg style="transform: rotate(-90deg); width: 100%; height: 100%;">
      <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" stroke-width="6"></circle>
      <circle cx="50" cy="50" r="45" fill="none" stroke="#3b82f6" stroke-width="6" stroke-dasharray="283" stroke-dashoffset="70" stroke-linecap="round"></circle>
    </svg>
    <div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-weight: 600; color: #3b82f6; font-size: 20px;">
      75%
    </div>
  </div>
</div>

```jsx
<CircularProgress value={75} color="blue" size="md" showPercentage={true} />
```

**Without Percentage Display:**

<div style="display: flex; justify-content: center; padding: 20px; background: #f8f9fa; border-radius: 8px; margin: 10px 0;">
  <div style="position: relative; width: 80px; height: 80px;">
    <svg style="transform: rotate(-90deg); width: 100%; height: 100%;">
      <circle cx="40" cy="40" r="36" fill="none" stroke="#e5e7eb" stroke-width="5"></circle>
      <circle cx="40" cy="40" r="36" fill="none" stroke="#10b981" stroke-width="5" stroke-dasharray="226" stroke-dashoffset="79" stroke-linecap="round"></circle>
    </svg>
  </div>
</div>

```jsx
<CircularProgress value={65} color="green" size="sm" showPercentage={false} />
```

### Indeterminate Circular Progress

<div style="display: flex; justify-content: center; padding: 20px; background: #f8f9fa; border-radius: 8px; margin: 10px 0;">
  <div style="position: relative; width: 100px; height: 100px;">
    <svg style="width: 100%; height: 100%;">
      <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" stroke-width="6"></circle>
      <circle cx="50" cy="50" r="45" fill="none" stroke="#8b5cf6" stroke-width="6" stroke-dasharray="283" stroke-dashoffset="212" stroke-linecap="round" style="animation: spin 1.5s linear infinite;"></circle>
    </svg>
  </div>
</div>

```jsx
<CircularProgress indeterminate={true} color="purple" />
```

## 📋 Features

- Circular progress indicator with customizable percentage display
- Smooth animations with configurable duration
- Indeterminate mode for loading states
- Customizable colors from Tailwind CSS palette
- Multiple size options (small, medium, large)
- Adjustable thickness settings
- Accessible and responsive design
- Lightweight and easy to use

## 🛠️ Props

| Prop           | Type    | Default  | Description                                               |
| -------------- | ------- | -------- | --------------------------------------------------------- |
| value          | number  | 0        | Progress value between 0 and 100                          |
| indeterminate  | boolean | false    | Whether to show indeterminate loading animation           |
| color          | string  | 'blue'   | Color of the progress circle                              |
| size           | string  | 'md'     | Size of the circle: 'sm', 'md', 'lg'                      |
| thickness      | string  | 'normal' | Thickness of the circle stroke: 'thin', 'normal', 'thick' |
| showPercentage | boolean | true     | Whether to display the percentage in the center           |
| animated       | boolean | true     | Whether to animate the progress                           |
| duration       | number  | 1000     | Duration of the animation in milliseconds                 |

## 🧩 Available Colors

- `blue` (default)
- `green`
- `red`
- `yellow`
- `purple`
- `pink`
- `indigo`
- `gray`

## 📏 Available Sizes

- `sm` - Small (64px)
- `md` - Medium (96px) (default)
- `lg` - Large (128px)

## 🔍 Available Thicknesses

- `thin` - Thin stroke (4% of size)
- `normal` - Normal stroke (6% of size) (default)
- `thick` - Thick stroke (8% of size)

## 💻 Usage

### Basic Usage

```jsx
import { CircularProgress } from "./CircularProgress"

function App() {
  return (
    <div className="flex justify-center p-8">
      <CircularProgress value={75} />
    </div>
  )
}
```

### With Custom Properties

```jsx
import { CircularProgress } from "./CircularProgress"

function App() {
  return (
    <div className="flex justify-center p-8">
      <CircularProgress
        value={65}
        color="purple"
        size="lg"
        thickness="thick"
        showPercentage={true}
        animated={true}
        duration={1500}
      />
    </div>
  )
}
```

### Indeterminate Loading

```jsx
import { CircularProgress } from "./CircularProgress"

function LoadingComponent() {
  return (
    <div className="flex justify-center p-8">
      <CircularProgress indeterminate={true} color="blue" />
    </div>
  )
}
```

## ✨ Advanced Usage

### Dynamic Progress Updates

```jsx
import React, { useState, useEffect } from "react"
import { CircularProgress } from "./CircularProgress"

function DownloadProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 5
      })
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center">
      <CircularProgress value={progress} />
      <p className="mt-4">Downloading: {progress}%</p>
    </div>
  )
}
```

## 🎨 Customization

The component is built with Tailwind CSS, making it easy to customize further by extending the component or using Tailwind's utility classes.

## 🚀 Performance

The circular progress component uses SVG for rendering and requestAnimationFrame for smooth animations, ensuring optimal performance even during complex animations.

## 📚 Accessibility

The component includes appropriate ARIA attributes for accessibility and can be further enhanced with custom labels as needed.
