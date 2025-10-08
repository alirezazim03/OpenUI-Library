# Action Button
A dynamic React button component with loading and redirect states.

**Author:** @harshitrwt

## Features

- Interactive Feedback System :Allows users to submit quick feedback using “Success” or “Failure” buttons, ideal for testing or demo previews.
- Real-time Preview Actions – Instantly triggers success/failure responses within a preview area, making it useful for validating UI states or API outcomes.
- Customizable Integration – Can be easily embedded in dashboards, extensions, or testing tools to simulate user actions or display component behavior dynamically.

## Preview
Click the button to see loading animation and then an automatic redirect.

## Usage

```jsx
import ActionButton from "./action_button"

export default function Example() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <ActionButton/>
    </div>
  )
}
