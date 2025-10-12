# SplitLoginCard (React)

A modern, responsive, split-screen authentication component designed for a polished user onboarding experience. It combines branding visuals with flexible sign-in options in a single card layout.

---

## 🚀 Features

- **Two-Column Layout:** Separates visual branding from authentication forms (desktop view).  
- **Full Responsiveness:** Automatically stacks the layout vertically on mobile devices.  
- **Dual Mode Toggle:** Seamlessly switches between **Sign In** and **Sign Up** modes.  
- **Social Authentication:** Includes buttons for popular providers (Google, GitHub).  
- **Form Input:** Traditional Email/Password input with built-in password visibility toggle.  
- **Loading States:** Visual feedback using spinners for both form submission and social login attempts.  

---

## 📦 Usage

This component is typically used to replace an application's entire login/signup page.

---


This component relies on the following:

- **React**
- **Tailwind CSS** (for styling)
- **react-icons/fa** (for icons)

---

## ⚙️ Installation

Install the required icons package:

```bash
npm install react-icons
# or
pnpm add react-icons
# or
yarn add react-icons
```

---

## Usage

This file exports a preview wrapper `App` that renders the card for the docs site. To use the component in your app, import or copy the `SplitLoginCard` function and render it inside a page/container:

```jsx
import React from 'react';
import SplitLoginCard from './SplitLoginCard'; // if you export SplitLoginCard from the file

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <SplitLoginCard />
    </div>
  );
}
```

---

## ⚙️ Customization

- **Social providers:** Edit the internal `socialProviders` array in `SplitLoginCard.jsx`.

  ```jsx
  const socialProviders = [
    { name: 'Google', icon: FaGoogle, handler: () => handleSocialAuth('Google') },
    { name: 'GitHub', icon: FaGithub, handler: () => handleSocialAuth('GitHub') },
    // add more providers if needed
  ];
  ```

- **Branding:** Update the image `src`, left title, and subtitle in the left pane.
- **Theming:** Adjust Tailwind classes to match your design system.
- **Auth logic:** Replace placeholder `setTimeout` calls in `handleAuthSubmit` and `handleSocialAuth` with real API calls.

---

## 🔍 Behavior overview

- Shows 2 social provider buttons by default (`slice(0, 2)`).
- Toggles between Login and Sign Up modes with dedicated UI text.
- Shows “I accept Terms” checkbox on Sign Up only.
- Shows “Forgot your password?” link on Login only.
- Password field supports visibility toggle using `FiEye`/`FiEyeOff`.
- Loading states use `FaSpinner` (social and submit buttons).

---

## ♿ Accessibility

- Inputs use proper `autoComplete` attributes and hidden labels.
- Interactive controls are buttons with focus styles and disabled states.
- Icons are decorative; labels provide context where needed.

---

## 📄 License

MIT
