# YouTube App Card

A modern app store card component designed to showcase app information with a clean, modern design inspired by mobile app stores. Features the YouTube app as an example with logo, metrics, status badge, and decorative elements.

**Author:** @zxnb01

## Features

- **App Logo & Category**: YouTube logo with category label
- **Status Badge**: Rounded "Free" pill badge to show availability
- **App Name**: Bold serif font title for emphasis
- **Metrics Display**: Rating, size, and download count in organized layout
- **Interactive Button**: Circular action button with play/pause states
- **Decorative Elements**: Colorful brushstroke SVG illustrations in corners
- **Responsive Design**: Mobile-first approach with proper spacing
- **Accessibility**: Proper ARIA labels and focus states

## Props

| Prop           | Type     | Default     | Description                                              |
| -------------- | -------- | ----------- | -------------------------------------------------------- |
| `appName`      | string   | "YouTube"   | The name of the app to display                           |
| `category`     | string   | "Videos"    | App category label displayed next to logo               |
| `isFree`       | boolean  | true        | Whether to show the 'Free' badge                        |
| `rating`       | number   | 5.0         | App rating score                                         |
| `size`         | string   | "98.5 mb"   | App size in readable format                              |
| `downloads`    | string   | "8.5m"      | Number of downloads in readable format                   |
| `isPaused`     | boolean  | true        | Whether download/install is paused (affects button icon)|
| `onActionClick`| function | undefined   | Callback function when the action button is clicked     |

## Usage

```jsx
import YouTubeAppCard from './YouTubeAppCard'

function App() {
  const handleActionClick = () => {
    console.log('Action button clicked!')
    // Implement download/pause/resume logic here
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Default YouTube App Card */}
      <YouTubeAppCard onActionClick={handleActionClick} />
      
      {/* Custom App Card */}
      <YouTubeAppCard
        appName="Spotify"
        category="Music"
        rating={4.8}
        size="156 mb"
        downloads="12.3m"
        isPaused={false}
        onActionClick={handleActionClick}
      />
      
      {/* Paid App Example */}
      <YouTubeAppCard
        appName="Procreate"
        category="Graphics"
        isFree={false}
        rating={4.9}
        size="2.1 gb"
        downloads="5.2m"
        onActionClick={handleActionClick}
      />
    </div>
  )
}
```

## Styling

This component uses Tailwind CSS for styling and includes:

- **Layout**: Flexbox for responsive positioning
- **Colors**: Red YouTube branding, green free badge, blue action button
- **Typography**: Serif font for app name, clean sans-serif for metrics
- **Effects**: Hover states, focus rings, smooth transitions
- **Decorative**: SVG brushstroke elements with opacity for visual interest

## Customization

You can easily customize this component for different apps by:

1. **Changing the logo**: Replace the YouTube SVG with your app's logo
2. **Updating colors**: Modify the color classes to match your brand
3. **Adjusting metrics**: Change the metric labels and values as needed
4. **Custom decorations**: Replace or modify the SVG decorative elements

## Accessibility

- Proper ARIA labels for the action button
- Focus states with visible ring indicators
- Semantic HTML structure
- Color contrast meets WCAG guidelines
- Keyboard navigation support

## Browser Support

This component works in all modern browsers that support:
- CSS Grid and Flexbox
- SVG elements
- CSS transforms and transitions