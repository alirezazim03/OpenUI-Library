import React, { useState } from "react"

const ThemeToggle = () => {
    const [dark, setDark] = useState(false)

    const handleToggle = () =>
        setDark((prev) => !prev)

    return (
        <div
            className={`w-70 h-60 flex items-center justify-center rounded-md shadow mx-auto my-6 transition-colors duration-300 ${
                dark ? "bg-black text-white" : "bg-white text-black"
            }`}>
            <button
                onClick={handleToggle}
                className={`px-3 py-2 rounded border font-medium transition-colors duration-200 focus:outline-none ${
                    dark
                        ? "bg-gray-900 text-white border-gray-700 hover:bg-gray-800"
                        : "bg-gray-100 text-black border-gray-300 hover:bg-gray-200"
                }`}
                aria-label="Toggle Dark Mode">
                {dark ? "🌙" : "☀️"}
            </button>
        </div>
    )
}

export default ThemeToggle

// To enable site-wide dark mode with this component:

// 1. **Configure Tailwind** - Add to your `tailwind.config.js`:
// ```js
// module.exports = {
//   darkMode: "class",
//   // ... rest of config
// }
// ```

// 2. **Add Global Styles** - In your CSS file:
// ```css
// .dark body {
//   @apply bg-black text-white;
// }
// ```
