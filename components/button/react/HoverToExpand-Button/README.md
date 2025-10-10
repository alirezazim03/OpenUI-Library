# Hover To Expand Button (React)

A compact, circular action button that smoothly expands in width on hover to reveal a text label, with an arrow icon. Built with React and Tailwind CSS.

Source: `components/button/react/HoverToExpand-Button/HoverButton.jsx`

## Features
- **Compact by default**: Renders as a 48px circular button.
- **Smooth expansion**: Expands to show the label text on hover.
- **Clean transitions**: Uses Tailwind `transition` utilities for both width and text reveal.
- **Icon included**: Right-aligned arrow SVG with `currentColor`.
- **Easy customization**: Extend with `className` to tweak size, colors, and effects.

## Usage
```jsx
import React from "react";
import HoverButton from "./HoverButton"; // adjust path as needed

export default function Demo() {
  return (
    <div className="p-6 flex gap-4">
      <HoverButton text="Explore" />
      <HoverButton text="Read more" className="bg-indigo-600 text-white" />
    </div>
  );
}
```

## Props
- **text** (string, default: `"Hover me"`)
  Label text that becomes visible when the button expands.

- **className** (string, default: `""`)
  Additional Tailwind CSS classes to override styling (size, colors, etc.).

## Customization
- **Size**: Override `h-12 w-12 hover:w-32` via `className`.
  ```jsx
  <HoverButton text="Start" className="h-10 w-10 hover:w-28" />
  ```
- **Colors**: Change background and text colors.
  ```jsx
  <HoverButton text="Docs" className="bg-emerald-600 text-emerald-50" />
  ```
- **Rounded/shape**: Modify `rounded-full` by supplying your own rounding class.
  ```jsx
  <HoverButton text="Go" className="rounded-lg" />
  ```

## Accessibility
- The text label is present in the DOM even when visually hidden, so it serves as an accessible name for screen readers.
- The arrow SVG is decorative. If needed, you can treat it as decorative by adding `aria-hidden="true"` via a small refactor; otherwise it inherits `currentColor` and has no explicit title.
- Consider adding focus styles via `className` (e.g., `focus:outline-none focus:ring-2 focus:ring-offset-2`) to improve keyboard visibility.

## Notes
- Requires Tailwind CSS utilities (e.g., `group`, `transition`, `duration-*`, etc.).
- Works out of the box with React 18+.