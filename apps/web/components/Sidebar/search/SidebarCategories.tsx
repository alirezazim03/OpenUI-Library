import { ComponentMetadata } from "@/types"

interface SidebarCategoriesProps {
  categories: string[]
  groupedComponents: Record<string, ComponentMetadata[]>
  components: ComponentMetadata[]
  selectedCategory: string | null
  setSelectedCategory: (category: string | null) => void
}

/** Sidebar component for filtering by categories.
 * To be used within the Sidebar component.
 * @example
 * <SidebarCategories
 *   categories={['Buttons', 'Forms', 'Modals']}
 *   components={[]}
 *   selectedCategory={null}
 *   setSelectedCategory={() => {}}
 * />
 *
 * @param categories - List of available categories.
 * @param groupedComponents - Map of category names to their components.
 * @param components - List of all components (used to count total components).
 * @param selectedCategory - Currently selected category.
 * @param setSelectedCategory - Function to update the selected category.
 * @returns JSX.Element
 */
export default function SidebarCategories({
  categories,
  groupedComponents,
  components,
  selectedCategory,
  setSelectedCategory,
}: SidebarCategoriesProps) {
  const clearCategories = () => {
    setSelectedCategory(null)
  }

  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3 dark:text-gray-100">
        Categories
      </h3>
      <div className="space-y-1">
        <button
          onClick={clearCategories}
          className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
            selectedCategory === null
              ? "bg-blue-100 text-blue-700 font-medium dark:bg-blue-900 dark:text-blue-300"
              : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
          }`}
        >
          All Components ({components?.length})
        </button>
        {categories?.map(category => {
          const count = groupedComponents[category]?.length || 0
          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                selectedCategory === category
                  ? "bg-blue-100 text-blue-700 font-medium dark:bg-blue-900 dark:text-blue-300"
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              <span className="capitalize">{category}</span>
              <span className="text-gray-500 ml-2 dark:text-gray-400">
                ({count})
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
