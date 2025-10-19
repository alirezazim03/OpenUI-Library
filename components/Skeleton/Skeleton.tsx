import React from "react";
import "./Skeleton.css";

interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({
  width = "100%",
  height = "20px",
  borderRadius = "8px",
}) => {
  return (
    <div
      className="skeleton"
      style={{
        width,
        height,
        borderRadius,
      }}
    />
  );
};

export default Skeleton;
