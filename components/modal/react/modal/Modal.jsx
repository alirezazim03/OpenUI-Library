import React, { useEffect, useRef } from "react"
import { IoMdClose } from "react-icons/io"

// Modal Context
const ModalContext = React.createContext(undefined)

// Main Modal Component
const Modal = ({
  open,
  onClose,
  children,
  size = "md",
  closeOnOverlay = true,
  closeOnEsc = true,
  showCloseButton = true,
}) => {
  const modalRef = useRef(null)
  const previousActiveElement = useRef(null)

  // Size classes
  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    full: "max-w-full mx-4",
  }

  // Handle ESC key
  useEffect(() => {
    if (!open || !closeOnEsc) return

    const handleEsc = e => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEsc)
    return () => document.removeEventListener("keydown", handleEsc)
  }, [open, closeOnEsc, onClose])

  // Focus management
  useEffect(() => {
    if (open) {
      previousActiveElement.current = document.activeElement
      modalRef.current?.focus()
    } else {
      previousActiveElement.current?.focus()
    }
  }, [open])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  // Focus trap
  const handleTabKey = e => {
    if (e.key !== "Tab") return

    const focusableElements = modalRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )

    if (!focusableElements || focusableElements.length === 0) return

    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus()
        e.preventDefault()
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement.focus()
        e.preventDefault()
      }
    }
  }

  if (!open) return null

  return (
    <ModalContext.Provider value={{ onClose }}>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn"
        role="modal"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Overlay */}
        <div
          className="fixed inset-0 bg-black/50 animate-fadeIn"
          onClick={closeOnOverlay ? onClose : undefined}
          aria-hidden="true"
        />

        {/* Modal */}
        <div
          ref={modalRef}
          tabIndex={-1}
          onKeyDown={handleTabKey}
          className={`relative bg-white rounded-lg shadow-xl w-full ${sizeClasses[size]} animate-scaleIn transform transition-all`}
        >
          {showCloseButton && (
            <button
              onClick={onClose}
              className="absolute right-4 top-4 p-1 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Close modal"
            >
              <IoMdClose className="w-5 h-5 text-red-500" />
            </button>
          )}
          {children}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.2s ease-out;
        }
      `}</style>
    </ModalContext.Provider>
  )
}

// Modal Header
const ModalHeader = ({ children, className = "" }) => {
  return (
    <div className={`px-6 py-4 border-b border-gray-200 ${className}`}>
      <h2 id="modal-title" className="text-xl font-semibold text-gray-900">
        {children}
      </h2>
    </div>
  )
}

// Modal Body
const ModalBody = ({ children, className = "" }) => {
  return <div className={`px-6 py-4 ${className}`}>{children}</div>
}

// Modal Footer
const ModalFooter = ({ children, className = "" }) => {
  return (
    <div
      className={`px-6 py-4 border-t border-gray-200 flex items-center justify-end gap-3 ${className}`}
    >
      {children}
    </div>
  )
}

// Attach compound components
Modal.Header = ModalHeader
Modal.Body = ModalBody
Modal.Footer = ModalFooter

// Demo Component
const ModalDemo = () => {
  const [previewOpen, setPreviewOpen] = React.useState(false)

  return (
    <div className="bg-white p-8">
      <div className="mx-auto flex justify-center">
        {/* Preview Modal Trigger */}
        <button
          onClick={() => setPreviewOpen(true)}
          className="py-3 px-5 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200"
        >
          <p className="font-semibold text-white">Preview Modal</p>
        </button>

        {/* Preview Modal */}
        <Modal
          open={previewOpen}
          onClose={() => setPreviewOpen(false)}
          size="lg"
        >
          <Modal.Header>Image Preview</Modal.Header>
          <Modal.Body className="p-0">
            <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
              Preview Content
            </div>
            <div className="p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                Beautiful Gradient
              </h3>
              <p className="text-gray-600 text-sm">
                This is an example of a content preview modal. You can display
                images, videos, or any other content here.
              </p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              onClick={() => setPreviewOpen(false)}
              className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Close
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  )
}

export default ModalDemo
export { Modal }
