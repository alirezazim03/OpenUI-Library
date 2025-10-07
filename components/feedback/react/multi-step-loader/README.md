# Multi-Step Loader

A React component that visually represents a multi-step loading process with circular indicators connected by progress lines and automatic animation.

## Features

- Displays multiple circular steps connected by progress lines
- Automatically animates through steps, showing the flow of progress
- Inactive steps: light gray border with white background
- Active step: filled with indigo color, pulsing animation
- Completed steps: filled with lighter indigo, checkmark icon
- Smooth transitions between states
- Customizable number of steps

## Usage

```jsx
import MultiStepLoader from './multi-step-loader';

function App() {
  return (
    <div>
      <MultiStepLoader totalSteps={5} />
    </div>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| totalSteps | number | 4 | Total number of steps in the process |

## Customization

The component uses Tailwind CSS classes for styling. You can customize the appearance by overriding the classes:

- Inactive steps: `border-gray-300 bg-white text-gray-500`
- Active step: `bg-indigo-500 text-white border-indigo-500 animate-pulse`
- Completed steps: `bg-indigo-400 text-white border-indigo-400`
- Progress lines: filled with `bg-indigo-400` for completed connections

## Dependencies

- React
- react-icons
- Tailwind CSS