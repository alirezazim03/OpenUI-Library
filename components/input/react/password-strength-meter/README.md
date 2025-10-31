# PasswordStrengthMeter

Modern and responsive password strength meter built with React, Tailwind CSS. It evaluates password strength based on length, numbers, symbols, and uppercase characters.

## Features

* Real-time password strength detection
* Strength indicator (Weak, Moderate, Strong, Very Strong)
* Fully responsive and reusable component


## Usage

```jsx
import PasswordStrengthMeter from "./PasswordStrengthMeter";

export default function App() {
  return (
    <div className="p-6">
      <PasswordStrengthMeter onChange={(value, strength) => console.log(value, strength)} />
    </div>
  );
}
```

## Props

| Prop Name   | Type     | Default      | Description                                    |
| ----------- | -------- | ------------ | ---------------------------------------------- |
| `onChange`  | `func`   | `() => {}`   | Callback triggered whenever password changes.  |
