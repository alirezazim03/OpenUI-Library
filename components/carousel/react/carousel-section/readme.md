# React Carousel

A flexible, responsive, and accessible Carousel component for React and Next.js applications. It's designed to be self-contained and works out of the box with a beautiful default preview.

**Author:** [@Saikiran-Sugurthi](https://github.com/Saikiran-Sugurthi)

## Features

-   **Fully Responsive:** Adapts to any screen size.
-   **Touch & Swipe Gestures:** Native swipe support for mobile devices.
-   **Autoplay & Looping:** Automatically cycles through slides with an optional infinite loop.
-   **Accessible:** Built with ARIA attributes and keyboard navigation.
-   **Self-Contained:** All styles are included via CSS-in-JS, requiring no external CSS files or dependencies.
-   **Built-in Preview:** Automatically displays a default set of landscape images when no children are provided, making it perfect for UI libraries.

## Props

| Prop         | Type      | Default | Description                                                   |
| :---         | :---      | :---    | :---                                                          |
| `children`   | ReactNode | `null`  | The slides to display. If omitted, a default preview is shown.  |
| `autoplay`   | boolean   | `false` | If `true`, the carousel will play automatically.                |
| `interval`   | number    | `3000`  | The time (in ms) between automatic slide transitions.         |
| `loop`       | boolean   | `true`  | If `true`, the carousel will loop back after the last slide.    |
| `showArrows` | boolean   | `true`  | If `true`, displays the left and right navigation arrows.     |
| `showDots`   | boolean   | `true`  | If `true`, displays the pagination dots at the bottom.        |

## Usage

To use the carousel with your own content, simply pass your elements (like `<img>` tags or custom components) as children. This will override the default preview.

```jsx
import Carousel from "./Carousel";

function MyPageComponent() {
  return (
    <div style={{ maxWidth: "900px", margin: "auto" }}>
      <Carousel autoplay={true} loop={true}>
        <img src="/images/my-custom-image-1.jpg" alt="My first custom slide" />
        <img src="/images/my-custom-image-2.jpg" alt="My second custom slide" />
        <div>
          <h3>Slide 3</h3>
          <p>This is a custom component slide!</p>
        </div>
      </Carousel>
    </div>
  );
}