import React from "react";

function Skeleton({ className = "" }) {
  return (
    <div className={`animate-pulse bg-gray-400 rounded-md ${className}`}></div>
  );
  //You can give class names as per your requirement, like height and width, also can chnage bg color by your choice
}

export default function Demo(){
    return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}
