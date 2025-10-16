import TagChip from "@/components/TagChip"
import { Dispatch, SetStateAction } from "react"

interface SidebarTagsProps {
  tags: string[]
  selectedTags: string[]
  setSelectedTags: Dispatch<SetStateAction<string[]>>
}

/** Sidebar component for filtering by tags.
 * To be used within the Sidebar component.
 * @example
 * <SidebarTags
 *   tags={['accessible', 'responsive', 'dark-mode']}
 *   components={components}
 *   selectedTags={selectedTags}
 *   setSelectedTags={setSelectedTags}
 * />
 * @param tags - List of available tags.
 * @param selectedTags - Currently selected tags.
 * @param setSelectedTags - Function to update the selected tags.
 * @returns JSX.Element
 */
export default function SidebarTags({
  tags,
  selectedTags,
  setSelectedTags,
}: SidebarTagsProps) {
  const clearTags = () => {
    setSelectedTags([])
  }

  const onTagToggle = (tag: string) => {
    setSelectedTags((prev: string[]) =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    )
  }

  return (
    <div className="mt-8">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide mb-3">
        Tags
      </h3>
      <div className="flex flex-wrap gap-2">
        {tags?.map(tag => (
          <TagChip
            key={tag}
            tag={tag}
            active={selectedTags.includes(tag)}
            onToggle={onTagToggle}
          />
        ))}
      </div>
      {selectedTags.length > 0 && (
        <div className="mt-3">
          <button
            type="button"
            onClick={clearTags}
            className="text-xs text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
          >
            Clear tags
          </button>
        </div>
      )}
    </div>
  )
}
