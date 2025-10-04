# Milestone Fireworks

A fun and engaging React component that displays animated fireworks over user maps whenever global user milestones are reached (e.g., 10k, 50k, 100k users). Fireworks animate over regions contributing most to the milestone.

**Author:** [@TejaswaniRai](https://github.com/TejaswaniRai)

## Features

- 🎆 Animated fireworks with realistic particle effects
- 🗺️ Region-based positioning over user contribution areas
- 🌙 Dark and light mode compatibility
- 🔄 Modular and reusable for future celebrations
- 🚀 Non-blocking: users can continue interacting with the map
- ⚡ Performance optimized with CSS animations
- 🎯 Customizable duration and intensity

## Props

| Prop        | Type                                      | Default   | Description                                               |
| ----------- | ----------------------------------------- | --------- | --------------------------------------------------------- |
| `isActive`  | boolean                                   | false     | Whether the fireworks animation is currently active       |
| `milestone` | number                                    | 10000     | The milestone number being celebrated                     |
| `regions`   | Array<{x: number, y: number, intensity: number}> | []        | Array of regions with coordinates and intensity           |
| `duration`  | number                                    | 5000      | Duration of the fireworks animation in milliseconds       |
| `onComplete`| function                                  | () => {}  | Callback function called when animation completes         |
| `className` | string                                    | ""        | Additional CSS classes to apply to the container          |
| `theme`     | 'light' \| 'dark'                        | "dark"    | Theme for the fireworks colors                            |

## Usage

```jsx
import MilestoneFireworks from './MilestoneFireworks'

function UserMap() {
  const [showFireworks, setShowFireworks] = useState(false)
  const [currentMilestone, setCurrentMilestone] = useState(10000)

  // Regions contributing to the milestone
  const milestoneRegions = [
    { x: 150, y: 200, intensity: 0.8 }, // High contribution region
    { x: 300, y: 150, intensity: 0.6 }, // Medium contribution region
    { x: 450, y: 300, intensity: 0.4 }, // Low contribution region
  ]

  const handleMilestoneReached = (milestone) => {
    setCurrentMilestone(milestone)
    setShowFireworks(true)
  }

  const handleFireworksComplete = () => {
    setShowFireworks(false)
  }

  return (
    <div className="relative">
      {/* Your map component here */}
      <UserMapComponent />

      {/* Fireworks overlay */}
      <MilestoneFireworks
        isActive={showFireworks}
        milestone={currentMilestone}
        regions={milestoneRegions}
        duration={5000}
        onComplete={handleFireworksComplete}
        theme="dark"
      />
    </div>
  )
}
```

## Advanced Usage

### Dynamic Region Calculation

```jsx
// Calculate regions based on user contribution data
const calculateMilestoneRegions = (userData, mapWidth, mapHeight) => {
  return userData
    .filter(user => user.contribution > threshold)
    .map(user => ({
      x: (user.location.lng / 360 + 0.5) * mapWidth,
      y: (1 - Math.log(Math.tan(user.location.lat * Math.PI / 180) + 1 / Math.cos(user.location.lat * Math.PI / 180)) / Math.PI) / 2 * mapHeight,
      intensity: Math.min(user.contribution / maxContribution, 1)
    }))
}
```

### Theme Integration

```jsx
const [theme, setTheme] = useState('dark')

// Fireworks automatically adapt to theme
<MilestoneFireworks
  isActive={true}
  theme={theme}
  regions={regions}
/>
```

## Dependencies

- React 16.8+ (uses hooks)
- Tailwind CSS for base styling (optional, component uses inline styles)

## Animation Details

The fireworks animation consists of:

- **Launch Phase**: Rockets shoot up from random positions
- **Explosion Phase**: Particles burst outward in colorful patterns
- **Fade Phase**: Particles gradually disappear with gravity effect
- **Multiple Bursts**: Sequential explosions for dramatic effect

## Performance Considerations

- Uses CSS transforms and opacity for smooth 60fps animations
- Automatically cleans up animations when component unmounts
- Non-blocking by design - doesn't interfere with user interactions
- Optimized particle count based on device capabilities

## Browser Support

- Modern browsers with CSS transforms support
- Graceful degradation on older browsers (animations disabled)
- Mobile-friendly with touch interaction preservation

## Customization

- Modify particle colors by updating the `fireworkColors` array
- Adjust particle count by changing the `particleCount` variable
- Customize explosion patterns by modifying the particle generation logic
- Change animation timing by updating duration and delay values
