# Login Card

A clean social login section for React with provider buttons (Google, GitHub, Facebook, Email) and built-in loading feedback. Designed with Tailwind CSS utility classes for easy theming.

## Features
- **Multiple Providers:** Google, GitHub, Facebook, and Email/Password options.
- **Loading State:** Shows a spinner while an auth request is in progress.
- **Accessible Buttons:** Semantic buttons with disabled and focus styles.
- **Tailwind Ready:** Uses Tailwind CSS classes for styling and customization.

## Usage

1. Place `LoginCard.jsx` in your project.
2. Import and render the default export in your page/component.

```jsx
import App from './LoginCard'; // default export renders the LoginCard inside a centered container

export default function Page() {
  return <App />;
}
```

If you want to embed only the card (without the outer demo container), export `LoginCard` from the file or copy the `LoginCard` component into your codebase.

### Auth integration
Replace the placeholder inside `handleSocialSignUp()` with your auth logic (Firebase, NextAuth, Supabase, OAuth SDK, etc.). The function currently simulates a delay and sets loading state.

## Props

This component does not expose external props in this version. If you need variations (e.g., different providers, labels, or callbacks), you can:
- Fork and add props for providers, labels, and callbacks.
- Replace the `providers` array in `LoginCard.jsx` with your desired set.

## Customization

- **Styling:** Update Tailwind classes in `LoginCard.jsx` to change colors, spacing, and typography.
- **Icons:** Uses `react-icons` (`FaGoogle`, `FaGithub`, `FaFacebook`, `MdEmail`, `FaSpinner`). You can swap icons as needed.
- **Dependencies:** Ensure `react-icons` is installed in your project:

```bash
npm install react-icons
# or
yarn add react-icons
```

- **Legal text:** Update the Terms/Privacy links and copy in the bottom text as required.