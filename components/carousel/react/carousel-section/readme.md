# React Carousel

A flexible, responsive, and accessible Carousel component for React applications, built to showcase images, products, or any custom content with touch support and autoplay.

**Author:** [@Saikiran-Sugurthi](https://github.com/Saikiran-Sugurthi)

## Features

-   Fully responsive design that adapts to any screen size
-   Touch and swipe gestures for a native mobile experience
-   Autoplay functionality with a configurable interval
-   Infinite looping to create a seamless slideshow
-   Customizable navigation controls, including arrows and dots
-   Accessible with ARIA attributes and keyboard navigation
-   Self-contained styling via CSS-in-JS, no external CSS needed

## Props

| Prop         | Type      | Default | Description                                                   |
| :---         | :---      | :---    | :---                                                          |
| `children`   | ReactNode | `null`  | The slides to display inside the carousel.                    |
| `autoplay`   | boolean   | `false` | If `true`, the carousel will play automatically.                |
| `interval`   | number    | `3000`  | The time (in ms) between automatic slide transitions.         |
| `loop`       | boolean   | `true`  | If `true`, the carousel will loop back after the last slide.    |
| `showArrows` | boolean   | `true`  | If `true`, displays the left and right navigation arrows.     |
| `showDots`   | boolean   | `true`  | If `true`, displays the pagination dots at the bottom.        |

## Usage

```jsx
import Carousel from "./Carousel";

function App() {
  return (
    <div className="max-w-4xl mx-auto my-8">
      <Carousel autoplay={true} loop={true}>
        <img
          src="[https://picsum.photos/id/1018/1200/500](https://picsum.photos/id/1018/1200/500)"
          alt="Scenic view of mountains and a lake"
        />
        <img
          src="[https://picsum.photos/id/1015/1200/500](https://picsum.photos/id/1015/1200/500)"
          alt="A person standing on a mountain peak"
        />
        <img
          src="[https://picsum.photos/id/1025/1200/500](https://picsum.photos/id/1025/1200/500)"
          alt="A friendly dog in a natural setting"
        />
      </Carousel>
    </div>
  );
}