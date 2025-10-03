import React from "react"
import { CiWarning } from "react-icons/ci"

const defaultProps = {
  name: "Jessica Bennet",
  description: "All synchronizations will be disconnected and moved to archive"
}

const SimpleWarningPopup = ({
  name = defaultProps.name,
  description = defaultProps.description
}) => {
  return (
    <div className="mx-auto max-w-md overflow-hidden rounded-xl bg-white shadow-md md:max-w-1xl text-center p-8">
      <div className="md:flex justify-center items-center">
        <div className="p-8 text-center">
          <CiWarning className="w-16 h-16 text-red-700 mx-auto" />
          <h1 className="mt-1 block text-lg leading-tight font-medium text-black">
            Are you sure you want to delete <strong className="text-gray-400">{name}</strong>?
          </h1>
          <p className="mt-2 text-gray-400">
            {description}
          </p>
        </div>
      </div>
      <div className="flex gap-2">
        <button 
          type="button" 
          className="text-black border border-gray-300 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex-1"
        >
          Cancel
        </button>
        <button 
          type="button" 
          className="text-red-800 hover:text-white border border-red-800 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex-1"
        >
          Delete {name}
        </button>
      </div>
    </div>
  )
}

export default SimpleWarningPopup
