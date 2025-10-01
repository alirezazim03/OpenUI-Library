# Modern Chat Card

A modern, interactive card component designed for chat and messaging applications with a beautiful illustration header and call-to-action buttons.

**Author:** [@alirezazim03](https://github.com/alirezazim03)

## Features

- Modern card design with subtle rotation effect
- Customizable header image with decorative pattern overlay
- Flexible text content (title and description)
- Two action buttons (primary and secondary)
- Responsive design with hover effects
- Clean, accessible styling with focus states

## Props

| Prop                  | Type     | Default                                                                  | Description                                        |
| --------------------- | -------- | ------------------------------------------------------------------------ | -------------------------------------------------- |
| `title`               | string   | "What's on your mind?"                                                   | Main title text displayed on the card              |
| `description`         | string   | "You've confirmed abc@xyz.com. You're all ready to start a new group..." | Description text displayed below the title         |
| `primaryButtonText`   | string   | "What's new?"                                                            | Text for the primary action button                 |
| `secondaryButtonText` | string   | "Later"                                                                  | Text for the secondary action button               |
| `onPrimaryClick`      | function | undefined                                                                | Callback function when primary button is clicked   |
| `onSecondaryClick`    | function | undefined                                                                | Callback function when secondary button is clicked |
| `imageUrl`            | string   | placeholder image URL                                                    | URL for the card's header image                    |

## Usage

```jsx
import ChatCard from './ChatCard'

function App() {
  const handlePrimaryClick = () => {
    console.log('Primary button clicked!')
    // Implement your primary action logic here
  }

  const handleSecondaryClick = () => {
    console.log('Secondary button clicked!')
    // Implement your secondary action logic here
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <ChatCard
        title="Welcome to Chat!"
        description="Start a conversation with your team members and collaborate effectively."
        primaryButtonText="Start Chat"
        secondaryButtonText="Maybe Later"
        onPrimaryClick={handlePrimaryClick}
        onSecondaryClick={handleSecondaryClick}
        imageUrl="https://your-image-url.com/image.jpg"
      />
    </div>
  )
}
```

## Dependencies

- React 16.8+
- Tailwind CSS for styling

## Design Notes

- The card features a subtle rotation effect that straightens on hover
- The header includes a decorative dot pattern overlay for visual interest
- The primary button uses a purple color scheme for emphasis
- The component is fully responsive and accessible
