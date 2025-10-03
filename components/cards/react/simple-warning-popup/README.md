# App Download Navbar

A deletion warning popup with two buttons (Delete and Cancel) and minimal design.

**Author:** [@chatfly](https://github.com/chatfly)

## Features

- Two Interactive Buttons
- Minimal Design
- White Design
- Flexible Text Content

## Props

| Prop            | Type       | Default                                                           | Description                                                 |
| --------------- | ---------- | ----------------------------------------------------------------- | ----------------------------------------------------------- |
| `name`          | string     | "Jessica Bennet"                                                  | "Defines the thing that you want to use the popup name's."  |
| `description`   | string     | "All synchronizations will be disconnected and moved to archive"  | "Description Text"                                          |

## Usage

```jsx
import { CiWarning } from "react-icons/ci"

function App() {
  return (
    <div>
      <SimpleWarningPopup
        name="Jessica Bennet"
        description="All synchronizations will be disconnected and moved to archive"
      />
    </div>
  )
}
```

## Dependencies

- React
- Tailwind CSS