# Layered Button

A modern button component with 3D layered shadow effects and smooth hover animations.

**Author:** [@alirezazim03](https://github.com/alirezazim03)

## Features

- 3D layered shadow effect that expands on hover
- Smooth animations with transform effects
- Multiple color variants (primary, secondary, accent)
- Disabled state support
- Customizable content and styling
- Responsive design with proper touch interactions

## Props

| Prop        | Type                | Default   | Description                                               |
| ----------- | ------------------- | --------- | --------------------------------------------------------- |
| `children`  | string \| ReactNode | "LAYERS"  | The content to display inside the button                  |
| `onClick`   | function            | () => {}  | Callback function when button is clicked                  |
| `className` | string              | ""        | Additional CSS classes to apply to the button             |
| `disabled`  | boolean             | false     | Whether the button is disabled                            |
| `variant`   | string              | "primary" | Button color variant: 'primary', 'secondary', or 'accent' |

## Usage

```jsx
import LayeredButton from './LayeredButton'

function App() {
  const handleClick = () => {
    console.log('Button clicked!')
  }

  return (
    <div>
      {/* Basic usage */}
      <LayeredButton onClick={handleClick}>CLICK ME</LayeredButton>

      {/* With different variants */}
      <LayeredButton variant="secondary" onClick={handleClick}>
        SECONDARY
      </LayeredButton>

      <LayeredButton variant="accent" onClick={handleClick}>
        ACCENT
      </LayeredButton>

      {/* Disabled state */}
      <LayeredButton disabled>DISABLED</LayeredButton>

      {/* Custom styling */}
      <LayeredButton className="text-xl px-12 py-6" onClick={handleClick}>
        LARGE BUTTON
      </LayeredButton>
    </div>
  )
}
```

## Dependencies

- React 16.8+ (uses hooks)
- Tailwind CSS for styling

## Customization

- Modify the shadow colors by updating the `shadow-[]` classes
- Change the base colors by updating the `variantClasses` object
- Adjust animation timing by modifying the `duration-300` class
- Customize the border style by updating the inline `style` prop
- Add new variants by extending the `variantClasses` object

## Animation Details

The button features a multi-layered shadow effect:

- **Default state**: Single black shadow
- **Hover state**: Triple-layered shadow (yellow, blue, black) with upward transform
- **Active state**: Reduced shadow with scale effect for tactile feedback
