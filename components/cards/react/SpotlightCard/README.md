# Spotlight Card

A sleek, interactive card component for React that reveals a spotlight effect on mouse hover. The spotlight elegantly follows the cursor's position, drawing attention to the card's content.

## Features

- **Interactive Spotlight Effect:** Engages users with a subtle glow that follows their cursor.
- **Customizable:** Easily change the color of the spotlight effect via props.
- **Plug and Play:** Wrap any content inside the component to give it the effect.
- **Tailwind CSS Ready:** Built with Tailwind CSS classes for easy integration and customization. (Note: Assumes a Tailwind CSS environment).

## How to Use

1.  Place the `SpotlightCard.jsx` file in your project.
2.  Import the component and wrap it around your content.

### Example

```jsx
import SpotlightCard from './SpotlightCard'; // Adjust the import path as needed

function MyComponent() {
  return (
    <div className="flex items-center justify-center bg-black min-h-screen">
      <SpotlightCard className="w-96">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-white">Featured Product</h2>
          <p className="mt-2 text-neutral-300">
            This card has a beautiful spotlight effect that follows your mouse. Perfect for highlighting important information.
          </p>
        </div>
      </SpotlightCard>
    </div>
  );
}

export default MyComponent;
```

## Props

The component accepts the following props:

| Prop             | Type              | Default                               | Description                                                              |
| ---------------- | ----------------- | ------------------------------------- | ------------------------------------------------------------------------ |
| `children`       | `React.ReactNode` | `null`                                | The content to be rendered inside the card. (Required)                   |
| `className`      | `string`          | `''`                                  | Additional CSS classes to apply to the main card container.              |
| `spotlightColor` | `string`          | `'rgba(255, 255, 255, 0.25)'`          | The color of the radial gradient spotlight effect.                       |