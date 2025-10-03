# Form Section

A reusable and accessible form section component for React applications. It helps group related fields with a clear title and description, improving form organization and readability.

**Author:** [@komalsathvik](https://github.com/komalsathvik)

## Features

- Semantic and accessible structure using `<fieldset>` and `<legend>`
- Optional section description for better context
- Groups related form fields consistently
- Responsive and modern design with Tailwind CSS
- Customizable via `className` for easy theming
- Supports nesting any form inputs or components

## Props

| Prop          | Type      | Default         | Description                                             |
| ------------- | --------- | --------------- | ------------------------------------------------------- |
| `title`       | string    | "Section Title" | The title of the form section                           |
| `description` | string    | ""              | Optional description text displayed under the title     |
| `children`    | ReactNode | null            | Form fields or custom components to render in the group |
| `className`   | string    | ""              | Additional CSS classes for custom styling               |

## Usage

```jsx
import FormSection from "./FormSection"

function App() {
  return (
    <div className="max-w-md mx-auto">
      <FormSection
        title="Personal Information"
        description="Enter your personal details below"
      >
        <input
          type="text"
          placeholder="Full Name"
          className="w-full border rounded-lg px-3 py-2"
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full border rounded-lg px-3 py-2"
        />
      </FormSection>
    </div>
  )
}
```

### Dependencies

React 16.8+ (hooks support)

Tailwind CSS for styling

### Customization

Modify section borders, padding, and typography via Tailwind classes

Add animations (e.g., expand/collapse) for interactive sections

Override or extend styles using the className prop

Integrate with custom input components for consistent design

Adjust spacing between fields by modifying the space-y-4 utility class

### Accessibility

Uses <fieldset> and <legend> for semantic grouping

Supports screen readers for clear form structure

Compatible with keyboard navigation and focus states
