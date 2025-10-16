# OTP Authentication Component

A customizable OTP (One-Time Password) input component for React applications, designed to provide secure authentication flows. This component supports features like auto-focus, paste support, and validation feedback, making it ideal for use in login, registration, and two-factor authentication (2FA) systems.

## Features

- **Customizable OTP Length**: Specify the number of OTP digits (default is 6).
- **Auto-focus**: Automatically focuses on the first OTP input field.
- **Paste Support**: Supports pasting the OTP directly into the input fields.
- **Validation Feedback**: Built-in validation for success/error states to guide the user.
- **Mobile-Responsive**: Fully responsive design using Tailwind CSS.
- **Easy to Integrate**: Simple to use and integrate into React applications.

## Props

| Name          | Type     | Description                                                                 |
|---------------|----------|-----------------------------------------------------------------------------|
| `length`      | `number` | Number of OTP digits (default: `6`).                                        |
| `onChange`    | `function`| Callback function for OTP value changes.                                   |
| `disabled`    | `boolean` | Disables OTP input fields (default: `false`).                               |
| `autoFocus`   | `boolean` | Automatically focuses on the first OTP input field (default: `true`).       |
| `onSubmit`    | `function`| Callback function when OTP is successfully submitted.                       |

## Example

```jsx
import React, { useState } from 'react';
import OTPInput from 'otp-authentication';

const OTPForm = () => {
  const [otp, setOtp] = useState('');

  const handleOtpChange = (value) => {
    setOtp(value);
  };

  const handleSubmit = () => {
    // Handle OTP submission (e.g., verify OTP with the backend)
    console.log('Submitted OTP: ', otp);
  };

  return (
    <div className="flex flex-col items-center space-y-4 mt-10">
      <h2 className="text-xl">Please Enter OTP</h2>
      <OTPInput length={6} onChange={handleOtpChange} />
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Submit OTP
      </button>
    </div>
  );
};

export default OTPForm;
```