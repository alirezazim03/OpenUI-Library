# Mood Emoji Reaction Panel

A React component that allows users to react to content using animated emoji buttons. Perfect for adding interactive feedback to cards, posts, or notifications.

## Features

- Multiple emoji options (😄, 😢, 😲, 👍, ❤️, 😂, 😮, 😡)
- Animated reactions on click (bounce animation)
- Optional counters to display total reactions per emoji
- Fully responsive and works with dark and light modes
- Lightweight and non-blocking
- Accessible with proper ARIA labels

## Props

| Prop          | Type      | Default   | Description                                                                 |
| ------------- | --------- | --------- | --------------------------------------------------------------------------- |
| `showCounters`| boolean   | true      | Whether to display reaction counters on the emoji buttons                   |
| `onReaction`  | function  | undefined | Callback function triggered when a reaction is clicked, receives the emoji |
| `className`   | string    | ''        | Additional CSS classes to apply to the panel                                |

## Usage

```jsx
import MoodEmojiReactionPanel from "./MoodEmojiReactionPanel"

function App() {
  const handleReaction = emoji => {
    console.log("User reacted with:", emoji)
    // Handle the reaction, e.g., send to server
  }

  return (
    <div>
      <MoodEmojiReactionPanel
        onReaction={handleReaction}
        showCounters={true}
        className="my-custom-class"
      />
      {/* Rest of your content */}
    </div>
  )
}
```

## Use Cases

- Add interactive feedback to cards, posts, or notifications
- Make dashboards, social feeds, or component previews more engaging
- Provide playful, real-time reactions without leaving the page
