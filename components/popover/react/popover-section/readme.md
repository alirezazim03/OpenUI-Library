# Popover

An interactive and reusable popover component for React applications. It's used to display rich content in an overlay, triggered by a user's click.

**Author:** [@Saikiran-Sugurthi](https://github.com/Saikiran-Sugurthi)

---
## Features

-   Displays a block of content when a trigger element is clicked
-   Closes automatically when the user clicks outside of the component
-   Accepts any React component or JSX as its content, making it highly flexible
-   Self-contained styling using CSS-in-JS (no external CSS files)
-   Works in Next.js by using the `"use client"` directive
-   Lightweight with no dependencies other than React

---
## Props

| Prop       | Type      | Default | Description                                                    |
| :--------- | :-------- | :------ | :------------------------------------------------------------- |
| `children` | ReactNode | `null`  | The trigger element that the user clicks to open the popover. |
| `content`  | ReactNode | `null`  | The JSX content to display inside the popover when it is open. |

---
## Usage

```jsx
import Popover from "./Popover"

function App() {
  const myPopoverContent = (
    <div>
      <h3 style={{ marginTop: 0 }}>Account Settings</h3>
      <p>Manage your profile and notification preferences.</p>
      <button>Save Changes</button>
    </div>
  )

  return (
    <div style={{ padding: "50px" }}>
      <Popover content={myPopoverContent}>
        <button>Open Settings</button>
      </Popover>
    </div>
  )
}