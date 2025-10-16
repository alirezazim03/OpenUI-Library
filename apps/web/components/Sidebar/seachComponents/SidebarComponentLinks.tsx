import Link from "next/link"
import { ComponentMetadata } from "@/types"

interface SidebarComponentLinksProps {
  components: ComponentMetadata[]
  currentComponent?: string
  componentFilter?: string
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
  return (
    <>
      {components.map(comp => (
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
    </>
  )
}
