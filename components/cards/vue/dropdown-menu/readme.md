# Dropdown Menu

A reusable and accessible dropdown menu component for Vue.js applications. It provides a clean interface for displaying action menus, navigation options, or any list of selectable items with smooth animations and customizable styling.

**Author:** [@xMrAfonso](https://github.com/xMrAfonso)

## Features

- Smooth open/close animations with Vue transitions
- Click outside to close functionality
- Three button style variants (primary, secondary, outline)
- Customizable menu items with action callbacks
- Animated chevron icon that rotates on toggle
- Responsive design with modern styling
- Accessible keyboard navigation
- Hover effects for better interactivity
- Automatic positioning with fixed z-index
- Clean and minimal design

## Props

| Prop      | Type   | Default                                                                                                                                                                                                    | Description                                                                    |
| --------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `label`   | String | `"Menu"`                                                                                                                                                                                                   | The text displayed on the dropdown trigger button                              |
| `items`   | Array  | `[{ label: 'Profile', action: () => console.log('Profile clicked') }, { label: 'Settings', action: () => console.log('Settings clicked') }, { label: 'Logout', action: () => console.log('Logout clicked') }]` | Array of menu items with `label` (String) and optional `action` (Function) callback |
| `variant` | String | `"primary"`                                                                                                                                                                                                | Button style variant. Options: `'primary'` (blue), `'secondary'` (gray), `'outline'` (bordered) |

## Usage

### Basic Usage

```vue
<template>
  <DropdownMenu :items="menuItems" />
</template>

<script setup>
import DropdownMenu from "./DropdownMenu.vue"

const menuItems = [
  { label: 'Profile', action: () => console.log('Profile clicked') },
  { label: 'Settings', action: () => console.log('Settings clicked') },
  { label: 'Logout', action: () => console.log('Logout clicked') }
]
</script>
```

### Custom Label

```vue
<DropdownMenu label="Actions" :items="menuItems" />
```

### Different Button Variants

```vue
<!-- Primary variant (default - blue) -->
<DropdownMenu label="Primary" :items="menuItems" variant="primary" />

<!-- Secondary variant (gray) -->
<DropdownMenu label="Secondary" :items="menuItems" variant="secondary" />

<!-- Outline variant (bordered) -->
<DropdownMenu label="Outline" :items="menuItems" variant="outline" />
```

### With Custom Actions

```vue
<template>
  <DropdownMenu label="User Menu" :items="userActions" />
</template>

<script setup>
import { useRouter } from 'vue-router'
import DropdownMenu from "./DropdownMenu.vue"

const router = useRouter()

const userActions = [
  { 
    label: 'View Profile', 
    action: () => router.push('/profile') 
  },
  { 
    label: 'Account Settings', 
    action: () => router.push('/settings') 
  },
  { 
    label: 'Help & Support', 
    action: () => window.open('/help', '_blank') 
  },
  { 
    label: 'Sign Out', 
    action: () => {
      // Handle logout logic
      console.log('Signing out...')
    }
  }
]
</script>
```

### Navigation Menu

```vue
<template>
  <DropdownMenu label="More" :items="navigationLinks" variant="outline" />
</template>

<script setup>
import DropdownMenu from "./DropdownMenu.vue"

const navigationLinks = [
  { label: 'Dashboard', action: () => navigateTo('/dashboard') },
  { label: 'Projects', action: () => navigateTo('/projects') },
  { label: 'Team', action: () => navigateTo('/team') },
  { label: 'Reports', action: () => navigateTo('/reports') }
]

function navigateTo(path) {
  console.log(`Navigating to ${path}`)
  // Your navigation logic here
}
</script>
```

## Dependencies

- Vue 3 (Composition API)
- Tailwind CSS for styling

## Customization

- Modify button colors by changing the `buttonClasses` computed property
- Adjust dropdown width by changing `w-48` class
- Change animation duration by modifying transition classes (`duration-100`, `duration-75`)
- Customize dropdown position by changing `left-0` to `right-0` for right-aligned menus
- Override hover states with custom `hover:bg-*` classes
- Modify the chevron icon by replacing the SVG path
- Adjust shadow and ring styles for different visual effects
- Change `z-50` to modify dropdown stacking order

## Accessibility

- Semantic HTML with proper `<button>` elements
- Keyboard navigation support (Enter/Space to toggle, Escape to close)
- Click outside to close functionality
- Visual feedback for hover and active states
- Smooth animations for better user experience
- Focus states visible for keyboard users
- Screen reader compatible with clear labeling

## Browser Compatibility

Works in all modern browsers that support Vue 3 and CSS transforms.

## License

`MIT`
