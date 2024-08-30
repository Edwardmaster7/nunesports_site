import React, { forwardRef } from "react";

// Assuming Container is a functional component
const Container = forwardRef(
  ({ className, style, children, disabled }, ref) => {
    return (
      <div
        ref={ref}
        disabled={disabled}
        className={`container rounded-xl bg-indigo-100 shadow-xl dark:bg-indigo-900 ${className}`}
        style={style}
      >
        {children}
      </div>
    );
  },
);

export default Container;
