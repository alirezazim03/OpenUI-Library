# Toast Notification Component

A comprehensive, accessible toast notification system built with Tailwind CSS. Features multiple variants, smooth animations, auto-dismiss functionality, and responsive design.

## ✨ Features

- **Multiple Variants**: Success ✅, Error ❌, Info ℹ️, Warning ⚠️
- **Smooth Animations**: Slide-in/slide-out effects with progress indicators
- **Auto-dismiss**: Configurable auto-dismiss with hover pause/resume
- **Manual Control**: Close button on each toast
- **Responsive Design**: Mobile-friendly and adaptive
- **Accessible**: Keyboard shortcuts and proper ARIA handling
- **Customizable Positioning**: Easy to reposition (default: top-right)
- **Progress Indicator**: Visual progress bar showing remaining time
- **Hover Interactions**: Pause auto-dismiss on hover

## 🚀 Quick Start

### 1. Include Dependencies

Add Tailwind CSS to your project:

```html
<script src="https://cdn.tailwindcss.com"></script>
```

### 2. Add the HTML Structure

Copy the toast container and templates from `index.html`:

```html
<!-- Toast Container -->
<div id="toast-container" class="toast-container fixed top-4 right-4 z-50 space-y-3 max-w-sm w-full pointer-events-none">
  <!-- Toasts will be dynamically inserted here -->
</div>

<!-- Toast Templates (Hidden) -->
<div id="toast-templates" class="hidden">
  <!-- Copy all template divs from the main file -->
</div>
```

### 3. Include the JavaScript

Copy the `ToastManager` class and initialization code from the script section.

### 4. Show Toasts

```javascript
// Initialize the toast manager
const toastManager = new ToastManager();

// Show different types of toasts
toastManager.show('success', 'Operation completed successfully!');
toastManager.show('error', 'Something went wrong!');
toastManager.show('info', 'Here\'s some useful information.');
toastManager.show('warning', 'Please review before proceeding.');

// Show a toast without auto-dismiss
toastManager.show('info', 'This toast stays until manually closed.', false);

// Show a toast with custom duration (default: 5000ms)
toastManager.show('success', 'Quick message!', true, 2000);
```

## 📋 API Reference

### ToastManager Methods

#### `show(type, message, autoDismiss, duration)`

Shows a new toast notification.

**Parameters:**
- `type` (string): Toast variant - 'success', 'error', 'info', or 'warning'
- `message` (string): The message to display
- `autoDismiss` (boolean, optional): Whether to auto-dismiss (default: true)
- `duration` (number, optional): Auto-dismiss duration in milliseconds (default: 5000)

**Returns:** Toast ID (string)

#### `dismiss(toastId)`

Manually dismisses a specific toast.

**Parameters:**
- `toastId` (string): The ID of the toast to dismiss

#### `dismissAll()`

Dismisses all currently visible toasts.

### Global Helper Functions

```javascript
// Convenience functions (included in the demo)
showToast(type, message, autoDismiss);
clearAllToasts();
```

## 🎨 Customization

### Positioning

Change the toast container position by modifying the CSS classes:

```html
<!-- Top-left -->
<div class="fixed top-4 left-4 z-50">

<!-- Bottom-right -->
<div class="fixed bottom-4 right-4 z-50">

<!-- Center top -->
<div class="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
```

### Styling

Customize colors and appearance by modifying the template classes:

```html
<!-- Custom success toast with different colors -->
<div class="bg-emerald-50 border-l-4 border-emerald-400 text-emerald-700">
  <!-- Toast content -->
</div>
```

### Animation Duration

Modify the Tailwind config to change animation timing:

```javascript
tailwind.config = {
  theme: {
    extend: {
      animation: {
        'slide-in-right': 'slideInRight 0.5s ease-out', // Slower entrance
        'progress': 'progress 3s linear', // Shorter progress bar
      }
    }
  }
}
```

### Auto-dismiss Duration

Change the default duration:

```javascript
// In your ToastManager initialization
const DEFAULT_DURATION = 3000; // 3 seconds

// Or when showing individual toasts
toastManager.show('success', 'Quick message!', true, 2000);
```

## 🔧 Integration Examples

### React Integration

```jsx
import { useEffect } from 'react';

function useToast() {
  useEffect(() => {
    // Initialize ToastManager when component mounts
    window.toastManager = new ToastManager();
  }, []);

  return {
    showSuccess: (message) => window.toastManager.show('success', message),
    showError: (message) => window.toastManager.show('error', message),
    showInfo: (message) => window.toastManager.show('info', message),
    showWarning: (message) => window.toastManager.show('warning', message),
  };
}

// Usage in component
function MyComponent() {
  const toast = useToast();
  
  const handleSubmit = async () => {
    try {
      await api.submit();
      toast.showSuccess('Form submitted successfully!');
    } catch (error) {
      toast.showError('Failed to submit form.');
    }
  };
}
```

### Form Validation

```javascript
// Example: Form submission with toast feedback
document.getElementById('myForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  try {
    const response = await fetch('/api/submit', {
      method: 'POST',
      body: new FormData(e.target)
    });
    
    if (response.ok) {
      toastManager.show('success', 'Form submitted successfully!');
      e.target.reset();
    } else {
      toastManager.show('error', 'Failed to submit form. Please try again.');
    }
  } catch (error) {
    toastManager.show('error', 'Network error. Please check your connection.');
  }
});
```

### E-commerce Actions

```javascript
// Add to cart functionality
function addToCart(productName) {
  // Add product logic here...
  
  toastManager.show('success', `${productName} added to cart!`);
}

// Checkout process
function processCheckout() {
  toastManager.show('info', 'Processing your order...');
  
  // Simulate API call
  setTimeout(() => {
    toastManager.show('success', 'Order placed successfully! 🎉');
  }, 2000);
}
```

## ♿ Accessibility Features

- **Keyboard Support**: Press `Escape` to dismiss all toasts
- **Screen Reader Friendly**: Proper semantic structure
- **Focus Management**: Non-intrusive, doesn't steal focus
- **High Contrast**: Clear visual indicators for all variants
- **Motion Respect**: Animations can be disabled via CSS `prefers-reduced-motion`

## 🎯 Use Cases

### Form Submissions
- ✅ Success confirmations
- ❌ Validation errors
- ℹ️ Processing status
- ⚠️ Required field warnings

### Authentication
- ✅ Login success
- ❌ Invalid credentials
- ℹ️ Password reset sent
- ⚠️ Session expiring

### Dashboard Updates
- ✅ Data refreshed
- ❌ API errors
- ℹ️ New notifications
- ⚠️ System maintenance

### E-commerce
- ✅ Added to cart
- ❌ Out of stock
- ℹ️ Price changes
- ⚠️ Limited quantity

### File Operations
- ✅ Upload complete
- ❌ Upload failed
- ℹ️ Processing file
- ⚠️ Large file size

## 🛠️ Browser Support

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 License

MIT License - feel free to use in personal and commercial projects.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and enhancement requests.

---

**Pro Tip**: For production use, consider implementing a toast queue system to limit the number of simultaneous toasts and prevent screen clutter.