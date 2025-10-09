# Simple Navbar

A simple and responsive navigation bar with a title and basic links. Built with minimal design using React and Tailwind CSS.

**Author:** [@chatfly](https://github.com/chatfly)

## Features

- Responsive Layout
- Title and Navigation Links
- Minimal Design
- White Background
- Easily Customizable

## Props

| Prop     | Type     | Default         | Description                      |
|----------|----------|------------------|----------------------------------|
| `title`  | string   | "App Download"   | Defines the brand or title text |

## Usage

```jsx
import SimpleNavbar from "./SimpleNavbar"

function App() {
  return (
    <div>
      <SimpleNavbar title="App Download" />
    </div>
  )
}
