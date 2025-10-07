import React from "react"

const defaultProps = {
  value: "Hover Me!"
}

const MinimalAnimatedButton = ({
  value = defaultProps.value
}) => {
  return (
    <div className="flex items-center justify-center rounded-md">
      <button 
        type="button" 
        className="mt-6 text-white bg-gradient-to-br from-green-600 to-blue-400 hover:bg-gradient-to-bl 
                   focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 
                   font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 
                   transition-all duration-500 ease-in-out shadow-lg hover:shadow-2xl hover:scale-105"
      >
        {value}
      </button>
    </div>
  )
}

export default MinimalAnimatedButton
