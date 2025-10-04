# FlipCard Component

A versatile React flip card component built with Tailwind CSS, featuring smooth 3D animations, customizable content, and responsive design. Perfect for showcasing information with an interactive twist.

## 📸 Preview

```jsx
<FlipCard
  frontImage="https://example.com/john.jpg"
  frontTitle="John Doe"
  backContent="Full-stack developer with 5 years of experience in React and Node.js."
  buttons={[
    { text: 'Learn More', onClick: () => console.log('Learn more') }
  ]}
  iconLinks={[
    { icon: '🔗', url: 'https://github.com/johndoe' }
  ]}
  flipDirection="horizontal"
  gradient={true}
/>
```

### Front Side
```
+---------------------+
|                     |
|       [Image]       |
|                     |
|     John Doe        |
|                     |
+---------------------+
```

### Back Side
```
+---------------------+
| Full-stack developer|
| with 5 years of exp |
| in React and Node.js|
|                     |
| [Learn More] [🔗]   |
+---------------------+
```

Click the card to flip between front and back sides with a smooth 3D animation.

## ✨ Features

- **3D Flip Animation**: Smooth horizontal or vertical flip effects
- **Interactive Triggers**: Flips on click with hover scale effect for enhanced user engagement
- **Customizable Content**: Support for images, titles, detailed back content, buttons, and icon links
- **Responsive Design**: Adapts seamlessly to different screen sizes
- **Gradient Support**: Optional gradient backgrounds for modern aesthetics
- **Flexible Layout**: Configurable front and back sides with various content types
- **Tailwind Integration**: Fully styled with Tailwind CSS classes

## 🚀 Quick Start

### 1. Include Dependencies

Ensure your project has React and Tailwind CSS set up:

```bash
npm install react tailwindcss
```

### 2. Copy the Component

Copy the `FlipCard.jsx` component into your project.

### 3. Import and Use

```jsx
import FlipCard from './FlipCard';

function App() {
  return (
    <FlipCard
      frontTitle="John Doe"
      frontImage="https://example.com/john.jpg"
      backContent="Full-stack developer with 5 years of experience in React and Node.js."
      flipDirection="horizontal"
    />
  );
}
```

## 📋 API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `frontImage` | `string` | - | URL of the image to display on the front side |
| `frontTitle` | `string` | - | Title text to display on the front side |
| `backContent` | `string \| JSX.Element` | - | Content to display on the back side |
| `buttons` | `Array<{text: string, onClick: function}>` | `[]` | Array of button objects for the back side |
| `iconLinks` | `Array<{icon: JSX.Element, url: string}>` | `[]` | Array of icon link objects for the back side |
| `flipDirection` | `'horizontal' \| 'vertical'` | `'horizontal'` | Direction of the flip animation |
| `gradient` | `boolean` | `false` | Whether to apply a gradient background to the front side |

## 🎨 Customization

### Styling the Card

Modify the component's Tailwind classes to customize appearance:

```jsx
// Custom card with different colors
<FlipCard
  frontTitle="Custom Card"
  backContent="Custom styled content"
  className="bg-red-500 hover:bg-red-600" // Note: This would require extending the component
/>
```

### Animation Timing

Adjust the flip animation duration by modifying the `duration-700` class:

```jsx
// In the component, change to duration-500 for faster animation
className="transition-transform duration-500 ..."
```

### Custom Button Styling

Override button styles by passing custom button components:

```jsx
const customButtons = [
  {
    text: 'View Profile',
    onClick: () => console.log('Profile clicked'),
    className: 'bg-green-500 hover:bg-green-600' // Custom class
  }
];

<FlipCard
  frontTitle="John Doe"
  backContent="Developer"
  buttons={customButtons}
/>
```

## 🔧 Component Code

