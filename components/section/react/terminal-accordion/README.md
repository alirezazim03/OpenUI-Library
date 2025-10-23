# TerminalAccordion (React)

A cyberpunk-inspired, terminal-themed accordion component built with React. Features command-line aesthetics, smooth animations, and a retro hacker vibe perfect for displaying expandable content with style.

---

## Features

- **Terminal Aesthetics** - Command-line inspired design with monospace fonts and neon accents
- **Cyberpunk Theme** - Dark background with neon green (#00FF41) and cyan (#00D9FF) colors
- **Smooth Animations** - Fluid expand/collapse transitions with rotating chevron indicators
- **Fully Responsive** - Works seamlessly across desktop, tablet, and mobile devices
- **Accessible** - Built with ARIA attributes and keyboard navigation support
- **Lightweight** - Minimal dependencies, optimized performance
- **Single Expansion** - Only one item can be expanded at a time for focused viewing
- **Hover Effects** - Interactive glowing borders and background highlights  

---

## 📦 Usage

This component is used for accordion.

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
