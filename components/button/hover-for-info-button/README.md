# Hover for Info Button
A React button that shows a tooltip on hover.

**Author:** @beebadooo

## Features

- Tooltip appears on hover with arrow and styled container
- Gradient button with smooth hover transition
- Accessible: content is structured and readable

## Preview

The button displays an info icon and reveals a tooltip containing a title and description.

## Usage

```jsx
import HoverInfo from "./hover_for_info"

export default function Example() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <HoverInfo />
    </div>
  )
}
```

## Dependencies
- React 16.8+
- Tailwind CSS

## Notes

- Ensure Tailwind is configured and its utilities are available.
- You can swap the emoji icon with any SVG/icon component.


