# Ecommerce Sticky Navbar

A feature-rich sticky navigation bar designed specifically for ecommerce applications.

## Features

- Sticky positioning that stays at the top when scrolling
- Integrated search functionality
- Shopping cart icon with item count badge
- User account and wishlist icons
- Responsive mobile menu
- Clean, modern design

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `cartItems` | number | 0 | Number of items in the shopping cart |
| `onSearch` | function | undefined | Callback function called when search is performed |

## Usage

```jsx
import Navbar from './Navbar'

function App() {
  const handleSearch = (query) => {
    console.log('Searching for:', query)
    // Implement your search logic here
  }

  return (
    <div>
      <Navbar 
        cartItems={3} 
        onSearch={handleSearch}
      />
      {/* Rest of your app */}
    </div>
  )
}
```

## Dependencies

- React 16.8+ (uses hooks)
- Tailwind CSS for styling

## Customization

- Update the logo text or replace with an image component
- Modify navigation links in the desktop and mobile menus
- Customize colors by changing Tailwind classes
- Add additional user actions or modify existing ones
