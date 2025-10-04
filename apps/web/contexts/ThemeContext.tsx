import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react"

type Theme = "light" | "dark"

interface ThemeContextType {
  theme: Theme
  setTheme: (_theme: Theme) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>("light")
  const [mounted, setMounted] = useState(false)

  // Set mounted to true after hydration to prevent SSR mismatch
  useEffect(() => {
    setMounted(true)

    // Get the theme that was already applied by the script in _document.tsx
    const htmlElement = document.documentElement
    const isDark = htmlElement.classList.contains("dark")
    setTheme(isDark ? "dark" : "light")
  }, [])

  // Apply theme to document and save to localStorage
  useEffect(() => {
    if (mounted) {
      const root = document.documentElement

      if (theme === "dark") {
        root.classList.add("dark")
      } else {
        root.classList.remove("dark")
      }

      localStorage.setItem("theme", theme)
    }
  }, [theme, mounted])

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"))
  }

  const value = {
    theme,
    setTheme,
    toggleTheme,
  }

  // Prevent hydration mismatch by not rendering theme-dependent content until mounted
  if (!mounted) {
    return <div style={{ visibility: "hidden" }}>{children}</div>
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
