import { useEffect, useState } from "react"

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const threshold = 270
      setIsVisible(window.scrollY > threshold)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    try {
      window.scrollTo({ top: 0, behavior: "smooth" })
    } catch (_err) {
      
      window.scrollTo(0, 0)
    }
  }

  return (
    <button
      aria-label="Back to top"
      onClick={scrollToTop}
      className={[
        "fixed z-40 bottom-20 right-6", 
        "rounded-full shadow-lg",
        "bg-white/90 text-gray-900 border border-gray-200",
        "dark:bg-gray-900/90 dark:text-gray-100 dark:border-gray-700",
        "backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-gray-900/70",
        "p-2 md:p-2.5",
        "transition-all duration-300",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none",
        "hover:shadow-xl hover:-translate-y-0.5",
        "focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900",
      ].join(" ")}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-4 w-4 md:h-5 md:w-5" 
        aria-hidden="true"
      >
        {/* Up arrow chevron */}
        <path d="M12 8.293l5.293 5.293a1 1 0 01-1.414 1.414L12 11.414l-3.879 3.586a1 1 0 01-1.414-1.414L12 8.293z" />
      </svg>
    </button>
  )
}