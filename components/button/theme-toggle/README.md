# Theme Toggle Button
A simple theme toggle button that switches between light and dark modes with visual background changes.

**Author:** @beebadooo

## Features

- Toggles between light and dark modes
- Black/white background and text switch for clarity
- Minimal, responsive styles using Tailwind

## Usage

```jsx
import ThemeToggle from './ThemeToggle'

export default function Example() {
  return (
    <div>
      <ThemeToggle />
    </div>
  )
}
```

## Dependencies

- React 16.8+
- Tailwind CSS

## Styling

The component includes a preview container that demonstrates the theme toggle:
- Light mode: White background with black text
- Dark mode: Black background with white text
- Button changes color based on current theme

## Global Dark Mode Setup

To enable site-wide dark mode with this component:

1. **Configure Tailwind** - Add to your `tailwind.config.js`:
```js
module.exports = {
  darkMode: "class",
  // ... rest of config
}
```

2. **Add Global Styles** - In your CSS file:
```css
.dark body {
  @apply bg-black text-white;
}
```

3. **Use the Component** - The button will toggle the `dark` class on the HTML element, enabling global dark mode across your site.
