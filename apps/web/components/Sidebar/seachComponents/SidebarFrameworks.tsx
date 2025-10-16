import { ComponentMetadata } from "@/types"
import { useMemo } from "react"

interface SidebarFrameworksProps {
  frameworks: string[]
  components: ComponentMetadata[]
  selectedFramework: string | null
  setSelectedFramework: (framework: string | null) => void
}

/** Sidebar component for filtering by front-end frameworks.
 * To be used within the Sidebar component.
 *
 * @example
 * <SidebarFrameworks
 *   frameworks={['React', 'Vue', 'Angular']}
 *   components={[]}
 *   selectedFramework={null}
 *   setSelectedFramework={() => {}}
 * />
 *
 * @param frameworks - List of available frameworks.
 * @param components - List of all components (used to count components per framework).
 * @param selectedFramework - Currently selected framework.
 * @param setSelectedFramework - Function to update the selected framework.
 * @returns JSX.Element
 */
export default function SidebarFrameworks({
  frameworks,
  components,
  selectedFramework,
  setSelectedFramework,
}: SidebarFrameworksProps) {
  const clearFrameworks = () => {
    setSelectedFramework(null)
  }

  const onFrameworkSelect = (framework: string) => {
    setSelectedFramework(framework)
  }

  const lowerSelectedFramework = selectedFramework?.toLowerCase() || null

  const frameworkCount = useMemo(() => {
    return frameworks.reduce(
      (acc, framework) => {
        acc[framework] = components.filter(
          component =>
            (component.framework || "").trim().toLowerCase() ===
            framework.trim().toLowerCase()
        ).length
        return acc
      },
      {} as Record<string, number>
    )
  }, [components, frameworks])

  return (
    <div className="mt-8">
      <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3 dark:text-gray-100">
        Frameworks
      </h3>
      <div className="space-y-1">
        <button
          onClick={clearFrameworks}
          className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
            selectedFramework === null
              ? "bg-blue-100 text-blue-700 font-medium dark:bg-blue-900 dark:text-blue-300"
              : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
          }`}
        >
          All Frameworks ({components?.length})
        </button>

        {frameworks?.map(framework => {
          return (
            <button
              key={framework}
              onClick={() => onFrameworkSelect(framework.toLocaleLowerCase())}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                lowerSelectedFramework === framework.toLowerCase()
                  ? "bg-blue-100 text-blue-700 font-medium dark:bg-blue-900 dark:text-blue-300"
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              <span className="capitalize">{framework}</span>
              <span className="text-gray-500 ml-2 dark:text-gray-400">
                ({frameworkCount[framework] || 0})
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
