import React from "react";

export default function Button({ variant = "default", size = "md", className = "", children, ...props }) {
  const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    ghost: "bg-transparent hover:bg-muted",
  };

  const sizes = {
    sm: "h-8 w-8 p-0",
    md: "h-10 px-4 py-2",
    lg: "h-12 px-6 py-3",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
