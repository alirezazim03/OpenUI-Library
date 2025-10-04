# SaaS Navbar

A modern, responsive navigation bar built with Tailwind CSS, perfect for SaaS websites. Includes logo, feature links, call-to-action buttons, and a mobile-friendly collapsible menu.

**Author:** [@abhijeet-singhh](https://github.com/abhijeet-singhh)

---

## ✨ Features

- Logo with brand name
- Product navigation links: Features, Pricing, About, Contact
- "Login" link and "Get Started" button for user actions
- Fully responsive layout with mobile menu toggle
- Clean UI using Tailwind CSS utility classes
- Collapsible menu on smaller screens

---

## 🧾 Props

| Prop           | Type     | Default    | Description                                                   |
| -------------- | -------- | ---------- | ------------------------------------------------------------- |
| `onGetStarted` | function | `() => {}` | Callback triggered when the **Get Started** button is clicked |
| `onLogin`      | function | `() => {}` | Callback triggered when the **Login** link is clicked         |

---

## 🚀 Usage

```jsx
import Navbar from "./Navbar"

function App() {
  const handleGetStarted = () => {
    console.log("Get Started clicked")
  }

  const handleLogin = () => {
    console.log("Login clicked")
  }

  return (
    <div>
      <Navbar onGetStarted={handleGetStarted} onLogin={handleLogin} />
      {/* Rest of your app */}
    </div>
  )
}
```

---

## 🧩 Tailwind CSS

This component uses **Tailwind CSS** for styling. Make sure your project is set up with Tailwind.
If not, follow the [Tailwind CSS installation guide](https://tailwindcss.com/docs/installation).

---

## 📄 License

MIT © [@abhijeet-singhh](https://github.com/abhijeet-singhh)
