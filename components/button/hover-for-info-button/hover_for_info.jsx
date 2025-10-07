import React, { useState } from "react";

function HoverInfo() {
    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <div className="flex flex-col items-center justify-center h-80 text-white">
            <div className="relative">
                <div
                    className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 transition-all duration-200 ease-out ${showTooltip ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
                        }`}>
                    <div className={`relative w-72 rounded-2xl bg-gray-800/95 text-gray-200 shadow-xl ring-1 ring-gray-700 backdrop-blur-sm p-4 transform transition-transform duration-200 ${showTooltip ? "scale-100" : "scale-95"
                        }`}>
                        <div className="flex items-center space-x-2 mb-2">
                            <span className="text-blue-400"></span>
                            <h3 className="font-semibold">Important Information</h3>
                        </div>
                        <p className="text-sm">
                            This is a tooltip with detailed information. Add tooltip information here.
                        </p>
                        <svg
                            className="absolute left-1/2 -translate-x-1/2 top-full text-gray-800 stroke-gray-700"
                            width="18"
                            height="10"
                            viewBox="0 0 18 10"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M1 1 L9 9 L17 1" strokeWidth="1" fill="currentColor" />
                        </svg>
                    </div>
                </div>


                {/* Button */}
                <button
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                    className="px-6 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium shadow-lg flex items-center gap-2 hover:scale-105 transition"
                >
                    <span>ℹ️</span> Hover for Info
                </button>
            </div>
        </div>
    );
}

export default HoverInfo;
