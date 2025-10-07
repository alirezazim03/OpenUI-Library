# Tech Navbar

A modern navigation bar with a logo, navigation items, and an email display for quick contact or personalization.

**Author:** [@jjf2009](https://github.com/jjf2009)

## Features

- Customizable logo (supports React icons or any ReactNode)  
- Navigation links for sections like Work, About, Playground, and Resources  
- Email displayed prominently on the right  
- Responsive layout with Tailwind CSS  
- Clean and minimal design  

## Props

| Prop      | Type      | Default                                 | Description                                      |
| --------- | --------- | --------------------------------------- | ------------------------------------------------ |
| `logo`    | ReactNode | `<FaSpaceShuttle />`                    | Logo element displayed inside the navbar         |
| `navItems`| array     | `["Work", "About", "Playground", "Resource"]` | List of navigation items displayed as links      |
| `email`   | string    | `"ihyaet@gmail.com"`                    | Email address displayed on the right side of bar |

## Usage

```jsx
import TechNavbar from "./TechNavbar"
import { FaSpaceShuttle } from "react-icons/fa"

function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <TechNavbar
        logo={<FaSpaceShuttle />}
        navItems={["Work", "About", "Playground", "Resource"]}
        email="ihyaet@gmail.com"
      />
      {/* Rest of your app */}
    </div>
  )
}
