# Badge

A simple, non-interactive component for displaying status indicators, labels, or counts.

**Author:** [@Saikiran-Sugurthi](https://github.com/Saikiran-Sugurthi)

---
## Features

-   Displays short, non-interactive status labels.
-   Includes multiple built-in color schemes (success, danger, info, etc.).
-   Self-contained styling using CSS-in-JS, requiring no external stylesheets.
-   Lightweight and has no dependencies other than React.

---
## Props

| Prop          | Type      | Default   | Description                                                        |
| :------------ | :-------- | :-------- | :----------------------------------------------------------------- |
| `children`    | ReactNode | `null`    | The content to be displayed inside the badge.                      |
| `colorScheme` | string    | "default" | The color scheme to use. Options: `default`, `danger`, `success`, `warning`, `info`, `purple`. |

---
## Usage

```jsx
// Note: This assumes the Badge component logic has been extracted into its own file.
import Badge from "./Badge"

function App() {
  return (
    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
      <Badge colorScheme="success">Complete</Badge>
      <Badge colorScheme="danger">New</Badge>
      <Badge colorScheme="info">In Progress</Badge>
      <Badge colorScheme="default">Archived</Badge>
    </div>
  )
}