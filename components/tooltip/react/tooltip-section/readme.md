# Tooltip

A simple and reusable tooltip component for React applications that displays a text label on hover.

**Author:** [@Saikiran-Sugurthi](https://github.com/Saikiran-Sugurthi)

## Features

-   Displays a text label on mouse hover
-   Self-contained styling using CSS-in-JS (no external CSS files)
-   Lightweight with no dependencies other than React
-   Works in Next.js by using the `"use client"` directive
-   Simple and declarative API

## Props

| Prop       | Type      | Default        | Description                                        |
| :--------- | :-------- | :------------- | :------------------------------------------------- |
| `children` | ReactNode | `null`         | The trigger element that the tooltip is attached to. |
| `text`     | string    | "Tooltip text" | The text content to display inside the tooltip.    |

## Usage

```jsx
import Tooltip from "./Tooltip"

function App() {
  return (
    <div style={{ display: "flex", gap: "20px", padding: "50px" }}>
      <Tooltip text="Copy to clipboard">
        <button>📄 Copy</button>
      </Tooltip>

      <Tooltip text="View user profile">
        <button>👤 Profile</button>
      </Tooltip>
    </div>
  )
}