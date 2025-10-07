# Interactive 3D Card

An interactive React component that provides a 3D tilt effect on cursor hover, giving a modern and engaging feel to cards.

## Features

- 3D tilt effect based on cursor position (up to 15° on X and Y axes)
- Smooth scaling on hover (scale to 1.05)
- Intensifying shadow for depth perception
- Customizable dimensions via props
- Rounded corners (rounded-2xl)
- Gradient background with inner shadow for depth
- Thin translucent border for layered effect

## Usage

```jsx
import Interactive3DCard from './Interactive3DCard';

function App() {
  return (
    <Interactive3DCard
      width="300px"
      height="400px"
      image="https://example.com/image.jpg"
      title="Card Title"
      description="This is a description of the card."
      tags={['UI Design', 'Animation']}
      actions={<button>View More</button>}
    />
  );
}
```

## Props

- `width` (string, default: '300px'): Width of the card
- `height` (string, default: '400px'): Height of the card
- `image` (string): Image URL for the top visual section
- `title` (string): Title text for the card
- `description` (string): Description text for the card
- `tags` (string[]): Array of tag strings
- `actions` (ReactNode): Action elements like buttons
- `children` (ReactNode): Additional content to display inside the card

## Customization

You can customize the appearance by modifying the Tailwind classes in the component. For example, change the gradient, shadows, or add more effects.

## Dependencies

- React
- prop-types
- Tailwind CSS
