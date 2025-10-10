# Shiny Hover Button (React)

A sleek button with a shiny sweep effect that glides across on hover, giving a premium, interactive feel. Built with React and Tailwind CSS.

Source: `components/button/react/ShinyHover-button/ShinyHover-Button.jsx`

## Features
- **Shiny sweep effect**: Animated skewed overlay slides across the button on hover.
- **Subtle scale**: Gently scales up on hover for emphasis.
- **Accessible by default**: Uses a semantic `button` with focus ring.
- **Easy to customize**: Extend via `className` to change size, colors, and effects.

## Usage
```jsx
import React from "react";
import ShinyHoverButton from "./ShinyHover-Button"; // adjust path as needed

export default function Demo() {
  return (
    <div className="p-6 flex gap-4">
      <ShinyHoverButton text="Hover me" />
      <ShinyHoverButton text="Buy now" className="bg-indigo-600 text-white" />
    </div>
  );
}
```

## Props
- **text** (string, default: `"Hover me"`)
  Visible label inside the button.

- **className** (string, default: `""`)
  Additional Tailwind CSS classes to override styling.

## Customization
- **Size**: Adjust height and padding.
  ```jsx
  <ShinyHoverButton text="CTA" className="h-10 px-4" />
  ```
- **Colors**: Modify background, text, and shine color (inner overlay).
  ```jsx
  <ShinyHoverButton text="Explore" className="bg-emerald-600 text-emerald-50" />
  ```
- **Shape**: Change rounding.
  ```jsx
  <ShinyHoverButton text="More" className="rounded-full" />
  ```

## Accessibility
- The shiny overlay is decorative and marked with `aria-hidden="true"`.
- Includes focus ring styles: `focus:outline-none focus:ring-2` for keyboard users.
- Consider using `aria-label` if the visible text alone isn’t descriptive enough for your use case.

## Notes
- Requires Tailwind CSS utilities used in the component (e.g., `group`, `transition`, `duration-*`, transforms).
- Works well with React 18+.