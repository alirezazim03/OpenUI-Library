# Glass Navbar

A stunning glassmorphism navigation bar with backdrop blur effects, gradient backgrounds, and smooth animations built with React and Tailwind CSS.

## Features

- **Glassmorphism Design**: Beautiful backdrop blur effects with semi-transparent backgrounds
- **Smooth Animations**: Floating container, rotating logo, and glowing effects
- **Responsive Layout**: Fully responsive with mobile-optimized spacing
- **Interactive Elements**: Hover effects with sliding animations and transforms
- **Modern Aesthetics**: Dark gradient background with purple/blue color scheme
- **Custom Animations**: CSS keyframes for floating, rotation, and glow effects
- **React Props**: Customizable logo, navigation items, and show/hide logo option

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `logo` | string | "Glass Navbar" | Logo text to be displayed in the navbar |
| `navItems` | array | ["Home", "Docs"] | List of navigation items displayed as links |
| `showLogo` | boolean | true | Whether to show the logo icon |

## Usage

```jsx
import GlassNavbar from './components/GlassNavbar';
import './glass-navbar.css';

function App() {
  return (
    <GlassNavbar 
      logo="My Brand"
      navItems={["Home", "About", "Services", "Contact"]}
      showLogo={true}
    />
  );
}
```

## Design Highlights

- Glassmorphism effect with backdrop blur
- Dark gradient background with radial overlays
- Animated logo rotation on hover
- Sliding link animations with pseudo-elements
- Responsive design with mobile breakpoints
- Custom SVG logo with smooth transitions

## Customization

- **Colors**: Update the gradient colors in the CSS file
- **Logo**: Pass custom logo text via props
- **Navigation**: Pass custom navigation items via props
- **Animations**: Adjust transition durations and animation effects
- **Background**: Customize the gradient background and overlay effects

## Dependencies

- React 18+
- Tailwind CSS
- CSS file for custom animations and glassmorphism effects