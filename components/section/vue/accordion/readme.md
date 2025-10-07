# Accordion

A reusable and accessible accordion component for Vue.js applications. It displays collapsible sections with smooth animations, perfect for FAQs, grouped content, or any information that benefits from expandable panels.

**Author:** [@xMrAfonso](https://github.com/xMrAfonso)

## Features

- Smooth expand/collapse animations with Vue transitions
- Single or multiple open sections support
- Customizable default open state
- Dark mode support with Tailwind CSS
- Accessible keyboard navigation
- Slot support for custom content rendering
- Responsive design with modern styling
- Chevron icon animation on toggle
- Hover effects for better interactivity

## Props

| Prop          | Type            | Default                                                                                                                                                                                                                                      | Description                                       |
| ------------- | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| `items`       | Array           | `[{ title: "What is Vue.js?", content: "Vue.js is a progressive framework for building UIs." }, { title: "What is TailwindCSS?", content: "TailwindCSS is a utility-first CSS framework." }, { title: "Why use both?", content: "Because they're fast, flexible, and fun!" }]` | Accordion items array with title and content properties |
| `multiple`    | Boolean         | `false`                                                                                                                                                                                                                                      | Whether multiple items can be open at once        |
| `defaultOpen` | Number \| Array | `[]`                                                                                                                                                                                                                                         | Index or indices of initially open items          |

## Usage

### Basic Usage

```vue
<template>
  <Accordion :items="sections" />
</template>

<script setup>
import Accordion from "./Accordion.vue"

const sections = [
  { title: "What is Vue.js?", content: "Vue.js is a progressive framework for building UIs." },
  { title: "What is TailwindCSS?", content: "TailwindCSS is a utility-first CSS framework." },
  { title: "Why use both?", content: "Because they're fast, flexible, and fun!" }
]
</script>
```

### Multiple Open Sections

```vue
<Accordion :items="sections" :multiple="true" :defaultOpen="[0, 2]" />
```

### Single Section Open by Default

```vue
<Accordion :items="sections" :defaultOpen="0" />
```

### Custom Content with Slots

```vue
<Accordion :items="sections">
  <template #content-0>
    <div class="space-y-2">
      <p class="font-bold">Custom content for first item!</p>
      <ul class="list-disc list-inside">
        <li>Feature 1</li>
        <li>Feature 2</li>
      </ul>
    </div>
  </template>
  <template #content-1>
    <p class="italic text-blue-600">Custom styled content</p>
  </template>
</Accordion>
```

## Dependencies

- Vue 3 (Composition API)
- Tailwind CSS for styling

## Customization

- Modify colors, borders, and spacing via Tailwind classes in the component
- Adjust animation duration by changing `duration-300` in transition classes
- Override hover states with custom `hover:bg-*` classes
- Customize the chevron icon by replacing the SVG path
- Change the border radius by modifying `rounded-2xl` class
- Adjust text colors for light/dark mode with `text-gray-*` utilities

## Accessibility

- Semantic HTML with proper `<button>` elements for toggling
- Keyboard navigation support (Enter/Space to toggle)
- Visual feedback for hover and active states
- Smooth animations for better user experience
- Screen reader compatible with clear content structure
- Focus states visible for keyboard users

## License

`MIT`
