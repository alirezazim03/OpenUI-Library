import React from "react";

const Skeleton = ({ width = "100%", height = "20px", borderRadius = "8px" }) => {
  const style = {
    width,
    height,
    borderRadius,
    background: "linear-gradient(90deg, #e2e8f0 25%, #f8fafc 50%, #e2e8f0 75%)",
    backgroundSize: "200% 100%",
    animation: "skeleton-loading 1.5s infinite ease-in-out",
  };

  return (
    <>
      <style>
        {`
          @keyframes skeleton-loading {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
        `}
      </style>
      <div style={style}></div>
    </>
  );
};

export default Skeleton;
