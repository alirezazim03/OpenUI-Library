# Three Dot Loader

A minimalistic React component that displays a loading state with three animated dots that bounce in sequence, creating a smooth wave-like rhythm.

## Features

- Three horizontally aligned dots
- Sequential bouncing animation with delays
- Customizable color and size
- Responsive and easily center-aligned
- Infinite loop animation
- Lightweight and simple

## Usage

Import the component and use it in your React application:

```jsx
import Loader from './Loader';

function App() {
  return (
    <div>
      <Loader />
    </div>
  );
}
```

## Props

| Prop  | Type   | Default | Description                  |
|-------|--------|---------|------------------------------|
| color | string | '#333' | The color of the dots        |
| size  | string | '10px' | The size of each dot         |

## Customization

You can customize the appearance by passing props:

```jsx
<Loader color="#ff0000" size="15px" />
```

## Dependencies

- React
- PropTypes (for prop validation)

## Preview

The loader consists of three small circular dots aligned horizontally. The dots bounce up and down in sequence: first dot bounces, then the second after a 0.15s delay, then the third after another 0.15s delay. The animation repeats indefinitely, creating a rhythmic loading effect.

[Visual representation: Three dots bouncing like jumping beans in a row.]