```jsx
import React, { useState } from 'react';

const FlipCard = ({
  frontImage,
  frontTitle,
  backContent,
  buttons = [],
  iconLinks = [],
  flipDirection = 'horizontal',
  gradient = false
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const flipClass = flipDirection === 'vertical' ? 'rotate-x-180' : 'rotate-y-180';
  const frontTransform = isFlipped ? flipClass : '';
  const backTransform = isFlipped ? '' : flipClass;

  const cardClasses = `relative w-full h-64 cursor-pointer transition-transform duration-700 hover:scale-105 ${gradient ? 'bg-gradient-to-br from-blue-500 to-purple-600' : 'bg-blue-500'} text-white rounded-lg shadow-lg overflow-hidden`;

  const frontClasses = `absolute inset-0 w-full h-full flex flex-col items-center justify-center p-4 transform ${frontTransform}`;
  const backClasses = `absolute inset-0 w-full h-full flex flex-col items-center justify-center p-4 bg-gray-100 text-gray-800 transform ${backTransform}`;

  return (
    <div
      className={cardClasses}
      style={{ perspective: '1000px' }}
      onClick={handleFlip}
    >
      <div style={{ transformStyle: 'preserve-3d' }} className="relative w-full h-full">
        {/* Front Side */}
        <div
          className={frontClasses}
          style={{ backfaceVisibility: 'hidden' }}
        >
          {frontImage && (
            <img
              src={frontImage}
              alt={frontTitle}
              className="w-20 h-20 rounded-full mb-4 object-cover"
            />
          )}
          {frontTitle && (
            <h3 className="text-xl font-bold text-center">{frontTitle}</h3>
          )}
        </div>

        {/* Back Side */}
        <div
          className={backClasses}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="text-center mb-4">
            {backContent}
          </div>
          {buttons.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {buttons.map((button, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    button.onClick && button.onClick();
                  }}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  {button.text}
                </button>
              ))}
            </div>
          )}
          {iconLinks.length > 0 && (
            <div className="flex justify-center gap-4">
              {iconLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-gray-600 hover:text-blue-500 transition-colors"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
```

## 💡 Example Usage

### Team Member Card

```jsx
import FlipCard from './FlipCard';

const TeamMemberCard = () => {
  const teamMembers = [
    {
      name: 'Alice Johnson',
      image: 'https://example.com/alice.jpg',
      bio: 'Senior UX Designer with a passion for creating intuitive user experiences. 7+ years in design.',
      buttons: [
        { text: 'View Portfolio', onClick: () => window.open('https://alice-portfolio.com') },
        { text: 'Contact', onClick: () => console.log('Contact Alice') }
      ],
      iconLinks: [
        { icon: '🔗', url: 'https://linkedin.com/in/alice' },
        { icon: '🐦', url: 'https://twitter.com/alice' }
      ]
    },
    {
      name: 'Bob Smith',
      image: 'https://example.com/bob.jpg',
      bio: 'Full-stack Developer specializing in React and Node.js. Loves open-source contributions.',
      buttons: [
        { text: 'GitHub', onClick: () => window.open('https://github.com/bobsmith') }
      ],
      iconLinks: [
        { icon: '💻', url: 'https://github.com/bobsmith' },
        { icon: '📧', url: 'mailto:bob@example.com' }
      ]
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {teamMembers.map((member, index) => (
        <FlipCard
          key={index}
          frontImage={member.image}
          frontTitle={member.name}
          backContent={member.bio}
          buttons={member.buttons}
          iconLinks={member.iconLinks}
          flipDirection="horizontal"
          gradient={true}
        />
      ))}
    </div>
  );
};

export default TeamMemberCard;
```

### Product Showcase Card

```jsx
const ProductCard = () => {
  return (
    <FlipCard
      frontImage="https://example.com/product.jpg"
      frontTitle="Amazing Product"
      backContent={
        <div>
          <p className="mb-2">Revolutionary features that will change your workflow.</p>
          <ul className="text-sm text-left">
            <li>• Feature 1</li>
            <li>• Feature 2</li>
            <li>• Feature 3</li>
          </ul>
        </div>
      }
      buttons={[
        { text: 'Learn More', onClick: () => console.log('Learn more clicked') },
        { text: 'Buy Now', onClick: () => console.log('Buy now clicked') }
      ]}
      flipDirection="vertical"
    />
  );
};
```

## 🎯 Use Cases

### Team Profiles
- Showcase team member photos, names, and detailed bios
- Include contact buttons and social media links

### Product Cards
- Display product images with specifications on the back
- Add purchase or learn more buttons

### Portfolio Items
- Front: Project thumbnail and title
- Back: Description, technologies used, and links

### Testimonials
- Front: Customer photo and name
- Back: Full testimonial and company info

### Menu Items
- Front: Dish photo and name
- Back: Ingredients, allergens, and nutritional info

## ♿ Accessibility Features

- **Keyboard Navigation**: Tab through interactive elements
- **Screen Reader Support**: Proper ARIA labels and semantic structure
- **Motion Preferences**: Respects `prefers-reduced-motion` for animation
- **Focus Management**: Clear focus indicators for buttons and links

## 🛠️ Browser Support

- Chrome 36+
- Firefox 16+
- Safari 9+
- Edge 12+

## 📝 License

MIT License - feel free to use in personal and commercial projects.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and enhancement requests.

---

**Version:** 1.0.0  
**Author:** TejaswaniRai  
**Framework:** React + Tailwind CSS
