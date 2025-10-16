import Link from "next/link"
import { ComponentMetadata } from "@/types"
import { useMemo } from "react"

interface SidebarComponentLinksProps {
  components: ComponentMetadata[]
  currentComponent?: string
}

/** Sidebar component for listing and selecting components.
 * To be used within the Sidebar component.
 * @example
 * <SidebarComponentLinks
 *   components={components}
 *   currentComponent={currentComponent}
 * />
 * @param components - List of all components to display.
 * @param currentComponent - Currently selected component name.
 * @returns JSX.Element
 */
export default function SidebarComponentLinks({
  components,
  currentComponent,
}: SidebarComponentLinksProps) {
  // Group components by framework
  const frameworkGroups = useMemo(() => {
    const groups = components.reduce(
      (groups, component) => {
        const framework = component.framework || "Other"
        if (!groups[framework]) {
          groups[framework] = []
        }
        groups[framework].push(component)
        return groups
      },
      {} as Record<string, ComponentMetadata[]>
    )

    //Sort frameworks alphabetically
    const sortedGroups: Record<string, ComponentMetadata[]> = {}
    Object.keys(groups)
      .sort()
      .forEach(framework => {
        sortedGroups[framework] = groups[framework]
      })
    return sortedGroups
  }, [components])

  return (
    <>
      {components.length === 0 && (
        <p className="flex justify-center text-sm text-gray-500 dark:text-gray-400">
          No components found.
        </p>
      )}
      {Object.keys(frameworkGroups).map(framework => (
        <div key={framework} className="mb-6">
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3 dark:text-gray-100">
            {framework} ({frameworkGroups[framework].length})
          </h3>
          {frameworkGroups[framework].map(comp => (
            <div key={comp.name} className="mt-2">
              <Link
                href={`/component/${comp.path}`}
                className={
                  "w-full text-left px-3 py-2 rounded-md text-sm transition-colors " +
                  (comp.name === currentComponent
                    ? "bg-blue-100 text-blue-700 font-medium dark:bg-blue-900 dark:text-blue-300"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700")
                }
              >
                {comp.name}
              </Link>
            </div>
          ))}
        </div>
      ))}
    </>
  )
}
