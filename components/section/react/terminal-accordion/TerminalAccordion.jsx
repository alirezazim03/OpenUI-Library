
import { BiChevronRight } from 'react-icons/bi'

const items = [
    {
    id: "item-1",
    title: "System Information",
    command: "system --info",
    content:
      "Terminal-inspired accordion built with React. Features smooth animations, command-line aesthetics, and a retro hacker vibe. Perfect for displaying hierarchical information in a unique way.",
  },
  {
    id: "item-2",
    title: "Configuration",
    command: "config --list",
    content:
      "Customize the appearance with CSS variables. Supports dark mode, custom colors, and responsive design. All components are built with accessibility in mind.",
  },
  {
    id: "item-3",
    title: "Documentation",
    command: "docs --open",
    content:
      "Each accordion item can contain any content you want. Use it for FAQs, settings, code examples, or any expandable content that needs a terminal aesthetic.",
  },
  {
    id: "item-4",
    title: "Advanced Features",
    command: "features --advanced",
    content:
      "Smooth transitions, keyboard navigation, and semantic HTML. Built with performance in mind using React hooks and CSS animations.",
  },
]
const TerminalAccordion = () => {
      const [expandedId, setExpandedId] = useState(null)

  const toggleItem = (id) => {
    setExpandedId(expandedId === id ? null : id)
  }
  return (
    <div className="space-y-0">
      {items.map((item) => (
        <div
          key={item.id}
          className="border border-[rgba(10,14,39,0.3)] overflow-hidden bg-[rgba(10,14,39,1)] hover:border-[rgba(0,255,65,0.5)] transition-colors lg:w-[80%]"
        >
          {/* Header */}
          <button
            onClick={() => toggleItem(item.id)}
            className="w-full px-4 py-3 flex items-center gap-3 hover:bg-[rgba(0,255,65,0.05)] transition-colors text-left group"
            aria-expanded={expandedId === item.id}
            aria-controls={`content-${item.id}`}
          >
            <BiChevronRight
              size={16}
              className={`text-[rgba(0,255,65,1)] flex-shrink-0 transition-transform duration-300 ${
                expandedId === item.id ? "rotate-90" : ""
              }`}
            />
            <div className="flex-1 min-w-0">
              <div className="font-mono text-sm text-[rgba(0,217,255,1)]">
                <span className="text-[rgba(0,255,65,1)]">$</span> {item.command}
              </div>
              <div className="font-mono text-xs text-[rgba(0,255,65,0.6)] mt-1">{item.title}</div>
            </div>
          </button>

          {/* Content */}
          <div
            id={`content-${item.id}`}
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              expandedId === item.id ? "max-h-96" : "max-h-0"
            }`}
          >
            <div className="px-4 py-3 border-t border-[rgba(0,255,65,0.2)] bg-terminal-dark/30">
              <div className="font-mono text-sm text-[rgba(0,217,255,1)] leading-relaxed">
                <span className="text-[rgba(0,255,65,0.6)]">&gt;</span> {item.content}
              </div>
              <div className="mt-3 text-xs text-[rgba(0,255,65,0.4)] font-mono">Process completed successfully</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TerminalAccordion