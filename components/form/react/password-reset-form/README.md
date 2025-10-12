# Password Reset Form

A secure password reset form component for React applications with real-time password strength feedback and validation.

**Author:** [@Stitipragyanbarik](https://github.com/Stitipragyanbarik)

## Features

- New Password and Confirm Password input fields
- Real-time password strength meter (Weak → Fair → Good → Strong)
- Visual strength indicator with progress bar and criteria checklist
- Show/Hide password toggle icons for better UX
- Validation for password matching and strength requirements
- Responsive design with subtle animations using Tailwind CSS
- Accessible form with proper labels and error messages

## Props

| Prop       | Type     | Default     | Description                                             |
| ---------- | -------- | ----------- | ------------------------------------------------------- |
| `onSubmit` | function | () => {}    | Callback function called when the form is submitted with valid data |
| `className`| string   | ""          | Additional CSS classes for custom styling               |

## Usage

```jsx
import PasswordResetForm from "./PasswordResetForm"

function App() {
  const handleSubmit = (data) => {
    console.log('Password reset data:', data);
    // Handle password reset logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <PasswordResetForm
        onSubmit={handleSubmit}
      />
    </div>
  );
}
```

## Password Strength Rules

The password strength is calculated based on the following criteria:

- **Length**: At least 8 characters
- **Uppercase**: Contains at least one uppercase letter (A-Z)
- **Lowercase**: Contains at least one lowercase letter (a-z)
- **Number**: Contains at least one digit (0-9)
- **Symbol**: Contains at least one special character (!@#$%^&*()_+-=[]{}|;':",./<>?)

### Strength Levels

- **Weak**: 0-1 criteria met
- **Fair**: 2 criteria met
- **Good**: 3 criteria met
- **Strong**: 4-5 criteria met

## Validation

- Password must meet at least 4 strength criteria to be considered valid
- Confirm Password must match New Password exactly
- Real-time validation with error messages
- Form submission is blocked if validation fails

## Dependencies

- React 16.8+ (hooks support)
- Tailwind CSS for styling

## Customization

- Modify colors and styling via Tailwind classes
- Adjust strength criteria by modifying the `validatePasswordStrength` function
- Customize strength levels and colors in `getStrengthColor` function
- Add additional validation rules as needed

## Accessibility

- Semantic HTML with proper form structure
- ARIA labels for password toggle buttons
- Keyboard navigation support
- Screen reader friendly error messages
- Focus states for all interactive elements

## Example Output

The `onSubmit` callback receives an object with:
```javascript
{
  newPassword: "MySecureP@ssw0rd123"
}
