import React from 'react';

export function Card({ children, className }) {
  return (
    <div className={`rounded-xl border ${className}`}>
      {children}
    </div>
  )
}

