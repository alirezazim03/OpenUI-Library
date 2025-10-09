# Feedback Form

A modern, responsive feedback form component for React applications with built-in validation and star rating input.

**Author:** [@Stitipragyanbarik](https://github.com/Stitipragyanbarik)

## Features

- Name and email input fields with real-time validation
- Feedback type selection (Bug, Suggestion, General)
- Message textarea for detailed feedback
- Interactive 1-5 star rating with hover effects
- Error messages for invalid or empty fields
- Responsive and accessible design
- Smooth hover and focus animations using Tailwind CSS
- Submit button with hover animation

## Props

| Prop       | Type     | Default  | Description                                             |
| ---------- | -------- | -------- | ------------------------------------------------------- |
| `onSubmit` | function | () => {} | Callback function called when the form is submitted with valid data |
| `className`| string   | ""       | Additional CSS classes for custom styling               |

## Usage

```jsx
import FeedbackForm from "./FeedbackForm"

function App() {
  const handleSubmit = (data) => {
    console.log('Feedback data:', data);
    // Handle feedback submission logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <FeedbackForm
        onSubmit={handleSubmit}
      />
    </div>
  );
}
```

### Dependencies

- React 16.8+ (hooks support)
- Tailwind CSS for styling

### Customization

- Modify colors, borders, and spacing via Tailwind classes
- Add custom validation logic by extending the component
- Customize star rating appearance or add more rating levels
- Integrate with backend APIs in the onSubmit callback
- Adjust form layout or add additional fields as needed

### Accessibility

- Uses semantic HTML with proper labels and form structure
- Supports keyboard navigation and screen readers
- Focus states for interactive elements
- ARIA attributes for error messages
- Star rating buttons have proper focus and hover states

### Validation Rules

- Name: Required field
- Email: Required and must be a valid email format
- Feedback Type: Required selection
- Message: Required field
- Rating: Required (at least 1 star)
- Real-time validation on input change
- Form submission blocked if validation fails
