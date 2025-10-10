# ClickButton (React)

A customizable, accessible, and smooth button component with press feedback.

## Features
- **Press feedback**: Scales and lifts on active press for tactile feel.
- **Smooth easing**: Uses custom easing for a springy transition.
- **Accessible**: Semantic `button` element with focus ring.
- **Customizable**: Extend via `className` for colors, size, and shapes.

## Usage
```jsx
import React from "react";
import ClickButton from "./ClickButton"; // adjust path as needed

export default function Demo() {
  return (
    <div className="p-6 flex gap-4">
      <ClickButton text="Click me" />
      <ClickButton text="Submit" className="bg-indigo-600 text-white" />
    </div>
  );
}
```

## Props (if applicable)
- **text** (string, default: `"Click me"`)
  Visible label inside the button.

- **className** (string, default: `""`)
  Additional Tailwind CSS classes to override styling.

## Customization
- **Size**: Adjust padding and font size.
  ```jsx
  <ClickButton text="Go" className="px-4 py-2 text-sm" />
  ```
- **Colors**: Change background and text colors.
  ```jsx
  <ClickButton text="Buy" className="bg-emerald-600 text-emerald-50" />
  ```
- **Shape**: Modify the rounding.
  ```jsx
  <ClickButton text="More" className="rounded-full" />
  ```

## Accessibility
- Includes focus ring styles for keyboard users.
- Consider adding `aria-label` if the text alone doesn’t fully convey purpose.

## Notes
- Requires Tailwind CSS utilities used in the component (e.g., `transition-all`, `duration-*`, `active:` transforms).
- Works well with React 18+.