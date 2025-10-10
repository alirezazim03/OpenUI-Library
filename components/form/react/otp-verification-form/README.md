# OTP Verification Form

An animated OTP verification form component for React applications with auto-focus switching, countdown timer, and success animations.

**Author:** [@Stitipragyanbarik](https://github.com/Stitipragyanbarik)

## Features

- 4 or 6 OTP input boxes with auto-switch focus
- Countdown timer for "Resend OTP" button
- Smooth entry animation and success effect
- Responsive design suitable for mobile and desktop
- Clean and minimal layout
- Paste support for OTP codes

## Props

| Prop              | Type     | Default     | Description                                             |
| ----------------- | -------- | ----------- | ------------------------------------------------------- |
| `length`          | number   | 6           | Number of OTP digits (4 or 6)                           |
| `onSubmit`        | function | () => {}    | Callback function called when OTP is fully entered     |
| `onResend`        | function | () => {}    | Callback function called when Resend OTP is clicked    |
| `timerDuration`   | number   | 60          | Duration of the resend timer in seconds                |
| `className`       | string   | ""          | Additional CSS classes for custom styling               |

## Usage

```jsx
import OTPVerificationForm from "./OTPVerificationForm"

function App() {
  const handleSubmit = (otp) => {
    console.log('OTP submitted:', otp);
    // Handle verification logic here
  };

  const handleResend = () => {
    console.log('Resend OTP clicked');
    // Handle resend logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <OTPVerificationForm
        length={6}
        onSubmit={handleSubmit}
        onResend={handleResend}
        timerDuration={60}
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
- Adjust timer duration or OTP length via props
- Customize animations by overriding Tailwind classes

### Accessibility

- Uses semantic HTML with proper labels
- Supports keyboard navigation
- Focus states for inputs
- Screen reader friendly

### Validation Rules

- Only numeric digits allowed
- Auto-advances to next input on digit entry
- Backspace moves to previous input if current is empty
- Paste support for full OTP code
