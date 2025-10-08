# Login Form

A modern, responsive login form component for React applications with built-in validation and Google Sign-In integration.

**Author:** [@Stitipragyanbarik](https://github.com/Stitipragyanbarik)

## Features

- Email and password input fields with real-time validation
- Error messages for invalid or empty fields
- Password visibility toggle
- "Forgot Password?" and "Sign Up" links
- Sign in with Google button for OAuth-style login
- Responsive and accessible design
- Smooth hover and focus animations using Tailwind CSS

## Props

| Prop              | Type     | Default     | Description                                             |
| ----------------- | -------- | ----------- | ------------------------------------------------------- |
| `onSubmit`        | function | () => {}    | Callback function called when the form is submitted with valid data |
| `onGoogleSignIn`  | function | () => {}    | Callback function called when Google Sign-In button is clicked |
| `onForgotPassword`| function | () => {}    | Callback function called when Forgot Password link is clicked |
| `onSignUp`        | function | () => {}    | Callback function called when Sign Up link is clicked |
| `className`       | string   | ""          | Additional CSS classes for custom styling               |

## Usage

```jsx
import LoginForm from "./LoginForm"

function App() {
  const handleSubmit = (data) => {
    console.log('Login data:', data);
    // Handle login logic here
  };

  const handleGoogleSignIn = () => {
    console.log('Google Sign-In clicked');
    // Handle Google OAuth here
  };

  const handleForgotPassword = () => {
    console.log('Forgot Password clicked');
    // Navigate to forgot password page
  };

  const handleSignUp = () => {
    console.log('Sign Up clicked');
    // Navigate to sign up page
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <LoginForm
        onSubmit={handleSubmit}
        onGoogleSignIn={handleGoogleSignIn}
        onForgotPassword={handleForgotPassword}
        onSignUp={handleSignUp}
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
- Integrate with authentication libraries (e.g., Firebase, Auth0) in the callback functions
- Customize the Google Sign-In button styling or replace with a custom icon

### Accessibility

- Uses semantic HTML with proper labels and form structure
- Supports keyboard navigation and screen readers
- Focus states for interactive elements
- ARIA attributes for error messages

### Validation Rules

- Email: Must be a valid email format
- Password: Must not be empty
- Real-time validation on input change
- Form submission blocked if validation fails
