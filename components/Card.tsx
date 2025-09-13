import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-card rounded-xl border border-border p-6 ${className}`}>
      {children}
    </div>
  );
};

export default Card;