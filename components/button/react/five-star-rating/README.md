# Five Star Rating Button

An interactive five-star rating button component with smooth hover effects and click persistence. Perfect for collecting user feedback, product ratings, or any rating-based interactions.

## ✨ Features

- **Interactive Rating System**: Click to set a permanent rating from 1 to 5 stars
- **Hover Preview**: Stars light up on hover to preview the rating
- **Smooth Animations**: Elegant transitions and hover effects with scale animation
- **Dark Mode Support**: Automatically adapts to light and dark themes
- **Three Size Variants**: Small, medium, and large sizes available
- **Customizable**: Easy to style with additional CSS classes
- **Accessible**: Includes proper ARIA labels for screen readers
- **Callback Support**: Get notified when the rating changes

## 🎯 Use Cases

- Product ratings in e-commerce
- User feedback collection
- Review systems
- Quality assessments
- Satisfaction surveys
- Content rating

## 📦 Installation

Simply copy the `five_star_button.jsx` file to your React project.

## 🚀 Basic Usage

```jsx
import FiveStarButton from "./five_star_button"

function App() {
  return <FiveStarButton />
}
```

## 📋 Props

| Prop             | Type       | Default     | Description                                  |
| ---------------- | ---------- | ----------- | -------------------------------------------- |
| `onRatingChange` | `function` | `undefined` | Callback function called when rating changes |
| `initialRating`  | `number`   | `0`         | Initial rating value (0-5)                   |
| `size`           | `string`   | `"md"`      | Size variant: `"sm"`, `"md"`, or `"lg"`      |
| `className`      | `string`   | `""`        | Additional CSS classes for customization     |

## 💡 Examples

### Basic Rating Button

```jsx
<FiveStarButton />
```

### With Initial Rating

```jsx
<FiveStarButton initialRating={3} />
```

### With Callback Function

```jsx
<FiveStarButton
  onRatingChange={rating => {
    console.log("New rating:", rating)
    // Save to database, update state, etc.
  }}
/>
```

### Different Sizes

```jsx
{
  /* Small */
}
;<FiveStarButton size="sm" />

{
  /* Medium (default) */
}
;<FiveStarButton size="md" />

{
  /* Large */
}
;<FiveStarButton size="lg" />
```

### Custom Styling

```jsx
<FiveStarButton className="shadow-lg border-2 border-blue-500" size="lg" />
```

### Complete Example

```jsx
import React, { useState } from "react"
import FiveStarButton from "./five_star_button"

function ProductReview() {
  const [rating, setRating] = useState(0)

  const handleRatingChange = newRating => {
    setRating(newRating)
    // You could save this to a database here
    console.log("User rated:", newRating, "stars")
  }

  return (
    <div className="space-y-4">
      <h3>Rate this product:</h3>
      <FiveStarButton
        initialRating={rating}
        onRatingChange={handleRatingChange}
        size="lg"
      />
      {rating > 0 && <p>You rated: {rating} out of 5 stars</p>}
    </div>
  )
}
```

## 🎨 Styling

The component uses Tailwind CSS classes and supports both light and dark themes:

- **Light theme**: Yellow stars on white background
- **Dark theme**: Yellow stars on dark gray background
- **Hover effects**: Scale animation and color transitions
- **Focus states**: Blue ring for keyboard navigation

### Custom CSS Classes

You can override the default styling by passing custom classes:

```jsx
<FiveStarButton className="bg-blue-50 border-blue-200 hover:bg-blue-100" />
```

## 🌟 Behavior

1. **Hover**: Stars light up from left to right as you hover
2. **Click**: Sets the rating permanently at the clicked star
3. **Visual Feedback**: Smooth animations and color transitions
4. **Keyboard Accessible**: Can be focused and activated with keyboard

## 🎭 Dark Mode

The component automatically adapts to your theme:

- Uses `dark:` prefixed classes
- Stars change color appropriately
- Background and borders adjust to theme

## 🔧 Dependencies

- React (with hooks)
- Tailwind CSS

## 📱 Responsive Design

The component works well on all screen sizes:

- Touch-friendly on mobile devices
- Appropriate sizing for different viewports
- Maintains hover effects on desktop

## ⚡ Performance

- Lightweight component with minimal re-renders
- Efficient state management
- Smooth 60fps animations

## 🎪 Interactive Demo

Try hovering over the stars and clicking to set a rating. The component maintains the selected rating while providing instant visual feedback on hover.

---

**Created by**: ankitpokhrel08  
**Version**: 1.0.0  
**License**: MIT
