# Swipeable Product Card

A visually immersive, interactive card component designed for showcasing products with swipeable images, navigation controls, product details, price, badges, and a call-to-action button.

**Author:** [@alirezazim03](https://github.com/alirezazim03)

## Features

- Swipeable image carousel (touch-friendly)
- Next/Previous navigation buttons
- Product details with title, description, and price
- Customizable highlight badges (e.g., “Top Pick”, “Only 3 left”)
- Call-to-action button for purchase or custom action
- Responsive and accessible design

## Props

| Prop            | Type       | Default       | Description                                               |
| --------------- | ---------- | ------------- | --------------------------------------------------------- |
| `title`         | string     | "Product"     | Product name displayed on the card                        |
| `description`   | string     | ""            | Short description of the product                          |
| `price`         | string     | "$0.00"       | Price of the product displayed on the card                |
| `badges`        | array      | []            | Highlight tags like "Top Pick" or "Only 9 left"           |
| `images`        | array      | []            | Array of image URLs for the swipeable carousel            |
| `buttonText`    | string     | "Buy Now"     | Text for the call-to-action button                        |
| `onButtonClick` | function   | undefined     | Callback function when the button is clicked              |
| `showNavigation`| boolean    | true          | Toggle to show/hide next/previous navigation buttons      |
| `enableSwipe`   | boolean    | true          | Enable swipe gestures for image carousel                  |

## Usage

```jsx
import SwipeableProductCard from './SwipeableProductCard'

function App() {
  const handleBuyClick = () => {
    console.log('Product added to cart!')
    // Implement your add-to-cart logic here
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <SwipeableProductCard
        title="Wireless Headphones"
        description="High-quality sound with noise cancellation."
        price="$199"
        badges={["Top Pick", "Limited Stock"]}
        images={[
          "https://your-image-url.com/product1.jpg",
          "https://your-image-url.com/product2.jpg",
          "https://your-image-url.com/product3.jpg"
        ]}
        buttonText="Add to Cart"
        onButtonClick={handleBuyClick}
        showNavigation={true}
        enableSwipe={true}
      />
    </div>
  )
}
```

## Dependencies

- React 16.8+
- Tailwind CSS for styling

## Design Notes

- The image carousel supports both **swipe gestures** and **navigation buttons**  
- Badges are displayed as **pills above the product title** for emphasis  
- The call-to-action button uses a strong color to drive conversions  
- Fully responsive layout optimized for mobile and desktop  