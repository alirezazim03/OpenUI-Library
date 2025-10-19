# Skeleton

A reusable and lightweight skeleton loader component for React. It visually indicates content is loading by displaying placeholder shapes, improving perceived performance for users while data is being fetched.

**Author:** [@Jainam-not-a-robot](https://github.com/Jainam-not-a-robot)

---

## Features

- Displays placeholder shapes for loading content
- Works with any layout: cards, lists, tables, etc.
- Pulse animation to indicate loading state
- Fully customizable via `className` or `style`
- Lightweight and dependency-free
- Compatible with Next.js using `"use client"`

---

## Props

| Prop        | Type                  | Default | Description                                           |
| :---------- | :------------------- | :------ | :---------------------------------------------------- |
| `className` | `string`             | `""`    | Additional Tailwind CSS classes to style the skeleton |
| `style`     | `React.CSSProperties` | `{}`    | Inline styles for the skeleton container (optional)   |

---

## Usage

```jsx
import { Skeleton } from './Skeleton'

export default function App() {
  return (
    <div className="space-y-2 p-4">
      <Skeleton className="h-4 w-3/4 rounded-md" />
      <Skeleton className="h-4 w-1/2 rounded-md" />
      <Skeleton className="h-4 w-4/5 rounded-md" />
    </div>
  )
}
```
