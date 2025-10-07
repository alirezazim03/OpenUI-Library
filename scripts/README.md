# Vue HTML Generator

This script automatically generates browser-compatible HTML files from Vue Single File Components (SFCs).

## Why?

Vue SFCs with `<script setup>` or Options API syntax cannot run directly in the browser without compilation. This generator converts them to standalone HTML files that:

- ✅ Work directly in the browser without build tools
- ✅ Use the same props, data, and methods as the original Vue component
- ✅ Maintain the component's default values
- ✅ Are perfect for previews and demos

## Usage

### Generate HTML files for all Vue components:

```bash
pnpm generate:vue-html
```

### Watch for changes and auto-regenerate:

```bash
pnpm watch:vue-html
```

## How it works

1. **Scans** the `components/` directory for `.vue` files
2. **Extracts** template, script, and styles from each SFC
3. **Converts** the script to browser-compatible format
4. **Generates** an `index.html` file in the same directory
5. **Preserves** all component functionality and defaults

## Generated File Structure

For a component at `components/cards/vue/dropdown-menu/DropdownMenu.vue`, the generator creates:

```
components/cards/vue/dropdown-menu/
├── DropdownMenu.vue     # Source component
└── index.html           # Generated browser-compatible version
```

## Features

- **Automatic component name detection** from file names
- **Template extraction** with proper escaping
- **Script conversion** from SFC to browser format
- **Style preservation** (if present)
- **Default props handling** - uses the same defaults as the Vue component
- **Error handling** with helpful messages
- **Watch mode** for development

## Integration

The preview system automatically detects and uses `index.html` files when available, falling back to a message for SFC files that need compilation.

## Development Workflow

1. Create/edit your Vue SFC component
2. Run `pnpm generate:vue-html` (or use watch mode)
3. The preview will automatically use the generated HTML file
4. Your component uses its own default values - no hardcoding needed!

## Example

**Input** (`DropdownMenu.vue`):

```vue
<template>
  <div class="dropdown">{{ label }}</div>
</template>

<script>
export default {
  props: {
    label: { type: String, default: "Actions" },
  },
}
</script>
```

**Output** (`index.html`):

```html
<!doctype html>
<html>
  <head>
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body>
    <div id="app">
      <dropdown-menu></dropdown-menu>
    </div>
    <script>
      const DropdownMenu = {
        template: `<div class="dropdown">{{ label }}</div>`,
        props: {
          label: { type: String, default: "Actions" },
        },
      }
      createApp({ components: { DropdownMenu } }).mount("#app")
    </script>
  </body>
</html>
```
