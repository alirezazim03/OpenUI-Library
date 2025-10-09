# Simple Registration Form

A simple and accessible registration form component for React applications.

**Author:** [@chatfly](https://github.com/chatfly)

## Features

- Clean and minimalist design
- Includes fields for email, username, and password
- Responsive layout using Tailwind CSS

## Props

| Prop        | Type    | Default     | Description                                        |
| ----------- | ------- | ----------- | -------------------------------------------------- |
| `title`     | string  | "Register"  | The title of the registration form                 |
| `className` | string  | ""          | Additional CSS classes for styling the form container |

## Usage

```jsx
import AnimatedRegisterForm from './AnimatedRegisterForm';

function App() {
  return (
    <div className="max-w-md mx-auto p-6 bg-gray-100">
      <AnimatedRegisterForm
        title="Create a New Account"
        className="bg-gray-50 shadow-lg"
      />
    </div>
  );
}
