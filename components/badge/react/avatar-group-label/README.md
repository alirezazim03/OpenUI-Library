# Avatar Group Label

A compact avatar group with overlapping profile pictures and a trust label — great for showing credibility or user engagement.

**Author:** [@shridmishra](https://github.com/shridmishra)

---

## Features

- Displays multiple circular avatars in an overlapping row.
- Includes a customizable trust label.
- Fully styled with Tailwind CSS.
- Lightweight and framework-agnostic.

---

## Props

| Prop       | Type      | Default                   | Description                                      |
| :---------- | :-------- | :------------------------ | :----------------------------------------------- |
| `avatars`   | string[]  | `[]`                      | Array of image URLs for avatars.                 |
| `label`     | string    | `"Trusted by 10,000+ people"` | Text displayed next to the avatar group.         |

---

## Usage

```jsx
import AvatarGroupLabel from "./AvatarGroupLabel"

export default function App() {
  return <AvatarGroupLabel />
}
