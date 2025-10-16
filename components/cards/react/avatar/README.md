# Avatar Component

A flexible and accessible React avatar component supporting three display types: image-based avatars, placeholder icons, and user initials. Built with Tailwind CSS for easy customization and responsive design.

---

**Author:** [@GlenFonceca](github.com/GlenFonceca)

---

## Features

- **Three Avatar Types**: Image, placeholder icon, and initials
- **Automatic Fallback**: Images automatically fall back to initials on error
- **Multiple Sizes**: 6 preset sizes from xs to 2xl
- **Shape Variants**: Circle, square, and rounded options
- **Customizable Colors**: Custom background and text colors
- **Accessible**: Includes proper ARIA labels and alt text
- **Lightweight**: No external dependencies except React
- **TypeScript Ready**: Includes PropTypes validation

## Usage

### Basic Examples

#### Placeholder Avatar (Default)
```jsx

import Avatar from './Avatar'

<Avatar /> 
```

#### Image Avatar
```jsx
<Avatar 
  type="image"
  src="https://example.com/user.jpg"
  name="John Doe"
  alt="John Doe profile picture"
/>
```

#### Initials Avatar
```jsx
<Avatar 
  type="initials"
  name="Jane Smith"
  bgColor="#10b981"
/>
```

## Advanced Usage

#### Different Sizes
```jsx

<Avatar size="xs" type="initials" name="AB" />
<Avatar size="sm" type="initials" name="CD" />
<Avatar size="md" type="initials" name="EF" />
<Avatar size="lg" type="initials" name="GH" />
<Avatar size="xl" type="initials" name="IJ" />
<Avatar size="2xl" type="initials" name="KL" />
```

#### Different Shapes
```jsx
<Avatar shape="circle" type="initials" name="Circle" />
<Avatar shape="square" type="initials" name="Square" />
<Avatar shape="rounded" type="initials" name="Rounded" />
```

#### Custom Colors
```jsx
<Avatar 
  type="initials"
  name="Custom Color"
  bgColor="#ec4899"
  textColor="#fef3c7"
/>
```
#### With Error Handling
```jsx
<Avatar 
  type="image"
  src="https://invalid-url.com/image.jpg"
  name="Fallback User"
  onError={() => console.log('Image failed to load')}
/>
```
--- 

## Props

|Prop       |  Type                              |  Default        |  Description                             |
|-----------|------------------------------------|-----------------|------------------------------------------|
|`type`       |  `image` \| `placeholder`\| `initials`  |  'placeholder'  |  Avatar display type                     |
|`src`        |  `string`                            |  ''             |  Image URL for image type                |
|`name`       |  `string`                            |  'User'         |  User name for initials and accessibility|
|`size`       |  `xs`\|`sm`\|``md``\|`lg`\|`xl`\|`2xl`    |  'md'           |  Avatar size                             |
|`alt`        |  `string`                            |  ''             |  Alternative text for accessibility      |
|`className`  |  `string`                            |  ''             |  Additional CSS classes                  |
|`bgColor`    |  `string`                            |  '#6366f1'      |  Background color (hex format)           |
|`textColor`  |  `string`                            |  '#ffffff'      |  Text/icon color (hex format)            |
|`shape`      |  `circle`\|`square`\|`rounded`       |  'circle'       |  Avatar shape                            |
|`onError`    |  `function`                          |  null           |  Callback for image load errors          |

## Size Reference
```jsx
xs: 32px (w-8 h-8)

sm: 40px (w-10 h-10)

md: 48px (w-12 h-12)

lg: 64px (w-16 h-16)

xl: 80px (w-20 h-20)

2xl: 96px (w-24 h-24)
```

## Customization
#### Using Custom Classes
```jsx
<Avatar 
  className="border-4 border-blue-500 shadow-lg"
  type="initials"
  name="Custom Style"
/>
```

#### Generating Dynamic Colors
```jsx
const stringToColor = (str) => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  const color = Math.floor(Math.abs((Math.sin(hash) * 16777215) % 1) * 16777215)
  return '#' + color.toString(16).padStart(6, '0')
}

<Avatar 
  type="initials"
  name="Dynamic Color"
  bgColor={stringToColor('Dynamic Color')}
/>
```
--- 

### Accessibility
- This component follows WCAG 2.2 accessibility standards:

- Includes role="img" for non-image avatars

- Supports aria-label through the alt prop

- Provides proper alt text for image avatars

- Maintains sufficient color contrast (ensure custom colors meet WCAG guidelines)

- Keyboard accessible when used within interactive elements

### Dependencies
- React 16.8+
- Tailwind CSS 3.0+

### Browser Support
- Works in all modern browsers that support ES6 and CSS Flexbox.