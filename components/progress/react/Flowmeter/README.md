# Flowmeter 

A sleek and minimalistic progress bar React component that visually represents the loading state with a smooth blue gradient bar and animated dots.

**Author:** @harshitrwt

## Features

- Progress bar with smooth blue gradient animation
- Three bouncing dots to indicate loading status
- Customizable progress percentage (0 to 100%)
- Responsive and easily center-aligned
- Lightweight and simple
- Customizable colors

## Usage

To use the component, import it into your React application:

```jsx
import ProgressBar from './ProgressBar';

function App() {
  return (
    <div>
      <ProgressBar progress={70} />  
    </div>
  );
}
