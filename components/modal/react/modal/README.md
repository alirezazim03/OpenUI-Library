# Accessible Modal Component

A reusable modal component for displaying forms, confirmation boxes, and alerts. Should include accessibility features, animations, and flexible content placement.

## Features

- **Full Accessibility (WCAG Compliant)**
  - Focus trap with keyboard navigation
  - Automatic focus management
  - ESC key to close
  - Proper ARIA attributes
  - Screen reader support

- **Smooth Animations**
  - Fade-in overlay
  - Scale-in modal entrance
  - CSS-based for optimal performance

- **Flexible**
  - Compound component pattern (Header, Body, Footer)
  - Multiple size variants
  - Customizable behaviors

- **Responsive Design**
  - Mobile-friendly
  - Prevents body scroll when open
  - Adaptive sizing

- **Use Cases**
  - Confirmation modals
  - Form popups (login, create, edit)
  - Alert notifications
  - Content/image previews

## Installation

No external dependencies required beyond React and Tailwind CSS.

1. Copy the component files to your project
2. Ensure Tailwind CSS is configured in your project
3. Import and use the component

## Usage

### Basic Example

```jsx
import { useState } from "react"
import Modal from "./components/Modal"

function App() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button onClick={() => setOpen(true)}>Open Modal</button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Modal.Header>Modal Title</Modal.Header>
        <Modal.Body>
          <p>This is the modal content.</p>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={() => setOpen(false)}>Close</button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
```

### Confirmation Modal

```jsx
<Modal open={confirmOpen} onClose={() => setConfirmOpen(false)} size="sm">
  <Modal.Header>Delete Item?</Modal.Header>
  <Modal.Body>
    <p>
      Are you sure you want to delete this item? This action cannot be undone.
    </p>
  </Modal.Body>
  <Modal.Footer>
    <button onClick={() => setConfirmOpen(false)}>Cancel</button>
    <button onClick={handleDelete}>Delete</button>
  </Modal.Footer>
</Modal>
```

### Form Modal

```jsx
<Modal open={formOpen} onClose={() => setFormOpen(false)} size="md">
  <Modal.Header>Create Account</Modal.Header>
  <Modal.Body>
    <div className="space-y-4">
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={e => setFormData({ ...formData, name: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={e => setFormData({ ...formData, email: e.target.value })}
        />
      </div>
    </div>
  </Modal.Body>
  <Modal.Footer>
    <button onClick={() => setFormOpen(false)}>Cancel</button>
    <button onClick={handleSubmit}>Create Account</button>
  </Modal.Footer>
</Modal>
```

### Alert Modal

```jsx
<Modal open={alertOpen} onClose={() => setAlertOpen(false)} size="sm">
  <Modal.Header>Success!</Modal.Header>
  <Modal.Body>
    <p>Your changes have been saved successfully.</p>
  </Modal.Body>
  <Modal.Footer>
    <button onClick={() => setAlertOpen(false)}>OK</button>
  </Modal.Footer>
</Modal>
```

### Without Close Button

```jsx
<Modal
  open={open}
  onClose={() => setOpen(false)}
  showCloseButton={false}
  closeOnOverlay={false}
  closeOnEsc={false}
>
  <Modal.Header>Important Message</Modal.Header>
  <Modal.Body>
    <p>This modal requires explicit action.</p>
  </Modal.Body>
  <Modal.Footer>
    <button onClick={handleAction}>Take Action</button>
  </Modal.Footer>
</Modal>
```

## Props Documentation

### Modal Props

| Prop              | Type                                     | Required | Default | Description                                                      |
| ----------------- | ---------------------------------------- | -------- | ------- | ---------------------------------------------------------------- |
| `open`            | `boolean`                                | ✅       | -       | Controls the visibility of the modal                             |
| `onClose`         | `() => void`                             | ✅       | -       | Callback function triggered when the modal should close          |
| `children`        | `React.ReactNode`                        | ✅       | -       | Modal content (typically Modal.Header, Modal.Body, Modal.Footer) |
| `size`            | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | ❌       | `'md'`  | Sets the maximum width of the modal                              |
| `closeOnOverlay`  | `boolean`                                | ❌       | `true`  | Whether clicking the overlay/backdrop closes the modal           |
| `closeOnEsc`      | `boolean`                                | ❌       | `true`  | Whether pressing the ESC key closes the modal                    |
| `showCloseButton` | `boolean`                                | ❌       | `true`  | Whether to display the X close button in the top-right corner    |

### Size Options

- `sm` - max-width: 24rem (384px)
- `md` - max-width: 28rem (448px)
- `lg` - max-width: 32rem (512px)
- `xl` - max-width: 36rem (576px)
- `full` - Full width with margin

### Modal.Header Props

| Prop        | Type              | Required | Default | Description                                |
| ----------- | ----------------- | -------- | ------- | ------------------------------------------ |
| `children`  | `React.ReactNode` | ✅       | -       | Header content (typically the modal title) |
| `className` | `string`          | ❌       | `''`    | Additional CSS classes to apply            |

### Modal.Body Props

| Prop        | Type              | Required | Default | Description                     |
| ----------- | ----------------- | -------- | ------- | ------------------------------- |
| `children`  | `React.ReactNode` | ✅       | -       | Main modal content              |
| `className` | `string`          | ❌       | `''`    | Additional CSS classes to apply |

### Modal.Footer Props

| Prop        | Type              | Required | Default | Description                               |
| ----------- | ----------------- | -------- | ------- | ----------------------------------------- |
| `children`  | `React.ReactNode` | ✅       | -       | Footer content (typically action buttons) |
| `className` | `string`          | ❌       | `''`    | Additional CSS classes to apply           |

## Customization Guide

### Styling

The component uses Tailwind CSS classes. You can customize the appearance by:

1. **Modifying default classes** in the component file
2. **Passing custom classes** via the `className` prop on sub-components
3. **Overriding Tailwind theme** in your `tailwind.config.js`

### Custom Overlay Color

```jsx
// Edit the overlay div in the Modal component
<div
  className="fixed inset-0 bg-blue-900/50 animate-fadeIn" // Change from bg-black/50
  onClick={closeOnOverlay ? onClose : undefined}
  aria-hidden="true"
/>
```

### Custom Animation Duration

```jsx
// Edit the style tag in the Modal component
<style>{`
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out; /* Change from 0.2s */
  }
  .animate-scaleIn {
    animation: scaleIn 0.3s ease-out; /* Change from 0.2s */
  }
`}</style>
```

### Custom Header Styling

```jsx
<Modal.Header className="bg-blue-600 text-white">
  Custom Styled Header
</Modal.Header>
```

### Custom Footer Layout

```jsx
<Modal.Footer className="justify-between">
  {" "}
  {/* Instead of justify-end */}
  <button>Secondary Action</button>
  <div className="flex gap-2">
    <button>Cancel</button>
    <button>Confirm</button>
  </div>
</Modal.Footer>
```

### Adding New Size Options

Edit the `sizeClasses` object in the Modal component:

```jsx
const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl", // Add new size
  full: "max-w-full mx-4",
}
```

## Dependencies

- **React** (v16.8+) - For hooks support
- **Tailwind CSS** (v3.0+) - For styling
- **react-icons** - For the close icon (X)
