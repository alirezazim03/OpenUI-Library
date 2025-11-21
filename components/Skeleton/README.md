# Skeleton Component

The **Skeleton** component provides a visual placeholder while content is loading.  
It uses a smooth shimmer animation and customizable dimensions.

## Props

| Prop | Type | Default | Description |
|------|------|----------|-------------|
| `width` | `string` | `100%` | Sets the width of the skeleton block |
| `height` | `string` | `20px` | Sets the height of the skeleton block |
| `borderRadius` | `string` | `8px` | Rounds the corners of the skeleton |

## Example

```jsx
import Skeleton from "./Skeleton";

export default function Example() {
  return (
    <>
      <Skeleton width="200px" height="20px" />
      <Skeleton width="100%" height="40px" borderRadius="12px" />
    </>
  );
}
